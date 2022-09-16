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
import { Employees } from "src/entities/employees.entity";
import { EmployeesService } from "src/services/employees.service";
import { EmployeesDTO } from "src/dtos/employees.dto";

@Controller("/employees")
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get("")
  fetchAll() {
    return this.employeesService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const employees = await this.employeesService.fetchOne(+id);

    if (!employees) throw new NotFoundException("Employees not found");

    return employees;
  }

  @Post()
  create(@Body() employees: EmployeesDTO) {
    return this.employeesService.create(employees);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() employees: Partial<EmployeesDTO>) {
    const receivedEmployees = await this.employeesService.update(+id, employees);

    if (!receivedEmployees) throw new NotFoundException("Employees not found");

    return receivedEmployees;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedEmployees = await this.employeesService.delete(+id);

    if (!receivedEmployees) throw new NotFoundException("Employees not found");

    return receivedEmployees;
  }
}