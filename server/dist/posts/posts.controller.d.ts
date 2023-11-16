/// <reference types="multer" />
import { Post as PostModel } from './schemas/post.schema';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AddImagesDto } from './dto/add-images.dto';
import { RemoveImageDto } from './dto/remove-image.dto';
import { RemovePostDto } from './dto/remove-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAll({ location, search, page, }: {
        location: any;
        search: any;
        page: any;
    }): Promise<{
        posts: PostModel[];
        count: number;
        pages: number;
    }>;
    findOne(id: string): Promise<PostModel>;
    create(createPostDto: CreatePostDto, files: Array<Express.Multer.File>): Promise<PostModel>;
    remove(removePostDto: RemovePostDto): Promise<{
        _id: string;
    }>;
    update(updatePostDto: UpdatePostDto): Promise<UpdatePostDto>;
    getCities(): Promise<unknown[]>;
    getAllPostsById(id: string): Promise<PostModel[]>;
    addImages(addImagesDto: AddImagesDto, files: Array<Express.Multer.File>): Promise<{
        _id: string;
        field: {
            images: string[];
        };
    }>;
    removeImage(removeImageDto: RemoveImageDto): Promise<{
        _id: string;
        field: {
            images: string[];
        };
    }>;
}
