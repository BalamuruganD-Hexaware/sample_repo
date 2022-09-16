import { Project } from "src/entities/project.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProjectService } from "src/services/project.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("ProjectService", () => {
  let service: ProjectService;
  let repo: Repository<Project>;

  const singleProject = {
    id: 1,
    name: "rapidx",
  } as Project;

  const multipleProjects = [
    {
      id: 1,
      name: "rapidx",
    }
  ] as  Project[];


  beforeEach(async () => {
    const mockRepo = {
      find: () => Promise.resolve(multipleProjects),
      findOne: (id: number) => Promise.resolve(singleProject),
      save: (project: Project) => Promise.resolve(project),
      create: (project: Project) => project,
      remove: (project: Project) => Promise.resolve(project),
    };

    const module = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(ProjectService);
    repo = module.get(getRepositoryToken(Project));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all projects from database", async () => {
      const projects = await service.fetchAll();
      expect(projects.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one project from the database", async () => {
      const project = await service.fetchOne(1);
      expect(project.name).toEqual(singleProject.name);
    });
    it("should fetch no projects from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const project = await service.fetchOne(1);
      expect(project).toBeNull();
    });
  });

  describe("Create project", () => {
    it("should create the project of the specified values", async () => {
      const project = await service.create(singleProject);
      expect(project.name).toEqual(singleProject.name);
    });
  });

  describe("Update project", () => {
    it("should return null when project is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const project = await service.update(1, {});
      expect(project).toBeNull();
    });

    it("should update the project of the specified id", async () => {
      const project = await service.update(1, singleProject);
      expect(project.name).toEqual(singleProject.name);
    });
  });

  describe("Delete project", () => {
    it("should return null when project is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const project = await service.delete(1);
      expect(project).toBeNull();
    });

    it("should delete the project of the specified id", async () => {
      const project = await service.delete(1);
      expect(project.id).toEqual(1);
    });
  });
});
