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
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const config_1 = require('@nestjs/config');
const path_1 = require('path');
const serve_static_module_1 = require('@nestjs/serve-static/dist/serve-static.module');
const posts_module_1 = require('./posts/posts.module');
const app_controller_1 = require('./app.controller');
const app_service_1 = require('./app.service');
let AppModule = class AppModule {};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        config_1.ConfigModule.forRoot({
          isGlobal: true,
        }),
        posts_module_1.PostsModule,
        serve_static_module_1.ServeStaticModule.forRoot({
          rootPath: (0, path_1.join)(__dirname, '..', 'public'),
        }),
        mongoose_1.MongooseModule.forRootAsync({
          useFactory: () => ({ uri: process.env.MONGO_CONNECTION_STRING }),
        }),
      ],
      controllers: [app_controller_1.AppController],
      providers: [app_service_1.AppService],
    }),
  ],
  AppModule,
);
//# sourceMappingURL=app.module.js.map
