import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthByCredentialsDto {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @ApiProperty()
    password: string
}