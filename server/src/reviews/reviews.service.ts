import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { Review, ReviewDocument } from './schemas/review.schema';

import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(
    createReviewDto: CreateReviewDto & { images: string[] },
    fieldName: string,
    chosenFields: Record<string, number>,
  ): Promise<Review> {
    const postWithTime = {
      ...createReviewDto,
      time: new Date().getTime(),
    };
    const review = new this.reviewModel(postWithTime);

    const user = (await this.userModel.findById(
      createReviewDto.userId,
    )) as User;
    if (user) {
      await this.userModel.findByIdAndUpdate(createReviewDto.userId, {
        stars: user.stars + Number(createReviewDto.stars),
        countReviews: user.countReviews + 1,
      });
    }

    return (await review.save()).populate({
      path: fieldName,
      select: chosenFields,
    });
  }

  async remove(removeReviewDto): Promise<Review> {
    const user = (await this.userModel.findById(
      removeReviewDto.userId,
    )) as User;

    if (user) {
      await this.userModel.findByIdAndUpdate(removeReviewDto.userId, {
        stars: user.stars - removeReviewDto.stars,
        countReviews: user.countReviews - 1,
      });
    }

    return this.reviewModel.findByIdAndRemove(removeReviewDto._id);
  }

  async getAllReviewsByAuthorId(
    authorId: string,
    firstFieldName: string,
    secondFieldName: string,
    chosenFields: Record<string, number>,
  ): Promise<Review[]> {
    return await this.reviewModel
      .find({ authorId: authorId })
      .populate({
        path: firstFieldName,
        select: chosenFields,
      })
      .populate({
        path: secondFieldName,
        select: chosenFields,
      })
      .sort({ time: 'desc' })
      .exec();
  }

  async getAllReviewsByUserId(
    userId: string,
    page: number = 0,
    firstFieldName: string,
    secondFieldName: string,
    chosenFields: Record<string, number>,
  ) {
    const query = this.reviewModel.find({ userId: userId });
    const limit = 10;

    const reviews = await query
      .sort({ time: 'desc' })
      .skip(((parseInt(page as any) || 1) - 1) * limit)
      .limit(limit)
      .populate({
        path: firstFieldName,
        select: chosenFields,
      })
      .populate({
        path: secondFieldName,
        select: chosenFields,
      });

    const count = await this.reviewModel
      .countDocuments({ userId: userId })
      .exec();
    const pages = Math.floor((count - 1) / limit) + 1;

    return { reviews, count, pages, page: Number(page) };
  }
}
