import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authController.js';

router.post('/login', AuthController.loginUser);

export default router;
