import { Router } from 'express';

import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/away', (req, res) => leaderboardController.getAllByAway(req, res));

router.get('/home', (req, res) => leaderboardController.getAllByHome(req, res));

router.get('/', (req, res) => leaderboardController.getAll(req, res));

export default router;
