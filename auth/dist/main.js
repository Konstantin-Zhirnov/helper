"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const PORT = process.env.PORT;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Authentication")
        .setDescription("REST API documentation")
        .setVersion("1.0.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/docs', app, document);
    app.use(cookieParser());
    app.enableCors({ credentials: true, origin: "http://localhost:3000" });
    await app.listen(PORT || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map