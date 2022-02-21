import * as UserModel from '../models/User';

export const getProfileDetails = async (username: string) => {
	const data = await UserModel.getUserByUsername(username);
	return data;
};
