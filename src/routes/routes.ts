import { Router } from 'express';

import auth from './auth.route';
import profile from './profile.route';
import user from './user.route';
import verifyJWT from '../middlewares/verifyJWT';

const router = Router();

router.use('/v1/auth', auth);
router.use('/v1/users', verifyJWT, user);
router.use('/v1/profile', verifyJWT, profile);

export default router;
