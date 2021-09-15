import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDate()
  created: Date;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsBoolean()
  isChecked: boolean;
}
