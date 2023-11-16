"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const fs = require('fs');
    const keyFile = fs.readFileSync(__dirname + '/privkey.pem');
    const certFile = fs.readFileSync(__dirname + '/fullchain.pem');
    const PORT = process.env.PORT;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: {
            key: keyFile,
            cert: certFile,
        },
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Posts')
        .setDescription('REST API documentation')
        .setVersion('1.0.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/docs', app, document);
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    });
    await app.listen(PORT || 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map