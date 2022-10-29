import { IsString, IsRequired, IsUnique } from 'class-validator';

export class ProfessorDTO {
  @IsRequired()
  @IsUnique()
  @IsString()
  name: string;
  
}
