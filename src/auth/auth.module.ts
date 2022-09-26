import {forwardRef, Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UserModule} from "../user";
import {JwtAuthModule} from "../core/auth/jwt-auth.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        JwtAuthModule,
        forwardRef(() => UserModule),
    ],
    exports: [AuthService]
})
export class AuthModule {}