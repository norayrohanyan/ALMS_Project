import express from 'express';
import UserController from '../controllers/userController.js';


const router = express.Router();

router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);

export default router;
