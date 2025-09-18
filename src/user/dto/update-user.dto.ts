import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export interface UpdateUserDto extends Partial<CreateUserDto>
{
    id: number;
}
