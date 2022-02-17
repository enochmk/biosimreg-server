import { Router } from 'express';

// import validator from '../middlewares/validator';
import authHandler from '../middlewares/authHandler';
import { getStatistics } from '../controllers/user.controller';

const router = Router();

router.route('/stats').get(authHandler, getStatistics);

export default router;
