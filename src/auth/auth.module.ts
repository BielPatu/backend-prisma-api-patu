import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import { AuthController } from './auth.controller';
import { UsersService } from 'src/user/user.service';
import { PrismaService } from 'src/db/prisma.service';
import { UsersModule } from 'src/user/user.module';



@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, PrismaService],
  exports: [
    PassportModule,
    JwtModule
  ],
})
export class AuthModule {
}