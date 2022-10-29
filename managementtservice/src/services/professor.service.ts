import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Professor } from "src/entities/professor.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private professorRepo: Repository<Professor>,
  ) {}

  fetchAll() {
    return this.professorRepo.find();
  }

  fetchOne(id: number) {
    return this.professorRepo.findOne({
      where: { id },
    });
  }

  create(professor: Professor) {
    const newProfessor = this.professorRepo.create(professor);
    return this.professorRepo.save(newProfessor);
  }

  async update(id: number, attrs: Partial<Professor>) {
    const professor = await this.fetchOne(id);

    if (!professor) {
      return null;
    }

    Object.assign(professor, attrs);
    return this.professorRepo.save(professor);
  }

  async delete(id: number) {
    const professor = await this.fetchOne(id);

    if (!professor) {
      return null;
    }

    return this.professorRepo.remove(professor);
  }
}
