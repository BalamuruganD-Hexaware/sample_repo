import { IsString } from 'class-validator';

export class StudentDTO {
  @IsString()
  name: string;
}
