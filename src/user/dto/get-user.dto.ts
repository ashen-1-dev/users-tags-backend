import {GetTagDto} from "../../tag";

export class GetUserDto {
    email: string;
    nickname: string;
    tags: GetTagDto[]
}