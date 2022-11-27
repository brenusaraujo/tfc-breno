import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';

import ErrorWithStatus from '../helpers/ErrorWithStatus';

import IMatch from '../interfaces/IMatch';

export default class MatchesService {
  constructor(private model = Matches) { }

  async getAll(): Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });

    return matches;
  }

  async getAllByProgress(inProgress: boolean): Promise<Matches[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return matches;
  }

  async create(match: IMatch): Promise<Matches> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;

    if (homeTeam === awayTeam) {
      throw new ErrorWithStatus('It is not possible to create a match with two equal teams', 422);
    }

    const matchCreated = await this
      .model.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return matchCreated;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}
