import express from 'express';
import {
    createComment,
    getCommentsByTweet,
    deleteComment,
} from '../controllers/comment.controller.js';

import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createComment);
router.get('/:id', protect, getCommentsByTweet);
router.delete('/:id', protect, deleteComment);

export default router;
