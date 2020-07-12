import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import Dashboard from './views/Dashboard/Dashboard';

import AccountView from './views/Account/Account';
import SignUpView from './views/SignUp/SignUp';
import SignInView from './views/SignIn/SignIn';
import UserListView from './views/UserList/UserList';
import SettingsView from './views/Settings/Settings';
import TypographyView from './views/Typography/Typography';
import NotFoundView from './views/NotFound/NotFound';

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

const Routes = () => {
	return (
		<Switch>
			<Suspense fallback={<h1>Loading....</h1>}>
				<RouteWithLayout
					component={Dashboard}
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
				<RouteWithLayout
					component={SignUpView}
					exact
					layout={MinimalLayout}
					path='/sign-up'
				/>
				<RouteWithLayout
					component={SignInView}
					exact
					layout={MinimalLayout}
					path='/sign-in'
				/>
				<RouteWithLayout
					component={NotFoundView}
					exact
					layout={MinimalLayout}
					path='/not-found'
				/>
			</Suspense>
		</Switch>
	);
};

export default Routes;
