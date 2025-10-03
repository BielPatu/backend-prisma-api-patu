import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {compare, hash} from 'bcrypt'
import { PrismaService } from 'src/db/prisma.service';
import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto, UpdatePasswordDto } from './dto/create-user.dto';

interface FormatLogin extends Partial<User> {
    login: string
}

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
    ) {
    }

    //use by user module to change user password
    async updatePassword(payload: UpdatePasswordDto, id: number): 
      Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {id}
        });
        if (!user) {
            throw new HttpException("invalid_credentials",  
                HttpStatus.UNAUTHORIZED);
        }
        // compare passwords
        const areEqual = await compare(payload.old_password,
                                  user.password);
        if (!areEqual) {
            throw new HttpException("invalid_credentials", 
               HttpStatus.UNAUTHORIZED);
        }
        return await this.prisma.user.update({
            where: {id},
            data: {password:  await hash(payload.new_password, 10)}
        });
    }
//use by auth module to register user in database
    async create(userDto: CreateUserDto): Promise<User> {
    const userInDb = await this.prisma.user.findFirst({
        where: { login: userDto.login },
    });

    if (userInDb) {
        throw new HttpException("user_already_exist", HttpStatus.CONFLICT);
    }

    const hashedPassword = await hash(userDto.password, 10);

    const newUser = await this.prisma.user.create({
        data: {
            login: userDto.login,
            email: userDto.email,
            password: hashedPassword,
        },
    });

    return newUser;
}
//use by auth module to login user
    async findByLogin({login, password}: LoginUserDto):  
                                   Promise<FormatLogin> {
        const user = await this.prisma.user.findFirst({
            where: {login}
        });

        if (!user) {
            throw new HttpException("invalid_credentials",  
                  HttpStatus.UNAUTHORIZED);
        }

        // compare passwords
        const areEqual = await compare(password, user.password);

        if (!areEqual) {
            throw new HttpException("invalid_credentials",
                HttpStatus.UNAUTHORIZED);
        }

        const {password: p, ...rest} = user;
        return rest;
    }

    //use by auth module to get user in database
    async findByPayload({login}: any): Promise<any> {
        return await this.prisma.user.findFirst({
            where: {login}
        });
    }

    async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

}