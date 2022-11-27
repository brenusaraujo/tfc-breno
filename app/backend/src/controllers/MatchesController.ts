import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

import MatchesService from '../services/MatchesService';

export default class MatchesController {
  private _matchesService: MatchesService;
  private _teamsService: TeamsService;

  constructor() {
    this._matchesService = new MatchesService();
    this._teamsService = new TeamsService();
  }

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const matches = await this._matchesService.getAll();
      return res.status(200).json(matches);
    }

    const matchesByProgress = await this._matchesService.getAllByProgress(inProgress === 'true');
    return res.status(200).json(matchesByProgress);
  }

  async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const teamsId = [homeTeam, awayTeam];
    const teamsById = teamsId.map((id) => this._teamsService.getById(id));
    await Promise.all(teamsById);

    const matchCreated = await this
      ._matchesService.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
    res.status(201).json(matchCreated);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this._matchesService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this._matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Updated match' });
  }
}
