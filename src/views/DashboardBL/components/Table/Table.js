import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Base, { Color } from 'react-bullet-status';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActions,
	CardHeader,
	CardContent,
	Button,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
	TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 800
	},
	statusContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	status: {
		marginRight: theme.spacing(1)
	},
	actions: {
		justifyContent: 'flex-end'
	}
}));

const ApprovedDeals = (props) => {
	const { className, title, data, status, ...rest } = props;
	const classes = useStyles();
	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader title={title} action={`Total: ${data.length}`} />
			<Divider />
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Agent ID</TableCell>
									<TableCell>Farmer Name</TableCell>
									<TableCell sortDirection='desc'>
										<Tooltip enterDelay={300} title='Sort'>
											<TableSortLabel active direction='desc'>
												Date
											</TableSortLabel>
										</Tooltip>
									</TableCell>
									<TableCell>Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((offer) => (
									<TableRow hover key={offer._id}>
										<TableCell>{offer.agentId}</TableCell>
										<TableCell>{offer.farmName}</TableCell>
										<TableCell>
											{moment(offer.createdAt).format('DD/MM/YYYY')}
										</TableCell>
										<TableCell>
											<div className={classes.statusContainer}>
												<Base value={1} color={Color.open} label={status} />
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>
			<Divider />
			<CardActions className={classes.actions}>
				<Link to='/products'>
					<Button color='primary' size='small' variant='text'>
						View all <ArrowRightIcon />
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
};

ApprovedDeals.propTypes = {
	className: PropTypes.string
};

export default ApprovedDeals;
