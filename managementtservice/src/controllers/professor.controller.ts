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
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";

@Controller("/professor")
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  @Get("")
  fetchAll() {
    return this.professorService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const professor = await this.professorService.fetchOne(+id);

    if (!professor) throw new NotFoundException("Professor not found");

    return professor;
  }

  @Post()
  create(@Body() professor: Professor) {
    return this.professorService.create(professor);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() professor: Partial<Professor>) {
    const receivedProfessor = await this.professorService.update(+id, professor);

    if (!receivedProfessor) throw new NotFoundException("Professor not found");

    return receivedProfessor;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedProfessor = await this.professorService.delete(+id);

    if (!receivedProfessor) throw new NotFoundException("Professor not found");

    return receivedProfessor;
  }
}
