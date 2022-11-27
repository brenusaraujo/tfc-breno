import { Router } from 'express';

import authMiddleware from '../middlewares/authMiddleware';

import MatchesController from '../controllers/MatchesController';

const router = Router();

const matchesController = new MatchesController();

router.patch('/:id/finish', (req, res) => matchesController.finishMatch(req, res));

router.patch('/:id', (req, res) => matchesController.updateMatch(req, res));

router.post('/', authMiddleware, (req, res) => matchesController.create(req, res));

router.get('/', (req, res) => matchesController.getAll(req, res));

export default router;
