import React, { Suspense, lazy, useEffect, useContext } from 'react';
import logo from './assets/images/logoFood_1.svg';
import { Switch, Route } from 'react-router-dom';
import { contextApi } from './components/context/Context';

import { getRole as getAgentRoles } from './utils/localStore';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import AccountView from './views/Account/Account';
import SignUpView from './views/SignUp/SignUp';
import SignInView from './views/SignIn/SignIn';
import UserListView from './views/UserList/UserList';
import SettingsView from './views/Settings/Settings';
import TypographyView from './views/Typography/Typography';
import NotFoundView from './views/NotFound/NotFound';
import BackLineAgentDashboard from './views/DashboardBL/Dashboard';
import FrontLineAgentDashboard from './views/Dashboard/Dashboard';

//**** BackLine Agents ******//

const DeleteRequest = lazy(() => import('./views/BackLineAgent/DeleteRequest'));
const UpdateRequest = lazy(() => import('./views/BackLineAgent/UpdateRequest'));
const ProductsList = lazy(() =>
	import('./views/BackLineAgent/Products/Products')
);
const AgentProductUpload = lazy(() =>
	import('./views/BackLineAgent/productUpload/ProductUpload')
);

//**** FrontLine Agents ******//
const ProductsForFrontLine = lazy(() =>
	import('./views/FrontLineAgent/Products/Products')
);
const ProductsDetails = lazy(() =>
	import('./views/FrontLineAgent/ProductDetails/ProductDetails')
);
const FrontLineAgentWallet = lazy(() =>
	import('./views/FrontLineAgent/Wallet/Wallet')
);

//***Account Verification*********//
const AccountConfirmation = lazy(() =>
	import('./views/EmailVerification/AccountConfirmation/AccountConfirmation')
);

//****FallBack Loader  Components ****//
const FallBack = (
	<div className='full-page-loader'>
		<img width='200' src={logo} alt='Food Crowdy Agents' />
	</div>
);

// const user = {
// 	id: '209023kcjkjvkdf',
// 	name: 'agent test',
// 	uniqueId: 'FGRT0098',
// 	// role: 'frontline',
// 	role: 'backline',
// 	email: 'inifr@gmail.com'
// };

// localStorage.setItem('_user', JSON.stringify(user));

const Routes = () => {
	const { authUpdate } = useContext(contextApi);
	//***Function to Display specific Home Dashboard by Roles *****//
	const agentRole = getAgentRoles();
	const getRole = (roles) => {
		switch (String(roles)) {
			case 'frontline':
				return FrontLineAgentDashboard;
			case 'backline':
				return BackLineAgentDashboard;
			default:
				return NotFoundView;
		}
	};

	useEffect(() => {}, [authUpdate]);

	return (
		<Suspense fallback={FallBack}>
			<Switch>
				<RouteWithLayout
					// component={BackLineAgentDashboard}
					component={getRole(agentRole)}
					// component={
					// 	getRole === 'backline'
					// 		? BackLineAgentDashboard
					// 		: FrontLineAgentDashboard
					// }
					exact
					layout={MainLayout}
					path='/'
				/>
				<RouteWithLayout
					component={UserListView}
					exact
					layout={MainLayout}
					path='/users'
				/>
				<RouteWithLayout
					component={AccountConfirmation}
					exact
					layout={MainLayout}
					path='/agent/user/verify-account'
				/>
				<RouteWithLayout
					component={ProductsList}
					exact
					layout={MainLayout}
					path='/products'
				/>
				<RouteWithLayout
					component={AgentProductUpload}
					exact
					layout={MainLayout}
					path='/agent-product-upload'
				/>
				<RouteWithLayout
					exact
					path='/agents-request-product-delete/:id'
					component={DeleteRequest}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents-request-product-updates/:id'
					component={UpdateRequest}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/products'
					component={ProductsForFrontLine}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					// path='/agents/frontline/produ/cts-details'
					path='/agents/frontline/products-details/:category/:title/:id'
					component={ProductsDetails}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/wallet'
					component={FrontLineAgentWallet}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/frontline'
					component={FrontLineAgentDashboard}
					layout={MainLayout}
				/>
				<RouteWithLayout
					component={TypographyView}
					exact
					layout={MainLayout}
					path='/typography'
				/>
				<RouteWithLayout
					component={AccountView}
					exact
					layout={MainLayout}
					path='/account'
				/>
				<RouteWithLayout
					component={SettingsView}
					exact
					layout={MainLayout}
					path='/settings'
				/>
				<Route
					component={SignUpView}
					exact
					layout={MinimalLayout}
					path='/sign-up'
				/>
				<Route
					component={SignInView}
					exact
					layout={MinimalLayout}
					path='/sign-in'
				/>
				<RouteWithLayout
					component={NotFoundView}
					exact
					layout={MinimalLayout}
				/>
			</Switch>
		</Suspense>
	);
};

export default Routes;
