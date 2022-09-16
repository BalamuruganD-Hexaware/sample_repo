import { Test } from "@nestjs/testing";
import { EmployeesService } from "src/services/employees.service";
import { EmployeesController } from "src/controllers/employees.controller";
import { Employees } from "src/entities/employees.entity";

describe("EmployeesController", () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const singleEmployees = {
    id: 1,
      name: "rapidx",
  } as Employees;

  const multipleEmployees = [
    {
      id: 1,
      name: "rapidx",
    }
  ] as Employees[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleEmployees),
      fetchOne: (id: number) => Promise.resolve(singleEmployees),
      create: (employees: Employees) => Promise.resolve(employees),
      delete: (id: number) => Promise.resolve(singleEmployees),
      update: (id: number, employees: Partial<Employees>) => Promise.resolve(employees),
    };

    const module = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(EmployeesController);
    service = module.get(EmployeesService);
  });

  describe("fetchAll", () => {
    it("should fetch all employees", async () => {
      const employees = await controller.fetchAll();
      expect(employees.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one employees for the given id", async () => {
      const employees = await controller.fetchOne("1");
      expect(employees.name).toEqual(singleEmployees.name);
    });
  });

  describe("Create employees", () => {
    it("should create a employees", async () => {
      const employees = await controller.create(singleEmployees);
      expect(employees.name).toEqual(singleEmployees.name);
    });
  });

  describe("Update employees", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, employees: Partial<Employees>) => Promise.resolve(null);
      await expect(controller.update("1", singleEmployees)).rejects.toThrow();
    });

    it("should return one employees for the given id", async () => {
      const employees = await controller.update("1", singleEmployees);
      expect(employees.name).toEqual(singleEmployees.name);
    });
  });

  describe("Delete employees", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one employees for the given id", async () => {
      const employees = await controller.delete("1");
      expect(employees.name).toEqual(singleEmployees.name);
    });
  });
});
