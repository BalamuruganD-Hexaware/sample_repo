import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Student } from "src/entities/student.entity";
import { StudentService } from "src/services/student.service";
import { StudentDTO } from "src/dtos/student.dto";

@Controller("/student")
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get("")
  fetchAll() {
    return this.studentService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const student = await this.studentService.fetchOne(+id);

    if (!student) throw new NotFoundException("Student not found");

    return student;
  }

  @Post()
  create(@Body() student: StudentDTO) {
    return this.studentService.create(student);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() student: Partial<StudentDTO>) {
    const receivedStudent = await this.studentService.update(+id, student);

    if (!receivedStudent) throw new NotFoundException("Student not found");

    return receivedStudent;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedStudent = await this.studentService.delete(+id);

    if (!receivedStudent) throw new NotFoundException("Student not found");

    return receivedStudent;
  }
}