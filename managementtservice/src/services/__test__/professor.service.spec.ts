import { Professor } from "src/entities/professor.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProfessorService } from "src/services/professor.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("ProfessorService", () => {
  let service: ProfessorService;
  let repo: Repository<Professor>;

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
    const mockRepo = {
      find: () => Promise.resolve(multipleProfessors),
      findOne: (id: number) => Promise.resolve(singleProfessor),
      save: (professor: Professor) => Promise.resolve(professor),
      create: (professor: Professor) => professor,
      remove: (professor: Professor) => Promise.resolve(professor),
    };

    const module = await Test.createTestingModule({
      providers: [
        ProfessorService,
        {
          provide: getRepositoryToken(Professor),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(ProfessorService);
    repo = module.get(getRepositoryToken(Professor));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all professors from database", async () => {
      const professors = await service.fetchAll();
      expect(professors.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one professor from the database", async () => {
      const professor = await service.fetchOne(1);
      expect(professor.name).toEqual(singleProfessor.name);
    });
    it("should fetch no professors from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const professor = await service.fetchOne(1);
      expect(professor).toBeNull();
    });
  });

  describe("Create professor", () => {
    it("should create the professor of the specified values", async () => {
      const professor = await service.create(singleProfessor);
      expect(professor.name).toEqual(singleProfessor.name);
    });
  });

  describe("Update professor", () => {
    it("should return null when professor is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const professor = await service.update(1, {});
      expect(professor).toBeNull();
    });

    it("should update the professor of the specified id", async () => {
      const professor = await service.update(1, singleProfessor);
      expect(professor.name).toEqual(singleProfessor.name);
    });
  });

  describe("Delete professor", () => {
    it("should return null when professor is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const professor = await service.delete(1);
      expect(professor).toBeNull();
    });

    it("should delete the professor of the specified id", async () => {
      const professor = await service.delete(1);
      expect(professor.id).toEqual(1);
    });
  });
});
