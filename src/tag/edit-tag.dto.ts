import {IsNumber, IsOptional, IsString} from "class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class EditTagDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    sortOrder?: number
}