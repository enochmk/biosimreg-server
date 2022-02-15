import { Request, Response } from 'express';

import * as AuthService from '../services/auth.service';
import asyncHandler from '../middlewares/asyncHandler';

export const login = asyncHandler(async (req: Request, res: Response) => {
	const data = await AuthService.login(req.body.username, req.body.password);

	return res.send(data);
});
