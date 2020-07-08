import React, { Suspense, lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

// import Layout from './layouts/Main/Main';

// import {
// 	Dashboard as DashboardView,
// 	// ProductList as ProductListView,
// 	UserList as UserListView,
// 	Typography as TypographyView,
// 	Icons as IconsView,
// 	// Account as AccountView,
// 	Settings as SettingsView
// 	// SignUp as SignUpView,
// 	// SignIn as SignInView,
// 	// NotFound as NotFoundView
// } from './views';

import Dashboard from './views/Dashboard/Dashboard';
import ProductList from './views/ProductList/ProductList';
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

// console.log(<Layout/>);

const Routes = () => {
	return (
		<Switch>
			<Suspense fallback={<h1>Loading....</h1>}>
				{/* <MainLayout/> */}
				{/* <ProductList /> */}
				{/* <DeleteRequest/> */}
				{/* <Redirect exact from='/' to='/dashboard' /> */}
				{/* <Route exact path='/' component={Layout} /> */}
				{/* <Route exact path='/dashboard' component={Dashboard} /> */}
				<RouteWithLayout
					component={Dashboard}
					exact
					layout={MainLayout}
					path='/dashboard'
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
					component={TypographyView}
					exact
					layout={MainLayout}
					path='/typography'
				/>
				{/* <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      /> */}
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
				{/* <RouteWithLayout exact to='/not-found' /> */}
			</Suspense>
		</Switch>
	);
};

export default Routes;
