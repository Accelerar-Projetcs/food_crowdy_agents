import React from 'react';
import DisableUser from '../../components/DisableUser/DisableUser';
import VerifyEmail from './VerifiEmail/VerifyEmail';

const EmailVerification = () => {
	return (
		<div>
			<DisableUser children={<VerifyEmail />} />
		</div>
	);
};

export default EmailVerification;
