import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
	const user = await AuthService.login(req.body.username, req.body.password);

	return res.send({
		user,
	});
};
