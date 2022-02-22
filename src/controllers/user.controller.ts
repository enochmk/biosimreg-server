import { Request, Response } from 'express';

import asyncHandler from '../middlewares/asyncHandler';

export const getStatistics = asyncHandler(async (req: Request, res: Response) =>
	res.sendStatus(204)
);
