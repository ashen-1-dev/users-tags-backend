import {GetTagDto, GetTagWithCreatorDto} from "../dto";
import {Tag} from "../entities/Tag";

export function convertTagToGetTagDto(tag: Tag): GetTagDto {
    return {
        id: tag.id,
        name: tag.name,
        sortOrder: tag.sortOrder
    }
}

export function convertTagToGetTagWithCreatorDto(tag: Tag): GetTagWithCreatorDto {
    return {
        creator: {
            nickname: tag.creator.nickname,
            uid: tag.creator.uuid
        },
        name: tag.name,
        sortOrder: tag.sortOrder,
    }
}