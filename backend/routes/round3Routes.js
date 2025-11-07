import express from 'express';
import {
  getChallengeLink,
  submitRound3,
  getRound3Data,
  verifyRound3
} from '../controllers/round3Controller.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/challenge/:teamId', getChallengeLink);
router.post('/submit', submitRound3);
router.get('/team/:teamId', getRound3Data);

// Admin routes
router.put('/verify/:teamId', protect, adminOnly, verifyRound3);

export default router;
