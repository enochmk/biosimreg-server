import { Router } from 'express';
import verifyJWT from '../middlewares/verifyJWT';

import auth from './auth.route';
import user from './user.route';
import profile from './profile.route';

const router = Router();

router.use('/v1/auth', auth);

router.use(verifyJWT);
router.use('/v1/users', user);
router.use('/v1/profile', profile);

export default router;
