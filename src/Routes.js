import React, { Suspense, lazy, useEffect, useContext } from 'react';
import logo from './assets/images/logoFood_1.svg';
import { Switch, Route } from 'react-router-dom';
import { contextApi } from './components/context/Context';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import AccountView from './views/Account/Account';
import SignUpView from './views/SignUp/SignUp';
import SignInView from './views/SignIn/SignIn';
import UserListView from './views/UserList/UserList';
import SettingsView from './views/Settings/Settings';
import NotFoundView from './views/NotFound/NotFound';
import BackLineAgentDashboard from './views/DashboardBL/Dashboard';
import FrontLineAgentDashboard from './views/Dashboard/Dashboard';
import { userData } from './utils/GetUserData';

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
const Checkout = lazy(() => import('./views/FrontLineAgent/Checkout/Checkout'));
const AddDownLines = lazy(() =>
	import('./views/FrontLineAgent/AddDownlines/AddDownLines')
);
// const ChooseDownLine = lazy(() =>
// 	import('./views/FrontLineAgent/Checkout/ChooseDownLine/ChooseDownLine')
// );
const ChooseDownLine = lazy(() =>
	import('./views/FrontLineAgent/Checkout/ChooseDownLine/ChooseDownLines')
);
const RegistrationForm = lazy(() =>
	import('./views/FrontLineAgent/RegistrationForm/RegistrationForm')
);
const Orders = lazy(() =>
	import('./views/FrontLineAgent/Orders/Orders')
);

//***Account Verification*********//
const AccountConfirmation = lazy(() =>
	import('./views/EmailVerification/AccountConfirmation/AccountConfirmation')
);
const CreatePassowrdForAgents = lazy(() =>
	import('./views/CreatePassword/CreatePassword')
);
const ForgotPassword = lazy(() =>
	import('./views/ForgotPassword/ForgotPassword')
);

//*****Marketers  Dashboard******//
const MarkertersDashBoard = lazy(() =>
	import('./views/DashboardMKT/Dashboard')
);

//****Payment Verifictaion Page *****//
const PaymentVerification = lazy(() =>
	import('./views/PaymentVerification/PaymentVerification')
);

//****FallBack Loader  Components ****//
const FallBack = (
	<div className='full-page-loader'>
		<img width='200' src={logo} alt='Food Crowdy Agents' />
	</div>
);

const Routes = () => {
	const { authUpdate } = useContext(contextApi);
	const role = userData('role');

	const getRole = (roles) => {
		switch (String(roles)) {
			case 'frontline':
				return FrontLineAgentDashboard;
			case 'customerCare':
				return FrontLineAgentDashboard;
			case 'backline':
				return BackLineAgentDashboard;
			case 'marketer':
				return MarkertersDashBoard;
			default:
				return NotFoundView;
		}
	};

	useEffect(() => {}, [authUpdate]);

	return (
		<Suspense fallback={FallBack}>
			<Switch>
				<RouteWithLayout
					component={getRole(role)}
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
					path='/agents/frontline/orders'
					component={Orders}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/products-details/:category/:title/:id'
					component={ProductsDetails}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/payment-vefication/'
					component={PaymentVerification}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/product/checkout/:id'
					component={Checkout}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/registration'
					component={RegistrationForm}
					layout={MinimalLayout}
				/>
				<Route
					exact
					path='/create-new-password'
					component={CreatePassowrdForAgents}
					layout={MinimalLayout}
				/>
				<Route
					exact
					path='/forgot-password'
					component={ForgotPassword}
					layout={MinimalLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/wallet'
					component={FrontLineAgentWallet}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/add-downlines'
					component={AddDownLines}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/agents/frontline/choose-downline'
					component={ChooseDownLine}
					layout={MainLayout}
				/>
				<RouteWithLayout
					exact
					path='/frontline'
					component={FrontLineAgentDashboard}
					layout={MainLayout}
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
