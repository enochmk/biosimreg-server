import { Router } from 'express';

// import validator from '../middlewares/validator';
import { getStatistics } from '../controllers/user.controller';

const router = Router();

router.route('/stats').get(getStatistics);
router.route('/me').get((req, res) => {
	res.send(res.locals.user);
});

export default router;
