import React, { forwardRef, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Person } from '@material-ui/icons';
import { List, ListItem, Button, colors, makeStyles } from '@material-ui/core';
import { clearUserData } from '../../../../../../utils/GetUserData';
import { contextApi } from '../../../../../../components/context/Context';

const useStyles = makeStyles((theme) => ({
	root: {},
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0
	},
	button: {
		color: colors.blueGrey[800],
		padding: '10px 8px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
		fontWeight: theme.typography.fontWeightMedium
	},
	icon: {
		color: theme.palette.icon,
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		marginRight: theme.spacing(1)
	},
	active: {
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		'& $icon': {
			color: theme.palette.primary.main
		}
	},

	link: {
		margin: '0 .4rem 0 0 ',
		cursor: 'pointer'
	},
	logout: {
		cursor: 'pointer'
	}
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div ref={ref} style={{ flexGrow: 1 }}>
		<RouterLink {...props} />
	</div>
));

const SidebarNav = (props) => {
	const { pages, className, ...rest } = props;
	const [, , removeCookie] = useCookies(['x-auth-token']);
	const { setauthUpdate, authUpdate } = useContext(contextApi);
	const history = useHistory();
	const classes = useStyles();

	const logout = () => {
		clearUserData();
		removeCookie(['x-auth-token']);
		setauthUpdate(!authUpdate);
		history.push('/sign-in');
	};

	return (
		<List {...rest} className={clsx(classes.root, className)}>
			{pages.map((page) => (
				<ListItem className={classes.item} disableGutters key={page.title}>
					<Button
						activeClassName={classes.active}
						className={classes.button}
						component={CustomRouterLink}
						to={page.href}>
						<div className={classes.icon}>{page.icon}</div>
						{page.title}
					</Button>
				</ListItem>
			))}
			<ListItem onClick={logout} className={classes.logout}>
				<Person className={classes.link} /> logout
			</ListItem>
		</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
};

export default SidebarNav;
