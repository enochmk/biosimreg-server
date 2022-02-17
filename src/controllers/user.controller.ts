import { Request, Response } from 'express';

import * as UserService from '../services/user.service';
import asyncHandler from '../middlewares/asyncHandler';

export const getStatistics = asyncHandler(async (req: Request, res: Response) => {
	const data = await UserService.getStatistics(res.locals.user.msisdn);

	return res.json(data);
});
