import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToDoListDto } from './dto/create-to-do-list.dto';
import { UpdateToDoListDto } from './dto/update-to-do-list.dto';
import { PrismaService } from 'src/db/prisma.service';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class ToDoListService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async create(createToDoListDto: CreateToDoListDto) {
    const userInfo = await this.prismaService.user.findUnique({
      where: { id: createToDoListDto.userId },
    });

    if (!userInfo) {
      throw new NotFoundException('Usuário não encontrado');
    }
    console.log(userInfo);
    return this.prismaService.toDoList.create({
      data: createToDoListDto,
    });
  }

  findAll() {
    return this.prismaService.toDoList.findMany();
  }

  findOne(id: number) {
    return this.prismaService.toDoList.findUnique({ where: { id } });
  }

  update(id: number, updateToDoListDto: UpdateToDoListDto) {
    return this.prismaService.toDoList.update({
      where: { id },
      data: updateToDoListDto,
    });
  }

  remove(id: number) {
    return this.prismaService.toDoList.delete({ where: { id } });
  }
}
