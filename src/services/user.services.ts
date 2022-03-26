import * as Auth from '../models/Auth';

export const getProfileDetails = async (username: string) => {
	const data = await Auth.getUserByUsername(username);
	return data;
};
