import { Router } from 'express';

import { handleRefreshToken } from '../controllers/refreshToken.controller';

const router = Router();

router.route('/').get(handleRefreshToken);

export default router;
