import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Put,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UsersService } from './user.service';
import { UpdatePasswordDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('me')
    public async me(@Request() req) {
        return new req.user;
    }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Put('update/password')
    public async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
        await this.usersService.updatePassword(updatePasswordDto, req.user.id);
        return {
            message: "password_update_success"
        };
    }
    @Get()
    public async findAll() {
      return this.usersService.findAll(); 
    }

}
