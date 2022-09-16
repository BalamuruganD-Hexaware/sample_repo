import { Test } from "@nestjs/testing";
import { TeamService } from "src/services/team.service";
import { TeamController } from "src/controllers/team.controller";
import { Team } from "src/entities/team.entity";

describe("TeamController", () => {
  let controller: TeamController;
  let service: TeamService;

  const singleTeam = {
    id: 1,
      name: "rapidx",
  } as Team;

  const multipleTeams = [
    {
      id: 1,
      name: "rapidx",
    }
  ] as Team[];

  beforeEach(async () => {
    const mockService = {
      fetchAll: () => Promise.resolve(multipleTeams),
      fetchOne: (id: number) => Promise.resolve(singleTeam),
      create: (team: Team) => Promise.resolve(team),
      delete: (id: number) => Promise.resolve(singleTeam),
      update: (id: number, team: Partial<Team>) => Promise.resolve(team),
    };

    const module = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(TeamController);
    service = module.get(TeamService);
  });

  describe("fetchAll", () => {
    it("should fetch all teams", async () => {
      const teams = await controller.fetchAll();
      expect(teams.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one team for the given id", async () => {
      const team = await controller.fetchOne("1");
      expect(team.name).toEqual(singleTeam.name);
    });
  });

  describe("Create team", () => {
    it("should create a team", async () => {
      const team = await controller.create(singleTeam);
      expect(team.name).toEqual(singleTeam.name);
    });
  });

  describe("Update team", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, team: Partial<Team>) => Promise.resolve(null);
      await expect(controller.update("1", singleTeam)).rejects.toThrow();
    });

    it("should return one team for the given id", async () => {
      const team = await controller.update("1", singleTeam);
      expect(team.name).toEqual(singleTeam.name);
    });
  });

  describe("Delete team", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one team for the given id", async () => {
      const team = await controller.delete("1");
      expect(team.name).toEqual(singleTeam.name);
    });
  });
});
