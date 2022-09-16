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
import { Project } from "src/entities/project.entity";
import { ProjectService } from "src/services/project.service";
import { ProjectDTO } from "src/dtos/project.dto";

@Controller("/project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get("")
  fetchAll() {
    return this.projectService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const project = await this.projectService.fetchOne(+id);

    if (!project) throw new NotFoundException("Project not found");

    return project;
  }

  @Post()
  create(@Body() project: ProjectDTO) {
    return this.projectService.create(project);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() project: Partial<ProjectDTO>) {
    const receivedProject = await this.projectService.update(+id, project);

    if (!receivedProject) throw new NotFoundException("Project not found");

    return receivedProject;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedProject = await this.projectService.delete(+id);

    if (!receivedProject) throw new NotFoundException("Project not found");

    return receivedProject;
  }
}