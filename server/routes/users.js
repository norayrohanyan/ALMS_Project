import express from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/registration',
  [
    body('username').isLength({ min:1}).withMessage('Invalid username'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 4, max: 32 }).withMessage('Password must be between 4 and 32 characters'),
  ],
  UserController.createUser
);

router.post('/login', UserController.loginUser);
router.post('/refresh', UserController.refresh);
router.get('/data', authMiddleware, UserController.getUserData);

export default router;
