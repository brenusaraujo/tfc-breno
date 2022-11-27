import { NextFunction, Request, Response } from 'express';
import schemas from './schemas';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemas.loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export default validateLogin;
