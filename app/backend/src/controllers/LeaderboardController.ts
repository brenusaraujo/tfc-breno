import { Request, Response } from 'express';

import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor() {
    this._leaderboardService = new LeaderboardService();
  }

  async getAllByHome(req: Request, res: Response): Promise<Response> {
    const leaderboardByHome = await this._leaderboardService.getAllByHome();
    return res.status(200).json(leaderboardByHome);
  }

  async getAllByAway(req: Request, res: Response): Promise<Response> {
    const leaderboardByAway = await this._leaderboardService.getAllByAway();
    return res.status(200).json(leaderboardByAway);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const leaderboard = await this._leaderboardService.getAll();
    return res.status(200).json(leaderboard);
  }
}
