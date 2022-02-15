import { PrismaClient } from '@prisma/client';

export const login = async (username: string, password: string) => {
	const prisma = new PrismaClient();

	const user = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});

	if (!user) return null;

	return user;
};
