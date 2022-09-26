import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {Request} from 'express'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        try {
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' && !token) {
                throw new UnauthorizedException('Пользователь не авторизован')
            }
            const user = this.jwtService.verify(token);
            console.log(user)
            request.user = user;
            return true
        } catch (e) {
            throw new UnauthorizedException('Пользователь не авторизован')
        }

    }
}