import { Router } from 'express';
import verifyJWT from '../middlewares/verifyJWT';

import auth from './auth.route';
import user from './user.route';
import refresh from './refresh.route';

const router = Router();

router.use('/v1/auth', auth);
router.use(verifyJWT);
router.use('/v1/users', user);
router.use('/v1/refresh', refresh);

export default router;
