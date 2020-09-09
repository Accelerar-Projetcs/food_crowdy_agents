import * as yup from 'yup';

export let SignUpSchema = yup.object().shape({
	name: yup.string().required(),
	userName: yup.string().min(4).max(7).required().label('user name'),
	email: yup.string().email().required(),
	location: yup.string().required(),
	referralId: yup.string().optional(),
	phoneNumber: yup
		.string()
		.required()
		.matches(/[0-9]/)
		.min(11)
		.max(11)
		.label('phone number'),
});
