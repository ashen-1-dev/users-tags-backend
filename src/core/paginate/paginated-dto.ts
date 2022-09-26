import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class PaginatedDto<T> {
    data: T[];
    meta: {
        offset: number;
        length: number;
        quantity: number;
    }
}

export class PaginateRequest {
    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    offset?: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    length?: number;
}