import * as Profile from '../models/Profile';

export const getProfileDetails = async (username: string) => {
	const response = await Profile.getUserProfile(username);
	return response;
};

export const getStatistics = async (msisdn: string) => {
	const data = await Profile.getUserStatistics(msisdn);
	return data;
};
