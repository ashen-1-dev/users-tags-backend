import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {AtLeastContains} from "../../core/decorators";

export class CreateUserDto {
    @MaxLength(30)
    @IsEmail()
    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @MaxLength(100)
    @MinLength(8)
    @AtLeastContains({lowercase: 1, uppercase: 1, message: 'password must have at least 1 lowercase and 1 uppercase letter'})
    @ApiProperty()
    password: string;

    @IsString()
    @MaxLength(30)
    @ApiProperty()
    nickname: string;
}