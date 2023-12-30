import express from 'express';
import UserController from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/registration', UserController.createUser);
router.get('/data', verifyToken, UserController.getUserData);
export default router;
