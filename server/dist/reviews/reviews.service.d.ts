/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private userModel;
    private reviewModel;
    constructor(userModel: Model<UserDocument>, reviewModel: Model<ReviewDocument>);
    create(createReviewDto: CreateReviewDto & {
        images: string[];
    }, fieldName: string, chosenFields: Record<string, number>): Promise<Review>;
    remove(removeReviewDto: any): Promise<Review>;
    getAllPostsByAuthorId(authorId: string, fieldName: string, chosenFields: Record<string, number>): Promise<Review[]>;
    getAllPostsByUserId(userId: string, page: number, fieldName: string, chosenFields: Record<string, number>): Promise<{
        reviews: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Review> & Review & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>> & import("mongoose").Document<unknown, {}, Review> & Review & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
        count: number;
        pages: number;
        page: number;
    }>;
}
