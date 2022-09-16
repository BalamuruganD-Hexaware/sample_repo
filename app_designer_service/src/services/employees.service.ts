import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employees } from "src/entities/employees.entity";
import { EmployeesDTO } from "src/dtos/employees.dto";
import { Repository } from "typeorm";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeesRepo: Repository<Employees>,
  ) {}

  fetchAll() {
    return this.employeesRepo.find();
  }

  fetchOne(id: number) {
    return this.employeesRepo.findOne({
      where: { id },
    });
  }

  create(employees: EmployeesDTO) {
    const newEmployees = this.employeesRepo.create(employees);
    return this.employeesRepo.save(newEmployees);
  }

  async update(id: number, attrs: Partial<EmployeesDTO>) {
    const employees = await this.fetchOne(id);

    if (!employees) {
      return null;
    }

    Object.assign(employees, attrs);
    return this.employeesRepo.save(employees);
  }

  async delete(id: number) {
    const employees = await this.fetchOne(id);

    if (!employees) {
      return null;
    }

    return this.employeesRepo.remove(employees);
  }
}
