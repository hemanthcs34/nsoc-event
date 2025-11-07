import express from 'express';
import {
  adminLogin,
  getAllTeamsAdmin,
  getLeaderboard,
  updateRound3Time,
  getEventStats,
  deleteTeam
} from '../controllers/adminController.js';
import { protect, adminOnly, superAdminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/login', adminLogin);

// Protected admin routes
router.get('/teams', protect, adminOnly, getAllTeamsAdmin);
router.get('/leaderboard', protect, adminOnly, getLeaderboard);
router.get('/stats', protect, adminOnly, getEventStats);
router.put('/round3/time/:teamId', protect, adminOnly, updateRound3Time);

// Super admin routes
router.delete('/teams/:teamId', protect, superAdminOnly, deleteTeam);

export default router;
