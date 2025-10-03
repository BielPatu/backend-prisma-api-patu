import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { PrismaService } from 'src/db/prisma.service';

@Module({
    imports: [DbModule],
    exports: [UsersModule, UsersService],
    controllers: [UsersController],
    providers: [UsersService, PrismaService]
})
export class UsersModule {}