import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Team } from './team.entity'; 

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;
}
