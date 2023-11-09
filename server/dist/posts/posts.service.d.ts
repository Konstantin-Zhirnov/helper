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
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AddImagesDto } from './dto/add-images.dto';
import { RemoveImageDto } from './dto/remove-image.dto';
export declare class PostsService {
    private userModel;
    private postModel;
    constructor(userModel: Model<UserDocument>, postModel: Model<PostDocument>);
    create(createPostDto: CreatePostDto & {
        images: string[];
    }, fieldName: string, chosenFields: Record<string, number>): Promise<Post>;
    findOneAndPopulate(id: string, fieldName: string, chosenFields: Record<string, number>): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>> & import("mongoose").Document<unknown, {}, Post> & Post & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAll(location: string, skip: number, limit: number, fieldName: string, chosenFields: Record<string, number>): Promise<{
        posts: Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Post> & Post & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>> & import("mongoose").Document<unknown, {}, Post> & Post & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
        count: number;
        pages: number;
    }>;
    remove(id: string): Promise<Post>;
    update(updatePostDto: UpdatePostDto): Promise<Post>;
    getLocations(): Promise<unknown[]>;
    getAllPostsByAuthorId(authorId: string, fieldName: string, chosenFields: Record<string, number>): Promise<Post[]>;
    addImages(addImagesDto: AddImagesDto, images: string[]): Promise<Post>;
    removeImage(removeImageDto: RemoveImageDto): Promise<Post>;
}
