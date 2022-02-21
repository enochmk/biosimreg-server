import * as Profile from '../models/Profile';

export const getProfileDetails = async (username: string) => {
	const data = await Profile.getUserProfile(username);
	return data;
};

export const getStatistics = async (username: string) => {
	const data = await Profile.getUserStatistics(username);
	return data;
};
