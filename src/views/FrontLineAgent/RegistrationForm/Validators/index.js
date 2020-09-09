import * as yup from 'yup';

const BusinessInfoSchema = yup.object().shape({
	name: yup.string().required().label('business name'),
	address: yup.string().required().label('business address'),
	type: yup.string().required().label('business type'),
	state: yup.string().required().label('business state'),
	lga: yup.string().required().label('business LGA'),
	city: yup.string().required().label('business city'),
	storeNumber: yup.string().required().label('store number'),
	phoneNumber: yup
		.string()
		.required()
		.matches(/[0-9]/)
		.min(11)
		.max(11)
		.label('business phone number')
});

const GuarantorInfoSchema = yup.object().shape({
	firstName: yup.string().required().label('quarantor first name '),
	surName: yup.string().required().label('quarantor surname'),
	email: yup.string().email().required().label('quarantor email'),
	occupation: yup.string().required().label('quarantor occupation'),
	phoneNumber: yup
		.string()
		.required()
		.matches(/[0-9]/)
		.min(11)
		.max(11)
		.label('quarantor phone number'),
	otherNames: yup.string().required().label('quarantor other names'),
	relationship: yup.string().required().label('quarantor relationship'),
	nationality: yup.string().required().label('quarantor nationality'),
	lga: yup.string().required().label('quarantor (L.G.A)'),
	stateOfOrigin: yup.string().required('quarantor state of origin'),
	address: yup.string().required().min(10).label('quarantor address'),
	gender: yup.string().required().label('quarantor gender')
});

const PersonalInfoSchema = yup.object().shape({
	firstName: yup.string().required().label('first name'),
	lastName: yup.string().required().label('last name'),
	nameOfnextOfKin: yup.string().required().label('next of kin name'),
	email: yup.string().email().required(),
	phoneNumber: yup
		.string()
		.required()
		.matches(/[0-9]/)
		.min(11)
		.max(11)
		.label('phone number'),
	indentificationNumber: yup
		.string()
		.required()
		.min(5)
		.label('indentification number'),
	phoneNumberNextOfKin: yup
		.string()
		.required()
		.matches(/[0-9]/)
		.min(11)
		.max(11)
		.label('next of kin phone number'),
	otherNames: yup.string().required().label('other names'),
	relationship: yup.string().required().label('relationship status'),
	indentificationType: yup.string().required().label('indentification type'),
	bvn: yup
		.string()
		.required()
		.min(5)
		.label('BVN (biometric verification number)'),
	nationality: yup.string().required(),
	address: yup.string().required().min(10),
	gender: yup.string().required(),
	state: yup.string().required().label('current state'),
	stateOfOrigin: yup.string().required().label('state of origin'),
	city: yup.string().required(),
	lga: yup.string().required()
});

export { BusinessInfoSchema, GuarantorInfoSchema, PersonalInfoSchema };
