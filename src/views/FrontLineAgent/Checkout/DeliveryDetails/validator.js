import * as yup from 'yup';

export let deliveryAddress = yup.object().shape({
	state: yup.string().required(),
	phoneNumber: yup
	.string()
	.required()
	.matches(/[0-9]/)
	.min(11)
	.max(11)
	.label('phone number'),
});
