import { IsString } from 'class-validator';

export class TeamDTO {
  @IsString()
  name: string;
}
