import {Global, Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {JWT_SETTINGS} from "../../../app.config";

@Global()
@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SETTINGS.secret,
            signOptions: {
                expiresIn: JWT_SETTINGS.expiresIn,
            }
        }),
    ],
    exports: [JwtModule]
})
export class JwtAuthModule {}