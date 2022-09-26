import {BadRequestException, Injectable} from "@nestjs/common";
import {AddTagsToUserDto} from "./dto/add-tags-to-user.dto";
import {In, Repository} from "typeorm";
import {EditUserDto, GetUserDto} from "./dto";
import {InjectRepository} from "@nestjs/typeorm";
import {convertTagToGetTagDto, GetTagDto} from "../tag";
import {convertUserToGetUserDto} from "./helpers";
import {User} from "./entities/User";
import {Tag} from "../tag/entities/Tag";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) {}

    public async getUser(userUuid: string): Promise<GetUserDto> {
        const user =  await this.userRepository.findOne(
            {where: {uuid: userUuid},
                relations: {tags: true},
            });
        return convertUserToGetUserDto(user);
    }

    public async editUser(userUuid: string, editUserDto: EditUserDto): Promise<GetUserDto> {
        try {
            await this.userRepository.update({uuid: userUuid}, editUserDto);
        } catch (e) {
            throw new BadRequestException('Пользователь с такими данными уже существует');
        }
        const user = await this.userRepository.findOne({where: {uuid: userUuid}});
        return convertUserToGetUserDto(user);
    }

    public async deleteUser(userUuid: string): Promise<void> {
        await this.userRepository.delete({uuid: userUuid});
    }

    public async addTags(userUuid: string, addTagsDto: AddTagsToUserDto): Promise<{ tags: GetTagDto[] }> {
        const {tags: tagIds} = addTagsDto;
        const tags = await this.tagRepository.find({where: [{id: In(tagIds)}]})
        if(tags.length !== tagIds.length) {
            throw new BadRequestException('Один или несколько тегов не существует')
        }
        const user = await this.userRepository.findOne({where: {uuid: userUuid}, relations: {tags: true}});
        user.tags.push(...tags)
        await this.userRepository.save(user);
        return {tags: user.tags.map(convertTagToGetTagDto)};
    }

    public async removeUserTag(userUuid: string, tagId): Promise<{ tags: GetTagDto[] }> {
        const user = await this.userRepository.findOne({where: {uuid: userUuid}, relations: {tags: true}});
        user.tags = user.tags.filter(tag => tag.id !== tagId);
        const userTags = (await this.userRepository.save(user)).tags;
        return {tags: userTags.map(convertTagToGetTagDto)};
    }

    public async getUserTags(userUuid: string): Promise<{ tags: GetTagDto[] }> {
        const userTags = await this.tagRepository.find({where: {creator: {uuid: userUuid}}});
        return {tags: userTags.map(convertTagToGetTagDto)};
    }
}