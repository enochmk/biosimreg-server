import { Router } from 'express';

import { login } from '../controllers/auth.controller';
import validator from '../middlewares/validator';
import { loginSchema } from '../validations/login.schema';

const router = Router();

router.route('/login').post(validator(loginSchema), login);

export default router;
