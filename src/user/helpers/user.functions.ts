import {GetUserDto} from "../dto";
import {convertTagToGetTagDto} from "../../tag";
import {User} from "../entities/User";

export function convertUserToGetUserDto(user: User): GetUserDto {
    return {
        email: user.email,
        nickname: user.nickname,
        tags: user.tags?.map(convertTagToGetTagDto)
    }
}