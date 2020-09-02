import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { AppBar, Tabs, Tab } from '@material-ui/core/';
import Customers from './Customers/Customer';
import FrontLine from './FrontLine/FrontLine';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
}));

export default function SimpleTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='simple tabs example'>
					<Tab label='Customers ' {...a11yProps(0)} />
					<Tab label='FrontLine Agents' {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Customers />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<FrontLine />
			</TabPanel>
		</div>
	);
}
