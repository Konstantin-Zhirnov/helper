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
exports.ReviewsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const review_schema_1 = require("./schemas/review.schema");
let ReviewsService = class ReviewsService {
    constructor(userModel, reviewModel) {
        this.userModel = userModel;
        this.reviewModel = reviewModel;
    }
    async create(createReviewDto, fieldName, chosenFields) {
        const postWithTime = {
            ...createReviewDto,
            time: new Date().getTime(),
        };
        const review = new this.reviewModel(postWithTime);
        const user = await this.userModel.findById(createReviewDto.userId);
        if (user) {
            await this.userModel.findByIdAndUpdate(createReviewDto.userId, {
                stars: user.stars + createReviewDto.stars,
                countReviews: user.countReviews + 1,
            });
        }
        return (await review.save()).populate({
            path: fieldName,
            select: chosenFields,
        });
    }
    async remove(removeReviewDto) {
        const user = await this.userModel.findById(removeReviewDto.userId);
        if (user) {
            await this.userModel.findByIdAndUpdate(removeReviewDto.userId, {
                stars: user.stars - removeReviewDto.stars,
                countReviews: user.countReviews - 1,
            });
        }
        return this.reviewModel.findByIdAndRemove(removeReviewDto._id);
    }
    async getAllPostsByAuthorId(authorId, fieldName, chosenFields) {
        return await this.reviewModel.find({ 'authorId': authorId }).populate({
            path: fieldName,
            select: chosenFields,
        }).sort({ 'time': 'desc' }).exec();
    }
    async getAllPostsByUserId(userId, page = 0, fieldName, chosenFields) {
        const query = this.reviewModel.find({ 'userId': userId });
        const limit = 10;
        const reviews = await query
            .sort({ 'time': 'desc' })
            .skip(((parseInt(page) || 1) - 1) * limit)
            .limit(limit)
            .populate({
            path: fieldName,
            select: chosenFields,
        });
        const count = await query.countDocuments().exec();
        const pages = Math.floor((count - 1) / limit) + 1;
        return { reviews, count, pages, page: Number(page) };
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(review_schema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map