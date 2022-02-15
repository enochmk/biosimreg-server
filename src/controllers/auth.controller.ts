import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const login = async (req: Request, res: Response) => {
	const authenticate = AuthService.login('username', 'password');

	return res.send({
		message: 'Auth Login',
		authenticate: authenticate,
	});
};
