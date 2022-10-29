import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.teacher, { cascade: true })
  students: Student[];

}
