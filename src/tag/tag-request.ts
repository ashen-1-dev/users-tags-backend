import {PaginateRequest} from "../core/paginate";
import {IsOptional} from "class-validator";
import {ToBooleanOptional} from "../core/decorators";
import {ApiPropertyOptional} from "@nestjs/swagger";

export class TagRequest extends PaginateRequest {
    @IsOptional()
    @ApiPropertyOptional()
    @ToBooleanOptional()
    sortByOrder: boolean;

    @IsOptional()
    @ApiPropertyOptional()
    @ToBooleanOptional()
    sortByName: boolean;
}