import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'


import { User, UserDocument } from './schemas/user.schema'
import { Review, ReviewDocument } from './schemas/review.schema'

import { CreateReviewDto } from './dto/create-review.dto'


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

@Injectable()
export class ReviewsService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {
  }

  async create(createReviewDto: CreateReviewDto & { images: string[] }, fieldName: string, chosenFields: Record<string, number>): Promise<Review> {
    const postWithTime = {
      ...createReviewDto,
      time: new Date().getTime(),
    }
    const review = new this.reviewModel(postWithTime)

    const { stars, countReviews } = this.userModel.findById(createReviewDto.userId)
    await this.userModel.findByIdAndUpdate(createReviewDto.userId, {
      stars: stars + createReviewDto.stars,
      countReviews: countReviews + 1,
    })

    return (await review.save()).populate({
      path: fieldName,
      select: chosenFields,
    })
  }

  async remove(id: string): Promise<Review> {

    const review = await this.reviewModel.findById(id)
    const { stars, countReviews } = await this.userModel.findById(review.userId)
    await this.userModel.findByIdAndUpdate(review.userId, {
      stars: stars - review.stars,
      countReviews: countReviews - 1,
    })

    return this.reviewModel.findByIdAndRemove(id)
  }

  async getAllPostsByAuthorId(authorId: string, fieldName: string, chosenFields: Record<string, number>): Promise<Review[]> {
    return await this.reviewModel.find({ 'authorId': authorId }).populate({
      path: fieldName,
      select: chosenFields,
    }).sort({ 'time': 'desc' }).exec()
  }


  async getAllPostsByUserId(userId: string, page: number = 0, fieldName: string, chosenFields: Record<string, number>) {
    const query = this.reviewModel.find({ 'userId': userId })
    const limit = 10

    const reviews = await query
      .sort({ 'time': 'desc' })
      .skip(((parseInt(page as any) || 1) - 1) * limit)
      .limit(limit)
      .populate({
        path: fieldName,
        select: chosenFields,
      })

    const count = await query.countDocuments().exec()
    const pages = Math.floor((count - 1) / limit) + 1

    return { reviews, count, pages, page: Number(page) }
  }
}
