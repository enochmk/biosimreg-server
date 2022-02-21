export interface IUser {
	id?: number;
	firstName?: string;
	lastName?: string;
	username?: string;
	[key: string]: any;
}

export interface IPayload {
	user: {
		username: string;
		[key: string]: any;
	};
}
