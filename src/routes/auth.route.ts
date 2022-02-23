import { Router } from 'express';

import validator from '../middlewares/validator';
import { handleLogin, handleLogout, handleRefreshToken } from '../controllers/auth.controller';
import { loginSchema } from '../validations/login.schema';

const router = Router();

router.route('/login').post(validator(loginSchema), handleLogin);
router.route('/refresh').get(handleRefreshToken);
router.route('/logout').post(handleLogout);

export default router;
