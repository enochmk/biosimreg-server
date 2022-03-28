import moment from 'moment';

import prisma from '../database/PrismaClient';

const User = prisma.user;

export const getUserProfile = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: {
			USERNAME: username,
		},
		select: {
			ID: true,
			FIRST_NAME: true,
			LAST_NAME: true,
			MSISDN: true,
			USERNAME: true,
			ACTIVE: true,
			ROLE_ID: true,
			ROLE: {
				select: {
					KEYWORD: true,
				},
			},
			CREATED_AT: true,
			UPDATE_AT: true,
		},
	});

	return user;
};

export const getUserStatistics = async (agentID: string) => {
	const currentDate = moment().format('YYYY-MM-DD');
	const nextDate = moment().add(1, 'days').format('YYYY-MM-DD');
	const currentDateIso = moment.utc(currentDate).toISOString();
	const nextDateIso = moment.utc(nextDate).toISOString();

	const totalLinkingCount = await prisma.masterLinking.count({
		where: {
			AGENT_ID: agentID,
		},
	});

	const dailyLinkingCount = await prisma.masterLinking.count({
		where: {
			AND: [
				{
					AGENT_ID: agentID,
					TIMESTAMP: {
						gte: currentDateIso,
						lt: nextDateIso,
					},
				},
			],
		},
	});

	const totalBcapCount = await prisma.masterBCAP.count({
		where: {
			AGENT_ID: agentID,
		},
	});

	const dailyBcapCount = await prisma.masterBCAP.count({
		where: {
			AND: {
				AGENT_ID: agentID,
				TIMESTAMP: {
					gte: currentDateIso,
					lt: nextDateIso,
				},
			},
		},
	});

	const result = {
		totalLinkingCount: totalLinkingCount,
		totalBcapCount: totalBcapCount,
		dailyLinkingCount: dailyLinkingCount,
		dailyBcapCount: dailyBcapCount,
	};

	return result;
};

export default User;
