import * as yup from 'yup';

export const loginSchema = yup.object({
	body: yup.object({
		username: yup.string().min(6).max(20).required(),
		password: yup.string().min(6).max(60).required(),
	}),
});

export type LoginInputs = yup.InferType<typeof loginSchema>['body'];
