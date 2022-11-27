import ErrorWithStatus from '../helpers/ErrorWithStatus';

import Teams from '../database/models/TeamsModel';

import ITeam from '../interfaces/ITeam';

export default class TeamsService {
  constructor(private model = Teams) { }

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: number): Promise<ITeam> {
    const team = await this.model.findByPk(id);

    if (!team) {
      throw new ErrorWithStatus('There is no team with such id!', 404);
    }

    return team;
  }
}
