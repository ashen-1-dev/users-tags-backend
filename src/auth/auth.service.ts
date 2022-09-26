import {HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {Request} from 'express'
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto";
import {SuccessAuthDto} from "./dto";
import {AuthByCredentialsDto} from "./dto";
import * as bcrypt from 'bcrypt'
import {JWT_SETTINGS} from "../../app.config";
import {User} from "../user/entities/User";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async register(createUserDto: CreateUserDto): Promise<SuccessAuthDto> {
        const {email, password, nickname} = createUserDto

        if(await this.userRepository.countBy([{nickname: nickname}, {email: email}])) {
            throw new HttpException('Пользователь с такими данными уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await this.hashPassword(password);
        const user = {password: hashPassword, email: email, nickname: nickname} as User
        await this.userRepository.insert(user)

        return this.performAuth(user)
    }


    public async authByCredentials(authByCredentialsDto: AuthByCredentialsDto): Promise<SuccessAuthDto> {
        const {password, email} = authByCredentialsDto
        const candidate = await this.userRepository.findOne({where: {email: email}})

        const passwordEquals = await bcrypt.compare(password, candidate?.password || '')
        if(passwordEquals && candidate ) {
            return this.performAuth(candidate)
        }
        throw new UnauthorizedException('Неверный email или пароль')
    }

    public async authByRefreshToken(refreshToken: string) {
        const user = await this.findUserByRefreshToken(refreshToken)
        if(!user) {
            throw new NotFoundException('Пользователь не найден')
        }
        return this.performAuth(user)
    }


    public async logoutByBearer(request: Request): Promise<void> {

    }

    private async performAuth(user: User): Promise<SuccessAuthDto> {
        return {
            token: this.generateToken(user),
            refreshToken: await this.generateRefreshToken(user),
            expire: JWT_SETTINGS.expiresIn,
        };
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 5);
    }

    private generateToken(user: User): string {
        const payload = {uuid: user.uuid}
        return this.jwtService.sign(payload)
    }

    private async generateRefreshToken(user: User): Promise<string> {
        const payload = {uuid: user.uuid}
        const refreshToken = this.jwtService.sign(payload)
        await this.userRepository.update({uuid: user.uuid}, {refreshToken: refreshToken})
        return refreshToken;
    }

    private findUserByRefreshToken(refreshToken: string) {
        return this.userRepository.findOne({where: {refreshToken: refreshToken}})
    }
}
