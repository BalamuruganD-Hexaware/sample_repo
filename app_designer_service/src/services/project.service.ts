import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/entities/project.entity";
import { ProjectDTO } from "src/dtos/project.dto";
import { Repository } from "typeorm";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  fetchAll() {
    return this.projectRepo.find();
  }

  fetchOne(id: number) {
    return this.projectRepo.findOne({
      where: { id },
    });
  }

  create(project: ProjectDTO) {
    const newProject = this.projectRepo.create(project);
    return this.projectRepo.save(newProject);
  }

  async update(id: number, attrs: Partial<ProjectDTO>) {
    const project = await this.fetchOne(id);

    if (!project) {
      return null;
    }

    Object.assign(project, attrs);
    return this.projectRepo.save(project);
  }

  async delete(id: number) {
    const project = await this.fetchOne(id);

    if (!project) {
      return null;
    }

    return this.projectRepo.remove(project);
  }
}
