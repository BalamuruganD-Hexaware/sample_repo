import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfessorController } from "src/controllers/professor.controller";
import { Professor } from "src/entities/professor.entity";
import { ProfessorService } from "src/services/professor.service";

@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
