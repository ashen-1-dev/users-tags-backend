import {Tag} from "../entities/Tag";


export function sortTagsByName(tags: Tag[]): Tag[] {
    return tags.sort((a, b) => {
        return a.name.localeCompare(b.name)
    })
}

export function sortTagsByOrder(tags: Tag[]): Tag[] {
    return tags.sort((a, b) => {
        return b.sortOrder - a.sortOrder
    })
}