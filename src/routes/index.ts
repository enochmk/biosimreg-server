import { Router } from 'express';
import auth from './auth.route';

const router = Router();

router.use('/v1/auth', auth);

export default router;
