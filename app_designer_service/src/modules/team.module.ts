import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamController } from "src/controllers/team.controller";
import { Team } from "src/entities/team.entity";
import { TeamService } from "src/services/team.service";

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}