import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { PrismaService } from 'src/db/prisma.service';
import { CreateUserDto, LoginUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: "ACCOUNT_CREATE_SUCCESS",
        };

        try {
            const createdUser: any = await this.usersService.create(userDto); // <-- ignora o tipo
            const { password, ...userWithoutPassword } = createdUser;

            status.data = userWithoutPassword;
        } catch (err) {
            status = {
                success: false,
                message: err.message || "ACCOUNT_CREATE_FAILED",
            };
        }

        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.usersService.findByLogin(loginUserDto);

        const token = this._createToken(user);

        return {
            message: "LOGIN_SUCCESS",
            ...token,
            data: user, // já está sem a senha no método findByLogin
        };
    }

    private _createToken({ login }): any {
        const user: JwtPayload = { login };
        const Authorization = this.jwtService.sign(user);
        return {
            expiresIn: process.env.EXPIRESIN,
            Authorization,
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException("INVALID_TOKEN", HttpStatus.UNAUTHORIZED);
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

export interface RegistrationStatus {
    success: boolean;
    message: string;
    data?: User;
}

export interface RegistrationSeederStatus { success: boolean; message: string; data?: User[]; }
