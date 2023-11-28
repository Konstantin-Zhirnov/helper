/// <reference types="multer" />
import { Review as ReviewModel } from './schemas/review.schema';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { RemoveReviewDto } from './dto/remove-review.dto';
export declare class PostsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto, files: Array<Express.Multer.File>): Promise<ReviewModel>;
    remove(removeReviewDto: RemoveReviewDto): Promise<{
        _id: string;
    }>;
    getAllPostsByAuthorId(id: string): Promise<ReviewModel[]>;
    getAllPostsByUserId({ id, page, }: {
        id: any;
        page: any;
    }): Promise<{
        reviews: ReviewModel[];
        count: number;
        pages: number;
    }>;
}
