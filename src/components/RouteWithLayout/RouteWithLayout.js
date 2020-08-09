import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignIn from '../../views/SignIn/SignIn';
import EmailVerification from '../../views/EmailVerification/EmailVerification';

const RouteWithLayout = (props) => {
	const { layout: Layout, component: Component, ...rest } = props;
	const token = localStorage.getItem('_token');
	// const token = true;
	const verfied = true;

	if (!verfied) {
		return (
			<Layout>
				<Component />
				<EmailVerification />
			</Layout>
		);
	}

	return (
		<Route
			{...rest}
			render={(matchProps) =>
				token ? (
					<Layout>
						<Component {...matchProps} />
					</Layout>
				) : (
					// <Redirect to='/sign-in' />
					<SignIn />
				)
			}
		/>
	);
};

RouteWithLayout.propTypes = {
	component: PropTypes.any.isRequired,
	layout: PropTypes.any.isRequired,
	path: PropTypes.string
};

export default RouteWithLayout;
