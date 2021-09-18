import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  order: number;
}
