import { Router } from 'express';

import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/:id', (req, res) => teamsController.getById(req, res));

router.get('/', (req, res) => teamsController.getAll(req, res));

export default router;
