import React from 'react';
import { useCookies } from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import EmailVerification from '../../views/EmailVerification/EmailVerification';

const RouteWithLayout = (props) => {
	const { layout: Layout, component: Component, ...rest } = props;
	const [cookies] = useCookies(['x-auth-token']);
	let verfied;

	if (verfied) {
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
				cookies['x-auth-token'] ? (
					<Layout>
						<Component {...matchProps} />
					</Layout>
				) : (
					<Redirect to='/sign-in' />
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
