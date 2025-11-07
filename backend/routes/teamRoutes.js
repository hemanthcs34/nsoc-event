import express from 'express';
import {
  registerTeam,
  getTeamById,
  getTeamByName,
  getAllTeams
} from '../controllers/teamController.js';

const router = express.Router();

// Public routes
router.post('/register', registerTeam);
router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.get('/name/:teamName', getTeamByName);

export default router;
