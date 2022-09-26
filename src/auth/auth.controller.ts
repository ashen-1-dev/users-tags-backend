import {Body, Controller, Post, Req} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthByCredentialsDto, CreateUserDto, RefreshTokenDto, SuccessAuthDto} from "./dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Request} from 'express';

@Controller()
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/signin')
    @ApiOperation({summary: 'register'})
    public async register(@Body() createUserDto: CreateUserDto): Promise<SuccessAuthDto> {
        return await this.authService.register(createUserDto);
    }

    @Post('/login')
    @ApiOperation({summary: 'login'})
    public async authByCredentials(@Body() authByCredentialsDto: AuthByCredentialsDto): Promise<SuccessAuthDto> {
        return await this.authService.authByCredentials(authByCredentialsDto);
    }

    @Post('/logout')
    @ApiOperation({summary: 'logout'})
    public async logoutByBearer(@Req() request: Request) {
        return await this.authService.logoutByBearer(request)
    }

    @Post('/refresh')
    @ApiOperation({summary: 'auth by refresh token'})
    public async authByRefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return await this.authService.authByRefreshToken(refreshTokenDto.refreshToken)
    }
}