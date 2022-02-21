import { Router } from 'express';

import { getDetails, getStats } from '../controllers/profile.controller';

const router = Router();

router.route('/').get(getDetails);
router.route('/stats').get(getStats);

export default router;
