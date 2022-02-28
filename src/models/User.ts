import prisma from '../database/PrismaClient';

const User = prisma.user;

export const getUserByUsername = async (username: string) => {
	const data = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	return data;
};

export const getUserByRefreshToken = async (refreshToken: string) => {
	const data = await prisma.user.findFirst({
		where: {
			refreshToken: refreshToken,
		},
		select: {
			username: true,
		},
	});

	return data;
};

export const saveUserRefreshToken = async (username: string, refreshToken: string) => {
	const updateUser = await prisma.user.update({
		data: {
			refreshToken: refreshToken,
		},
		where: {
			username: username,
		},
	});

	return updateUser;
};

export const clearUserRefreshToken = async (username: string) => {
	const data = await prisma.user.update({
		where: {
			username: username,
		},
		data: {
			refreshToken: '',
		},
	});

	return data;
};

export default User;
