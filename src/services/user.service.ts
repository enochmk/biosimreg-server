import { getUserStatistics } from './../models/User';

/**
 * @description User Service
 */
export const getStatistics = async (username: string) => {
	const stats = await getUserStatistics(username);

	return { stats };
};
