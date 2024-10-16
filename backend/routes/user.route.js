import express from 'express';
import { followUser, getUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.put('/follow/:id', protect, followUser);
router.get('/:id', protect, getUserProfile);

export default router;
