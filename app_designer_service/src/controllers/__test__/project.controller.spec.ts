import { Test } from "@nestjs/testing";
import { ProjectService } from "src/services/project.service";
import { ProjectController } from "src/controllers/project.controller";
import { Project } from "src/entities/project.entity";

describe("ProjectController", () => {
  let controller: ProjectController;
  let service: ProjectService;

  const singleProject = {
    id: 1,
      name: "rapidx",
  } as Project;

  const multipleProjects = [
    {
      id: 1,
      name: "rapidx",
    }
  ] as Project[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleProjects),
      fetchOne: (id: number) => Promise.resolve(singleProject),
      create: (project: Project) => Promise.resolve(project),
      delete: (id: number) => Promise.resolve(singleProject),
      update: (id: number, project: Partial<Project>) => Promise.resolve(project),
    };

    const module = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(ProjectController);
    service = module.get(ProjectService);
  });

  describe("fetchAll", () => {
    it("should fetch all projects", async () => {
      const projects = await controller.fetchAll();
      expect(projects.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one project for the given id", async () => {
      const project = await controller.fetchOne("1");
      expect(project.name).toEqual(singleProject.name);
    });
  });

  describe("Create project", () => {
    it("should create a project", async () => {
      const project = await controller.create(singleProject);
      expect(project.name).toEqual(singleProject.name);
    });
  });

  describe("Update project", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, project: Partial<Project>) => Promise.resolve(null);
      await expect(controller.update("1", singleProject)).rejects.toThrow();
    });

    it("should return one project for the given id", async () => {
      const project = await controller.update("1", singleProject);
      expect(project.name).toEqual(singleProject.name);
    });
  });

  describe("Delete project", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one project for the given id", async () => {
      const project = await controller.delete("1");
      expect(project.name).toEqual(singleProject.name);
    });
  });
});
