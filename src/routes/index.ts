import { Router } from 'express';

import auth from './auth.route';
import user from './user.route';

const router = Router();

router.use('/v1/auth', auth);
router.use('/v1/users', user);

export default router;
