import { compare } from 'bcryptjs';

import tokenFunction from '../helpers/generateToken';
import Users from '../database/models/UsersModel';
import IUserLogin from '../interfaces/IUserLogin';
import ErrorWithStatus from '../helpers/ErrorWithStatus';

export default class LoginService {
  constructor(private model = Users) { }

  async login(user: IUserLogin): Promise<string> {
    const { email, password } = user;

    const userFound = await this.model.findOne({ where: { email } });

    if (!userFound) {
      throw new ErrorWithStatus('Incorrect email or password', 401);
    }

    const validPassword = await compare(password, userFound.password);

    if (!validPassword) {
      throw new ErrorWithStatus('Incorrect email or password', 401);
    }

    const token = tokenFunction.generateToken(userFound.id, userFound.role);
    return token;
  }
}
