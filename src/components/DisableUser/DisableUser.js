import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';

export default function DisableUser({ children }) {
	const [open] = useState(true);

	return (
		<div>
			<Dialog open={open} aria-labelledby='form-dialog-title'>
				{children}
			</Dialog>
		</div>
	);
}

DisableUser.prototype = {
	children: PropTypes.node.isRequired
};
