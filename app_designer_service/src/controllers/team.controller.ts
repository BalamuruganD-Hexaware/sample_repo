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
import { Team } from "src/entities/team.entity";
import { TeamService } from "src/services/team.service";
import { TeamDTO } from "src/dtos/team.dto";

@Controller("/team")
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Get("")
  fetchAll() {
    return this.teamService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const team = await this.teamService.fetchOne(+id);

    if (!team) throw new NotFoundException("Team not found");

    return team;
  }

  @Post()
  create(@Body() team: TeamDTO) {
    return this.teamService.create(team);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() team: Partial<TeamDTO>) {
    const receivedTeam = await this.teamService.update(+id, team);

    if (!receivedTeam) throw new NotFoundException("Team not found");

    return receivedTeam;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedTeam = await this.teamService.delete(+id);

    if (!receivedTeam) throw new NotFoundException("Team not found");

    return receivedTeam;
  }
}