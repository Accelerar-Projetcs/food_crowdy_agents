import * as yup from 'yup';

export const addAcount = yup.object().shape({
	accountName: yup.string().required().label('account name'),
	bankName: yup.string().required().label('bank name'),
	accountNumber: yup
		.string()
		.min(10)
		.max(10)
		.matches(/[0-9]/)
		.required()
		.label('account number')
});
