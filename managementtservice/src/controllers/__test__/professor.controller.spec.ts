import { Test } from "@nestjs/testing";
import { ProfessorService } from "src/services/professor.service";
import { ProfessorController } from "src/controllers/professor.controller";
import { Professor } from "src/entities/professor.entity";

describe("ProfessorController", () => {
  let controller: ProfessorController;
  let service: ProfessorService;

  const singleProfessor = {
    id: 1,
    name: "rapidx",
  } as Professor;

  const multipleProfessors = [
    {
      id: 1,
      name: "rapidx",
    },
  ] as Professor[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleProfessors),
      fetchOne: (id: number) => Promise.resolve(singleProfessor),
      create: (professor: Professor) => Promise.resolve(professor),
      delete: (id: number) => Promise.resolve(singleProfessor),
      update: (id: number, professor: Partial<Professor>) => Promise.resolve(professor),
    };

    const module = await Test.createTestingModule({
      controllers: [ProfessorController],
      providers: [
        {
          provide: ProfessorService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(ProfessorController);
    service = module.get(ProfessorService);
  });

  describe("fetchAll", () => {
    it("should fetch all professors", async () => {
      const professors = await controller.fetchAll();
      expect(professors.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one professor for the given id", async () => {
      const professor = await controller.fetchOne("1");
      expect(professor.name).toEqual(singleProfessor.name);
    });
  });

  describe("Create professor", () => {
    it("should create a professor", async () => {
      const professor = await controller.create(singleProfessor);
      expect(professor.name).toEqual(singleProfessor.name);
    });
  });

  describe("Update professor", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, professor: Partial<Professor>) => Promise.resolve(null);
      await expect(controller.update("1", singleProfessor)).rejects.toThrow();
    });

    it("should return one professor for the given id", async () => {
      const professor = await controller.update("1", singleProfessor);
      expect(professor.name).toEqual(singleProfessor.name);
    });
  });

  describe("Delete professor", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one professor for the given id", async () => {
      const professor = await controller.delete("1");
      expect(professor.name).toEqual(singleProfessor.name);
    });
  });
});
