import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {TagModule} from "../tag";
import {User} from "./entities/User";

const UserRepositoryModule = TypeOrmModule.forFeature([User])

@Module({
    imports: [
        UserRepositoryModule,
        forwardRef(() => TagModule),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserRepositoryModule, UserService]
})
export class UserModule {}