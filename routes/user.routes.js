import  { Router } from 'express';
import * as userController from '../controllers/user.controllers.js';
import * as authMiddleware from '../middleware/auth.middleware.js';
import {body} from 'express-validator';
const router= Router();


router.post('/register',
       body('email').isEmail().withMessage('Invalid email format'),
       body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),    
    userController.createUserController);

router.post('/login',
       body('email').isEmail().withMessage('Invalid email format'),
       body('password').notEmpty().withMessage('Password cannot be empty'),
    userController.loginUserController);

router.get('/profile',authMiddleware.authUser, userController.getUserController);

export default router;