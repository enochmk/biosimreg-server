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

export const getUserStatistics = async (agentID: string) => ({
	linking: {
		total_linking_count: 80,
		total_bcap_count: 58,
		daily_linking_count: 21,
		daily_bcap_count: 400,
		agentID: agentID,
	},
});

export default User;
