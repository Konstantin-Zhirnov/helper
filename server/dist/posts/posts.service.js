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
exports.PostsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const post_schema_1 = require("./schemas/post.schema");
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
let PostsService = class PostsService {
    constructor(userModel, postModel) {
        this.userModel = userModel;
        this.postModel = postModel;
    }
    async create(createPostDto, fieldName, chosenFields) {
        const postWithTime = {
            ...createPostDto,
            time: new Date().getTime(),
            location: capitalizeFirstLetter(createPostDto.location),
        };
        const post = new this.postModel(postWithTime);
        return (await post.save()).populate({
            path: fieldName,
            select: chosenFields,
        });
    }
    async findOneAndPopulate(id, fieldName, chosenFields) {
        return await this.postModel
            .findById(id)
            .populate({ path: fieldName, select: chosenFields })
            .exec();
    }
    async getAll(location = 'Nanaimo', skip = 0, limit = 10, fieldName, chosenFields) {
        const posts = await this.postModel
            .find({ location: capitalizeFirstLetter(location) })
            .sort({ 'time': 'desc' })
            .limit(limit)
            .skip(skip)
            .populate({
            path: fieldName,
            select: chosenFields,
        });
        const count = await this.postModel.countDocuments({ location: capitalizeFirstLetter(location) }).exec();
        const pages = Math.floor((count - 1) / limit) + 1;
        return { posts, count, pages };
    }
    async remove(id) {
        return this.postModel.findByIdAndRemove(id);
    }
    async update(updatePostDto) {
        return this.postModel.findByIdAndUpdate(updatePostDto._id, updatePostDto.field, { new: true });
    }
    async getLocations() {
        const locations = await this.postModel.find().select({ 'location': 1, '_id': 0 }).exec();
        const locationsSet = new Set();
        locations.forEach(location => {
            if (!locationsSet.has(location.location)) {
                locationsSet.add(location.location);
            }
        });
        return [...locationsSet];
    }
    async getAllPostsByAuthorId(authorId, fieldName, chosenFields) {
        return await this.postModel.find({ 'authorId': authorId }).populate({
            path: fieldName,
            select: chosenFields,
        }).sort({ 'time': 'desc' }).exec();
    }
    async addImages(addImagesDto, images) {
        const post = await this.postModel.findById(addImagesDto._id);
        return this.postModel.findByIdAndUpdate(addImagesDto._id, { images: [...post.images, ...images] }, { new: true });
    }
    async removeImage(removeImageDto) {
        const post = await this.postModel.findById(removeImageDto._id);
        return this.postModel.findByIdAndUpdate(removeImageDto._id, { images: post.images.filter(image => image !== removeImageDto.image) }, { new: true });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map