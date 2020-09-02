import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Card,
	CardContent,
	Grid,
	Typography,
	Avatar,
	makeStyles
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import useHeaders from '../../../../server/Headers';
import {
	getFrontLineAgents,
	setLoader,
	getData
} from '../../../../Redux/Reducers/Marketers';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%'
	},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	title: {
		fontWeight: 700
	},
	avatar: {
		backgroundColor: theme.palette.success.main,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	},
	difference: {
		marginTop: theme.spacing(2),
		display: 'flex',
		alignItems: 'center'
	},
	differenceIcon: {
		color: theme.palette.success.dark
	},
	differenceValue: {
		color: theme.palette.success.dark,
		marginRight: theme.spacing(1)
	}
}));

const url = `marketer/downline-agents`;
const TotalAgents = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { headers } = useHeaders();
	const state = useSelector((state) => state.Marketers.frontlineAgents);

	useEffect(() => {
		dispatch(getData(url, getFrontLineAgents, setLoader, headers));
	}, [dispatch, headers]);

	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid container justify='space-between'>
					<Grid item>
						<Typography
							className={classes.title}
							color='textSecondary'
							gutterBottom
							variant='body2'>
							TOTAL AGENTS
						</Typography>
						<Typography variant='h3'>{state.length}</Typography>
					</Grid>
					<Grid item>
						<Avatar className={classes.avatar}>
							<PeopleIcon className={classes.icon} />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TotalAgents;
