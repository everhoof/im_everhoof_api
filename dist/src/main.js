"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
async function bootstrap() {
    const PORT = parseInt(process.env.PORT || '7700', 10);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    if (process.env.NODE_ENV === 'development' && process.env.UPLOAD_DIR) {
        app.useStaticAssets(path_1.join(process.cwd(), process.env.UPLOAD_DIR), {
            prefix: '/cdn/',
        });
    }
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map