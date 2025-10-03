import { DbModule } from './db/db.module';
import { UsersModule } from './user/user.module';
import { ToDoListModule } from './to-do-list/to-do-list.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    DbModule, UsersModule, ToDoListModule, AuthModule
  ],
})
export class AppModule {}




