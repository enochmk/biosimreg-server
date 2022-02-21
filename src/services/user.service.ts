import { getUserByUsername } from '../models/User';

export const getProfileDetails = async (username: string) => {
	const data = await getUserByUsername(username);
	return data;
};
