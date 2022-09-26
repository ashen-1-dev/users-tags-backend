import {IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateTagDto {
    @IsString()
    @MaxLength(40)
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    sortOrder: number;
}