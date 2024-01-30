'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewsController = void 0;
const common_1 = require('@nestjs/common');
const swagger_1 = require('@nestjs/swagger');
const platform_express_1 = require('@nestjs/platform-express');
const fs_1 = require('fs');
const multer_1 = require('multer');
const review_schema_1 = require('./schemas/review.schema');
const user_schema_1 = require('./schemas/user.schema');
const reviews_service_1 = require('./reviews.service');
const create_review_dto_1 = require('./dto/create-review.dto');
const remove_review_dto_1 = require('./dto/remove-review.dto');
const uuid = require('uuid');
const chosenFields = {
  name: 1,
  photo: 1,
};
const getExtension = (fileName) => {
  const i = fileName.lastIndexOf('.');
  if (i === -1) {
    throw new Error('file`s name is broken');
  }
  return fileName.slice(i + 1).toLowerCase();
};
let ReviewsController = class ReviewsController {
  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }
  async getUser(id) {
    const user = await this.reviewsService.getById(id);
    return {
      name: user.name,
      photo: user.photo,
      stars: user.stars,
      countReviews: user.countReviews,
    };
  }
  async create(createReviewDto, files) {
    const images = [];
    if (files.length > 0) {
      const folder = files[0].originalname.split('-')[0];
      const path = `${process.env.SERVER_PATH}${folder}/reviews/`;
      files.forEach((file) => {
        images.push(`${path}${file.filename}`);
      });
    }
    return await this.reviewsService.create(
      { ...createReviewDto, images },
      'authorId',
      chosenFields,
    );
  }
  async remove(removeReviewDto) {
    const review = await this.reviewsService.remove(removeReviewDto);
    review.images.forEach((src) => {
      const image = src.split('/').at(-1);
      (0, fs_1.unlinkSync)(
        `./public/${removeReviewDto.userId}/reviews/${image}`,
      );
    });
    return { _id: removeReviewDto._id };
  }
  async getAllPostsByAuthorId(id) {
    return await this.reviewsService.getAllPostsByAuthorId(
      id,
      'authorId',
      chosenFields,
    );
  }
  async getAllPostsByUserId({ id, page }) {
    return await this.reviewsService.getAllPostsByUserId(
      id,
      page,
      'authorId',
      chosenFields,
    );
  }
};
exports.ReviewsController = ReviewsController;
__decorate(
  [
    (0, swagger_1.ApiOperation)({ summary: 'Get one user by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_schema_1.User }),
    (0, common_1.Get)('review-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  ReviewsController.prototype,
  'getUser',
  null,
);
__decorate(
  [
    (0, swagger_1.ApiOperation)({ summary: 'Create review' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: review_schema_1.Review }),
    (0, common_1.Post)('create-review'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(
      (0, platform_express_1.FilesInterceptor)('images', 5, {
        storage: (0, multer_1.diskStorage)({
          destination: (req, file, cb) => {
            if (file) {
              const fileName = file.originalname;
              const folder = fileName.substring(0, fileName.lastIndexOf('-'));
              const folderPath = `./public/${folder}`;
              if (!(0, fs_1.existsSync)(folderPath)) {
                (0, fs_1.mkdirSync)(folderPath);
              }
              const uploadPath = `./public/${folder}/reviews`;
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
      }),
    ),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      create_review_dto_1.CreateReviewDto,
      Array,
    ]),
    __metadata('design:returntype', Promise),
  ],
  ReviewsController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, swagger_1.ApiOperation)({ summary: 'Delete review' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: review_schema_1.Review }),
    (0, common_1.Post)('remove-review'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [remove_review_dto_1.RemoveReviewDto]),
    __metadata('design:returntype', Promise),
  ],
  ReviewsController.prototype,
  'remove',
  null,
);
__decorate(
  [
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts by author id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [review_schema_1.Review] }),
    (0, common_1.Get)('reviews-author/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  ReviewsController.prototype,
  'getAllPostsByAuthorId',
  null,
);
__decorate(
  [
    (0, swagger_1.ApiOperation)({ summary: 'Get all posts by user id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [review_schema_1.Review] }),
    (0, common_1.Get)('reviews'),
    __param(0, (0, common_1.Query)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  ReviewsController.prototype,
  'getAllPostsByUserId',
  null,
);
exports.ReviewsController = ReviewsController = __decorate(
  [
    (0, common_1.Controller)(),
    __metadata('design:paramtypes', [reviews_service_1.ReviewsService]),
  ],
  ReviewsController,
);
//# sourceMappingURL=reviews.controller.js.map
