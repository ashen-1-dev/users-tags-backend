import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {PaginatedDto} from "../core/paginate";
import {convertTagToGetTagDto, convertTagToGetTagWithCreatorDto, sortTagsByName, sortTagsByOrder} from "./helpers";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTagDto, GetTagDto, GetTagWithCreatorDto} from "./dto";
import {Repository} from "typeorm";
import {TagRequest} from "./tag-request";
import {EditTagDto} from "./edit-tag.dto";
import {Tag} from "./entities/Tag";
import {User} from "../user/entities/User";


@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
    }

    public async createTag(userUuid, createTagDto: CreateTagDto): Promise<GetTagDto> {
        try {
            const user = await this.userRepository.findOne({
                where: {uuid: userUuid}, relations: {tags: true}
            })
            if (!user) {
                throw new NotFoundException('Пользователь не найден')
            }
            const tag = await this.tagRepository.save({...createTagDto, creator: userUuid});
            user.tags.push(tag)
            await this.userRepository.save(user);
            return convertTagToGetTagDto(tag);
        }
        catch (e) {
            throw e
        }
    }

    public async getTag(id: number): Promise<GetTagWithCreatorDto> {
        const tag = await this.tagRepository.findOne({where: {id: id}, relations: {creator: true}});
        return convertTagToGetTagWithCreatorDto(tag)
    }

    public async getTags(tagRequestOptions: TagRequest): Promise<PaginatedDto<GetTagWithCreatorDto>> {
        const {offset = 0, length, sortByOrder, sortByName} = tagRequestOptions;
        let tags: Tag[] = await this.tagRepository.find({
            take: length,
            skip: offset,
            relations: {creator: true},
        });
        const quantity = await this.tagRepository.count();
        if(sortByOrder) {
           tags = sortTagsByOrder(tags);
        }
        if(sortByName) {
           tags = sortTagsByName(tags);
        }
        return {data: tags.map(convertTagToGetTagWithCreatorDto), meta: {length: tags.length, offset: offset, quantity: quantity }};
    }

    public async editTag(userUuid: string, tagId: number, editTagDto: EditTagDto): Promise<GetTagWithCreatorDto> {
        try {
            let tag = await this.tagRepository.findOne({
                where: {id: tagId},
                relations: {creator: true}});
            if(tag.creator.uuid !== userUuid) {
                throw new BadRequestException('Только владелец может изменить тег');
            }
            tag = {...tag, ...editTagDto}
            await this.tagRepository.save(tag);
            const updatedTag =  await this.tagRepository.findOne({where: {id: tagId}});
            return convertTagToGetTagWithCreatorDto(updatedTag)
        } catch (e) {
            throw e
        }
    }

    public async removeTag(userUuid: string, tagId: number): Promise<void> {
        try {
            const tag = await this.tagRepository.findOne({where: {id: tagId}, relations: { creator: true}});
            if(tag.creator.uuid !== userUuid) {
                throw new BadRequestException('Только владелец может удалить тег');
            }
            await this.tagRepository.delete({id: tagId})
        } catch (e) {
            throw e
        }
    }
}
