import { Team } from "src/entities/team.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TeamService } from "src/services/team.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("TeamService", () => {
  let service: TeamService;
  let repo: Repository<Team>;

  const singleTeam = {
    id: 1,
    name: "rapidx",
  } as Team;

  const multipleTeams = [
    {
      id: 1,
      name: "rapidx",
    }
  ] as  Team[];


  beforeEach(async () => {
    const mockRepo = {
      find: () => Promise.resolve(multipleTeams),
      findOne: (id: number) => Promise.resolve(singleTeam),
      save: (team: Team) => Promise.resolve(team),
      create: (team: Team) => team,
      remove: (team: Team) => Promise.resolve(team),
    };

    const module = await Test.createTestingModule({
      providers: [
        TeamService,
        {
          provide: getRepositoryToken(Team),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(TeamService);
    repo = module.get(getRepositoryToken(Team));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all teams from database", async () => {
      const teams = await service.fetchAll();
      expect(teams.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one team from the database", async () => {
      const team = await service.fetchOne(1);
      expect(team.name).toEqual(singleTeam.name);
    });
    it("should fetch no teams from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const team = await service.fetchOne(1);
      expect(team).toBeNull();
    });
  });

  describe("Create team", () => {
    it("should create the team of the specified values", async () => {
      const team = await service.create(singleTeam);
      expect(team.name).toEqual(singleTeam.name);
    });
  });

  describe("Update team", () => {
    it("should return null when team is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const team = await service.update(1, {});
      expect(team).toBeNull();
    });

    it("should update the team of the specified id", async () => {
      const team = await service.update(1, singleTeam);
      expect(team.name).toEqual(singleTeam.name);
    });
  });

  describe("Delete team", () => {
    it("should return null when team is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const team = await service.delete(1);
      expect(team).toBeNull();
    });

    it("should delete the team of the specified id", async () => {
      const team = await service.delete(1);
      expect(team.id).toEqual(1);
    });
  });
});
