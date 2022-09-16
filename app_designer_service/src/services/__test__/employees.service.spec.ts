import { Employees } from "src/entities/employees.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EmployeesService } from "src/services/employees.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("EmployeesService", () => {
  let service: EmployeesService;
  let repo: Repository<Employees>;

  const singleEmployees = {
    id: 1,
    name: "rapidx",
  } as Employees;

  const multipleEmployees = [
    {
      id: 1,
      name: "rapidx",
    }
  ] as  Employees[];


  beforeEach(async () => {
    const mockRepo = {
      find: () => Promise.resolve(multipleEmployees),
      findOne: (id: number) => Promise.resolve(singleEmployees),
      save: (employees: Employees) => Promise.resolve(employees),
      create: (employees: Employees) => employees,
      remove: (employees: Employees) => Promise.resolve(employees),
    };

    const module = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employees),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(EmployeesService);
    repo = module.get(getRepositoryToken(Employees));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all employees from database", async () => {
      const employees = await service.fetchAll();
      expect(employees.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one employees from the database", async () => {
      const employees = await service.fetchOne(1);
      expect(employees.name).toEqual(singleEmployees.name);
    });
    it("should fetch no employees from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const employees = await service.fetchOne(1);
      expect(employees).toBeNull();
    });
  });

  describe("Create employees", () => {
    it("should create the employees of the specified values", async () => {
      const employees = await service.create(singleEmployees);
      expect(employees.name).toEqual(singleEmployees.name);
    });
  });

  describe("Update employees", () => {
    it("should return null when employees is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const employees = await service.update(1, {});
      expect(employees).toBeNull();
    });

    it("should update the employees of the specified id", async () => {
      const employees = await service.update(1, singleEmployees);
      expect(employees.name).toEqual(singleEmployees.name);
    });
  });

  describe("Delete employees", () => {
    it("should return null when employees is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const employees = await service.delete(1);
      expect(employees).toBeNull();
    });

    it("should delete the employees of the specified id", async () => {
      const employees = await service.delete(1);
      expect(employees.id).toEqual(1);
    });
  });
});
