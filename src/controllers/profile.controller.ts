/* eslint-disable  */
import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../middlewares/asyncHandler';
import * as ProfileService from '../services/profile.services';

export const getDetails = asyncHandler(async (req: Request, res: Response) => {
	const data = res.locals.user;
	return res.json({ user: data });
});

export const getStats = asyncHandler(async (req: Request, res: Response) => {
	const data = await ProfileService.getStatistics(res.locals.user.msisdn);
	return res.json(data);
});
