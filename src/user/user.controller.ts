import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from "@nestjs/common";
import {AddTagsToUserDto} from "./dto/add-tags-to-user.dto";
import {UserService} from "./user.service";
import {EditUserDto, GetUserDto} from "./dto";
import {GetTagDto} from "../tag";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Request} from 'express'
import {User} from "./entities/User";
import {JwtAuthGuard} from "../core/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
       private readonly userService: UserService
    ) {}

    @Get()
    public async getUser(@Req() request: Request): Promise<GetUserDto> {
        const user = request.user as User
        return this.userService.getUser(user.uuid)
    }

    @Put()
    public async editUser(@Req() request: Request, @Body() createUserDto: EditUserDto): Promise<EditUserDto> {
        const user = request.user as User
        return this.userService.editUser(user.uuid, createUserDto)
    }

    @Delete()
    public async deleteUser(@Req() request: Request): Promise<void> {
        const user = request.user as User;
        return await this.userService.deleteUser(user.uuid)
    }

    @Post('tag')
    public async addTags(@Req() request: Request, @Body() addTagsDto: AddTagsToUserDto): Promise<{ tags: GetTagDto[] }> {
        const user = request.user as User;
        return await this.userService.addTags(user.uuid, addTagsDto)
    }

    @Delete('tag/:id')
    public async removeUserTag(@Req() request: Request, @Param('id') id: number): Promise<{ tags: GetTagDto[] }> {
        const user = request.user as User;
        return await this.userService.removeUserTag(user.uuid, id)
    }

    @Get('tag/my')
    public async getUserTags(@Req() request: Request): Promise<{ tags: GetTagDto[] }> {
        const user = request.user as User;
        return await this.userService.getUserTags(user.uuid);
    }
}