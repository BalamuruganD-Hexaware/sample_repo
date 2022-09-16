import { IsString } from 'class-validator';

export class EmployeesDTO {
  @IsString()
  name: string;
}
