import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Employees } from './employees.entity'; 

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Employees, (employees) => employees.team, { cascade: true })
  members: Employees[];
}
