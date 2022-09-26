export class GetTagDto {
    id: number;
    name: string;
    sortOrder: number;
}

export class GetTagWithCreatorDto {
    name: string;
    sortOrder: number
    creator: {
        nickname: string,
        uid: string
    }
}