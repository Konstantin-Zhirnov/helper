"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const post_schema_1 = require("./schemas/post.schema");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const multer_1 = require("multer");
const fs_1 = require("fs");
const update_post_dto_1 = require("./dto/update-post.dto");
const add_images_dto_1 = require("./dto/add-images.dto");
const remove_image_dto_1 = require("./dto/remove-image.dto");
const remove_post_dto_1 = require("./dto/remove-post.dto");
const uuid = require('uuid');
const chosenFields = {
    name: 1,
    email: 1,
    phone: 1,
    photo: 1,
    whatsapp: 1,
    telegram: 1,
    viber: 1,
    stars: 1,
    countReviews: 1,
};
const getExtension = (fileName) => {
    const i = fileName.lastIndexOf('.');
    if (i === -1) {
        throw new Error('file`s name is broken');
    }
    return fileName.slice(i + 1).toLowerCase();
};
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getAll({ location, search, page, }) {
        return await this.postsService.getAll(location, search, page, 'authorId', chosenFields);
    }
    async findOne(id) {
        return await this.postsService.findOneAndPopulate(id, 'authorId', chosenFields);
    }
    async create(createPostDto, files) {
        const images = [];
        if (files.length > 0) {
            const folder = files[0].originalname.split('-')[0];
            const path = `${process.env.SERVER_PATH}${folder}/posts/`;
            files.forEach(file => {
                images.push(`${path}${file.filename}`);
            });
        }
        return await this.postsService.create({ ...createPostDto, images }, 'authorId', chosenFields);
    }
    async remove(removePostDto) {
        const post = await this.postsService.remove(removePostDto._id);
        post.images.forEach(src => {
            const image = src.split('/').at(-1);
            (0, fs_1.unlinkSync)(`./public/${removePostDto.folder}/posts/${image}`);
        });
        return { _id: removePostDto._id };
    }
    async update(updatePostDto) {
        await this.postsService.update(updatePostDto);
        return updatePostDto;
    }
    async getCities() {
        return await this.postsService.getLocations();
    }
    async getAllPostsById(id) {
        return await this.postsService.getAllPostsByAuthorId(id, 'authorId', chosenFields);
    }
    async addImages(addImagesDto, files) {
        const images = [];
        if (files.length > 0) {
            const folder = files[0].originalname.split('-')[0];
            const path = `${process.env.SERVER_PATH}${folder}/posts/`;
            files.forEach(file => {
                images.push(`${path}${file.filename}`);
            });
        }
        const post = await this.postsService.addImages(addImagesDto, images);
        return { _id: addImagesDto._id, field: { images: post.images } };
    }
    async removeImage(removeImageDto) {
        const post = await this.postsService.removeImage(removeImageDto);
        const image = removeImageDto.image.split('/').at(-1);
        (0, fs_1.unlinkSync)(`./public/${removeImageDto.folder}/posts/${image}`);
        return { _id: removeImageDto._id, field: { images: post.images } };
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [post_schema_1.Post] }),
    (0, common_1.Get)('posts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get post' }),
    (0, common_1.Get)('post/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create post' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: post_schema_1.Post }),
    (0, common_1.Post)('create-post'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                if (file) {
                    const fileName = file.originalname;
                    const folder = fileName.substring(0, fileName.lastIndexOf('-'));
                    const folderPath = `./public/${folder}`;
                    if (!(0, fs_1.existsSync)(folderPath)) {
                        (0, fs_1.mkdirSync)(folderPath);
                    }
                    const uploadPath = `./public/${folder}/posts`;
                    if (!(0, fs_1.existsSync)(uploadPath)) {
                        (0, fs_1.mkdirSync)(uploadPath);
                    }
                    cb(null, uploadPath);
                }
            },
            filename: (req, file, callback) => {
                const name = `${uuid.v4()}.${getExtension(file.originalname)}`;
                callback(null, name);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto,
        Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete post' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: post_schema_1.Post }),
    (0, common_1.Post)('remove-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_post_dto_1.RemovePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update post' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: post_schema_1.Post }),
    (0, common_1.Put)('update-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all cities' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [String] }),
    (0, common_1.Get)('cities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getCities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts by author id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [post_schema_1.Post] }),
    (0, common_1.Get)('posts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPostsById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add images' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: post_schema_1.Post }),
    (0, common_1.Post)('add-images'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 5, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                if (file) {
                    const fileName = file.originalname;
                    const folder = fileName.substring(0, fileName.lastIndexOf('-'));
                    const folderPath = `./public/${folder}`;
                    if (!(0, fs_1.existsSync)(folderPath)) {
                        (0, fs_1.mkdirSync)(folderPath);
                    }
                    const uploadPath = `./public/${folder}/posts`;
                    if (!(0, fs_1.existsSync)(uploadPath)) {
                        (0, fs_1.mkdirSync)(uploadPath);
                    }
                    cb(null, uploadPath);
                }
            },
            filename: (req, file, callback) => {
                const name = `${uuid.v4()}.${getExtension(file.originalname)}`;
                callback(null, name);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_images_dto_1.AddImagesDto,
        Array]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addImages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove image' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: post_schema_1.Post }),
    (0, common_1.Post)('remove-image'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_image_dto_1.RemoveImageDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "removeImage", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map