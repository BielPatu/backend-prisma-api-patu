import { Module } from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ToDoListController } from './to-do-list.controller';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/user/user.module';

@Module({
  controllers: [ToDoListController],
  providers: [ToDoListService],
  imports: [DbModule, UsersModule],
})
export class ToDoListModule {}
