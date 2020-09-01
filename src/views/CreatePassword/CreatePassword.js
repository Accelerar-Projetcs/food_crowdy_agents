import React from 'react';
import DisableUser from '../../components/DisableUser/DisableUser';
import Form from './Form/Form';

const CreatePassword = ({ location }) => {
	return (
		<DisableUser>
			<Form location={location} />
		</DisableUser>
	);
};

export default CreatePassword;
