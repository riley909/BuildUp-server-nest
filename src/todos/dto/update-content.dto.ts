import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateContentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
