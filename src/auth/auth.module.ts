import {forwardRef, Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user";
import {JWT_SETTINGS} from "../../app.config";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: JWT_SETTINGS.secret,
            signOptions: {
                expiresIn: JWT_SETTINGS.expiresIn,
            }
        }),
    ],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}