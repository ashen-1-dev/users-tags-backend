import {IsArray, IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AddTagsToUserDto {
    @IsArray()
    @IsNumber({}, {each: true})
    @ApiProperty()
    tags: number[]
}