import moment from 'moment';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const User = prisma.user;

export const getUserProfile = async (username: string) => {
	const data = await prisma.user.findUnique({
		where: {
			username,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			msisdn: true,
			username: true,
			active: true,
			roleId: true,
			role: {
				select: {
					name: true,
				},
			},
			createdAt: true,
			updatedAt: true,
		},
	});

	return data;
};

export const getUserStatistics = async (agentID: string) => {
	const currentDate = moment().format('YYYY-MM-DD');

	const totalLinking: any =
		await prisma.$queryRaw`SELECT count(1) as count FROM [BIOSIMREG_RPT].[dbo].[SIMREG_CORE_TBL_VERIFIED_REQUESTS] WHERE agent_ID = ${agentID};`;

	const totalBcap: any =
		await prisma.$queryRaw`SELECT count(1) as count FROM [BIOSIMREG_RPT].[dbo].[SIMREG_CORE_TBL_VERIFIED_REQUESTS] WHERE RIGHT(BCAP_AGENTID, 9) = ${agentID};`;

	const dailyLinking: any =
		await prisma.$queryRaw`SELECT count(1) as count FROM [BIOSIMREG_RPT].[dbo].[SIMREG_CORE_TBL_VERIFIED_REQUESTS] WHERE agent_ID = ${agentID} AND [TIMESTAMP] LIKE '${currentDate}%';`;

	const dailyBcap: any =
		await prisma.$queryRaw`SELECT count(1) as count FROM [BIOSIMREG_RPT].[dbo].[SIMREG_CORE_TBL_VERIFIED_REQUESTS] WHERE RIGHT(BCAP_AGENTID, 9) = ${agentID} AND [TIMESTAMP] LIKE '${currentDate}%';`;

	return {
		linking: {
			total_linking_count: totalLinking[0].count,
			total_bcap_count: totalBcap[0].count,
			daily_linking_count: dailyLinking[0].count,
			daily_bcap_count: dailyBcap[0].count,
		},
	};
};

export default User;
