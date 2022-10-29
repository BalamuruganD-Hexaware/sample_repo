import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Teacher } from "./teacher.entity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  teacher: Teacher;

}
