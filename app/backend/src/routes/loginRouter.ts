import { Router } from 'express';

import validateLogin from '../middlewares/validateLogin';
import authMiddleware from '../middlewares/authMiddleware';

import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';

const router = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.get('/validate', authMiddleware, (req, res) => loginController.validate(req, res));

router.post('/', validateLogin, (req, res) => loginController.login(req, res));

export default router;
