import {IsEmail, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {AtLeastContains} from "../../core/decorators";

export class EditUserDto {
    @MaxLength(30)
    @IsEmail()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    email?: string;

    @IsString()
    @MaxLength(100)
    @MinLength(8)
    @IsOptional()
    @AtLeastContains({
        lowercase: 1,
        uppercase: 1,
        message: 'Пароль должен содержать как минимум 1 строчную и 1 заглавную букву'
    })
    @ApiPropertyOptional()
    password?: string;

    @IsString()
    @MaxLength(30)
    @IsOptional()
    @ApiPropertyOptional()
    nickname?: string
}