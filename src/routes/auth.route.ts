import { Router } from 'express';

import validator from '../middlewares/validator';
import { login, logout } from '../controllers/auth.controller';
import { loginSchema } from '../validations/login.schema';

const router = Router();

router.route('/login').post(validator(loginSchema), login);
router.route('/logout').get(logout);

export default router;
