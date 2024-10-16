import express from 'express';
import {
    createTweet,
    likeTweet,
    getFeed,
} from '../controllers/tweet.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createTweet);
router.put('/like/:id', protect, likeTweet);
router.get('/feed', protect, getFeed);

export default router;
