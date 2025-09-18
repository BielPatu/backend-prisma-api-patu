import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ToDoListModule } from './to-do-list/to-do-list.module';

@Module({
  imports: [DbModule, UserModule, ToDoListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
