import { Request, Response } from 'express';
import IUserLogin from '../interfaces/IUserLogin';

interface ILoginService {
  login(user: IUserLogin): Promise<string>
}

export default class LoginController {
  private _loginService: ILoginService;

  constructor(loginService: ILoginService) {
    this._loginService = loginService;
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await this._loginService.login({ email, password });
    return res.status(200).json({ token });
  }

  validate = (req: Request, res: Response): Response => {
    const { user } = req.body;
    return res.status(200).json({ role: user.role });
  };
}
