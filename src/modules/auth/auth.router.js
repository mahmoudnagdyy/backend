import { Router } from "express";
 import * as authController from './controller/auth.js';

const router = Router();



router.post('/signup', authController.signUp)
router.get('/confirmEmail/:token', authController.confirmEmail)

router.post('/login', authController.login)








export default router;