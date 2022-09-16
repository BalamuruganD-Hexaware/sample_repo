import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Project } from './project.entity'; 

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.members)
  project: Project;
}
