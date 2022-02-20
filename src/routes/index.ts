import { Router } from 'express';
import verifyJWT from '../middlewares/verifyJWT';

import auth from './auth.route';
import user from './user.route';

const router = Router();

router.use('/v1/auth', auth);
router.use(verifyJWT);
router.use('/v1/users', user);

export default router;
