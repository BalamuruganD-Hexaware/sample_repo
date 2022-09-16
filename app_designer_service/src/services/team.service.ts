import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "src/entities/team.entity";
import { TeamDTO } from "src/dtos/team.dto";
import { Repository } from "typeorm";

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepo: Repository<Team>,
  ) {}

  fetchAll() {
    return this.teamRepo.find();
  }

  fetchOne(id: number) {
    return this.teamRepo.findOne({
      where: { id },
    });
  }

  create(team: TeamDTO) {
    const newTeam = this.teamRepo.create(team);
    return this.teamRepo.save(newTeam);
  }

  async update(id: number, attrs: Partial<TeamDTO>) {
    const team = await this.fetchOne(id);

    if (!team) {
      return null;
    }

    Object.assign(team, attrs);
    return this.teamRepo.save(team);
  }

  async delete(id: number) {
    const team = await this.fetchOne(id);

    if (!team) {
      return null;
    }

    return this.teamRepo.remove(team);
  }
}
