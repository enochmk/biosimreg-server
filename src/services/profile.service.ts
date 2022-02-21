import * as ProfileModel from '../models/Profile';

export const getProfileDetails = async (username: string) => {
	const data = await ProfileModel.getUserProfile(username);
	return data;
};

export const getStatistics = async (username: string) => {
	const data = await ProfileModel.getUserStatistics(username);
	return data;
};
