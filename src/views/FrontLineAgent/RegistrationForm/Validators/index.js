import * as yup from 'yup';

const BusinessInfoSchema = yup.object().shape({
	businessName: yup.string().required(),
	businessAddress: yup.string().required(),
	businessType: yup.string().required(),
	businessState: yup.string().required(),
	businessLGA: yup.string().required(),
	businessCity: yup.string().required(),
	storeNumber: yup.string().required(),
	businessPhoneNumber: yup.string().required().matches(/[0-9]/).min(11).max(11),
});

const GuarantorInfoSchema = yup.object().shape({
	guarantorFirstName: yup.string().lowercase().required(),
	guarantorSurName: yup.string().required(),
	quarantorEmail: yup.string().email().required(),
	guarantorOccupation: yup.string().required(),
	guarantorPhoneNumber: yup
		.string()
		.required()
		.matches(/[0-9]/)
		.min(11)
		.max(11),
	guarantorOtherNames: yup.string().required(),
	guarantorRelationship: yup.string().required(),
	guarantorNationality: yup.string().required(),
	guarantorCity: yup.string().required(),
	guarantorStateOfOrigin: yup.string().required(),
	gaurantorsAddress: yup.string().required().min(10),
	quarantorGender: yup.string().required()
});

const PersonalInfoSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	nameOfnextOfKin: yup.string().required(),
	email: yup.string().email().required(),
	phoneNumber: yup.string().required().matches(/[0-9]/).min(11).max(11),
	indentificationNumber: yup.string().required().min(5),
	phoneNumberNextOfKin: yup
		.string()
		.required()
		.matches(/[0-9]/)
		.min(11)
		.max(11),
	otherNames: yup.string().required(),
	relationship: yup.string().required(),
	indentificationType: yup.string().required(),
	bvn: yup.number().required().min(5),
	nationality: yup.string().required(),
	address: yup.string().required().min(10),
	gender: yup.string().required(),
	currentState: yup.string().required(),
	stateOfOrgin: yup.string().required(),
	city: yup.string().required(),
	lga: yup.string().required()
});

export { BusinessInfoSchema, GuarantorInfoSchema, PersonalInfoSchema };
