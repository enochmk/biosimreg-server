/* eslint-disable  */
import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../middlewares/asyncHandler';

export const getDetails = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
	const data = res.locals.user;
	return res.json({ user: data });
});

export const getStats = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
	return res.sendStatus(204);
});
