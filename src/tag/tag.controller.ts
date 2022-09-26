import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards} from "@nestjs/common";
import {PaginatedDto} from "../core/paginate";
import {TagService} from "./tag.service";
import {CreateTagDto, GetTagDto, GetTagWithCreatorDto} from "./dto";
import {TagRequest} from "./tag-request";
import {JwtAuthGuard} from "../auth";
import {EditTagDto} from "./edit-tag.dto";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Request} from 'express';
import {User} from "../user/entities/User";


@Controller('tag')
@UseGuards(JwtAuthGuard)
@ApiTags('tag')
@ApiBearerAuth()
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    public async createTag(@Req() request: Request, @Body() createTagDto: CreateTagDto): Promise<GetTagDto> {
        const user = request.user as User
        return await this.tagService.createTag(user.uuid, createTagDto)
    }

    @Get(':id')
    public async getTag(@Param('id') id: number): Promise<GetTagWithCreatorDto> {
        return await this.tagService.getTag(id);
    }

    @Get()
    public async getTags(@Query() tagRequest: TagRequest): Promise<PaginatedDto<GetTagWithCreatorDto>> {
        return await this.tagService.getTags(tagRequest)
    }

    @Put(':id')
    public async editTag(@Req() request: Request,
                         @Param('id') id: number,
                         @Body() editTagDto: EditTagDto): Promise<GetTagWithCreatorDto> {
        const user = request.user as User;
        return await this.tagService.editTag(user.uuid, id, editTagDto)
    }

    @Delete(':id')
    public async removeTag(@Req() request: Request,
                         @Param('id') id: number): Promise<void> {
        const user = request.user as User;
        return await this.tagService.removeTag(user.uuid, id)
    }
}
