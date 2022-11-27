import { Request, Response } from 'express';
import ITeam from '../interfaces/ITeam';

interface ITeamsService {
  getAll(): Promise<ITeam[]>;
  getById(id: number): Promise<ITeam>;
}

export default class TeamsController {
  private _teamsService: ITeamsService;

  constructor(teamsService: ITeamsService) {
    this._teamsService = teamsService;
  }

  async getAll(req: Request, res: Response) {
    const teams = await this._teamsService.getAll();
    return res.status(200).json(teams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this._teamsService.getById(Number(id));
    return res.status(200).json(team);
  }
}
