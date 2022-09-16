import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeesController } from "src/controllers/employees.controller";
import { Employees } from "src/entities/employees.entity";
import { EmployeesService } from "src/services/employees.service";

@Module({
  imports: [TypeOrmModule.forFeature([Employees])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}