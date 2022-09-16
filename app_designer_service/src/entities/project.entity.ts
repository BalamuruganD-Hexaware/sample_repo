import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Student } from './student.entity'; 

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.project, { cascade: true })
  members: Student[];
}
