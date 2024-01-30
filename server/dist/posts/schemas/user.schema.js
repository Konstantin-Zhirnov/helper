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
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const swagger_1 = require('@nestjs/swagger');
let User = class User {};
exports.User = User;
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: '1',
      description: 'Unique identifier',
    }),
    __metadata('design:type', mongoose_2.Types.ObjectId),
  ],
  User.prototype,
  '_id',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'Konstantin',
      description: 'User`s name',
    }),
    (0, mongoose_1.Prop)(),
    __metadata('design:type', String),
  ],
  User.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'user@gmail.com',
      description: 'User`s email',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'email',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: '123456',
      description: 'User`s password',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'password',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: '+12501111111',
      description: 'User`s phone number',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'phone',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: '+12501111111',
      description: 'User`s WhatsApp',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'whatsapp',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: '@kostya_zhirnov',
      description: 'User`s Telegram',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'telegram',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: '+12501111111',
      description: 'User`s Viber',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'viber',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'https://image.jpg',
      description: 'User`s photo',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'photo',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'true',
      description: 'The user account is activated',
    }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata('design:type', Boolean),
  ],
  User.prototype,
  'isActivated',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'dzvjndd6552sgbsz',
      description: 'Link to activate the user account',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'linkForActivated',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'dzvjndd6552sgbsz',
      description: "Link to change the user's password",
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'changePasswordLink',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ example: 4, description: 'Number of stars' }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', Number),
  ],
  User.prototype,
  'stars',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 4,
      description: 'Number of reviews',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', Number),
  ],
  User.prototype,
  'countReviews',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'true',
      description: 'Is the subscription paid for',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', Boolean),
  ],
  User.prototype,
  'paid',
  void 0,
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      example: 'true',
      description: 'Subscription payment time',
    }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata('design:type', String),
  ],
  User.prototype,
  'paidTime',
  void 0,
);
exports.User = User = __decorate([(0, mongoose_1.Schema)()], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map
