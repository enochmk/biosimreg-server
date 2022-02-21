/* eslint-disable  */
import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../middlewares/asyncHandler';
import * as ProfileService from '../services/profile.service';

export const getDetails = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
	const data = res.locals.user;
	return res.json({ user: data });
});

export const getStats = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
	const data = await ProfileService.getStatistics(res.locals.user.username);
	return res.json(data);
});
