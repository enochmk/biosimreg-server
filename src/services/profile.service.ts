import * as ProfileModel from '../models/Profile';

export const getProfileDetails = async (username: string) => {
	const data = await ProfileModel.getUserProfile(username);
	return data;
};

export const getStatistics = async (msisdn: string) => {
	const data = await ProfileModel.getUserStatistics(msisdn);
	return data;
};
