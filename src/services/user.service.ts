import { getUserStatistics } from '../models/User';

export const getStatistics = async (username: string) => {
	const stats = await getUserStatistics(username);

	return { stats };
};
