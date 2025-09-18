import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoListDto } from './create-to-do-list.dto';

export interface UpdateToDoListDto extends Partial<CreateToDoListDto>
{
    id: number;
}
