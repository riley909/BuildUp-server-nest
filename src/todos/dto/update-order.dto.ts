import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  order: number;
}
