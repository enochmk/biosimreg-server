import prisma from '../database/PrismaClient';

const User = prisma.user;

export const getUserByUsername = async (username: string) => {
	const data = await prisma.user.findUnique({
		where: {
			USERNAME: username,
		},
	});

	return data;
};

export const getUserByRefreshToken = async (refreshToken: string) => {
	const data = await prisma.user.findFirst({
		where: {
			REFRESH_TOKEN: refreshToken,
		},
		select: {
			USERNAME: true,
		},
	});

	return data;
};

export const saveUserRefreshToken = async (username: string, refreshToken: string) => {
	const updateUser = await prisma.user.update({
		data: {
			REFRESH_TOKEN: refreshToken,
		},
		where: {
			USERNAME: username,
		},
	});

	return updateUser;
};

export const clearUserRefreshToken = async (username: string) => {
	const data = await prisma.user.update({
		where: {
			USERNAME: username,
		},
		data: {
			REFRESH_TOKEN: '',
		},
	});

	return data;
};

export default User;
