import { IsString, IsRequired, IsUnique, MaxLength, MinLength } from 'class-validator';

export class StudentDTO {
  @IsRequired()
  @IsUnique()
  @MaxLength(23)
  @MinLength(12)
  @IsString()
  name: string;
  
}
