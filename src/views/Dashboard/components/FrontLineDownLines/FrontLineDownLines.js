import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Button,
	Divider
} from '@material-ui/core';
import PersonAdd from '@material-ui/icons/PersonAdd';
import LoadingCenter from '../../../../components/LoadingCenter/LoadingCenter';
import TableContent from './Table/TableContent';
import HumansImg from '../../../../assets/images/Humans.svg';
import EmptyList from '../../../../components/EmptyList/EmptyList';

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		padding: 0
	}
}));

const FrontLineDownLines = ({ data = [], loading }) => {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardHeader
				action={
					<Button
						href='/agents/frontline/add-downlines'
						color='primary'
						size='small'
						variant='outlined'>
						<PersonAdd /> Add New
					</Button>
				}
				title={`(${data.length} ) Users Network`}
			/>
			<Divider />
			<CardContent className={classes.content}>
				{loading ? (
					<LoadingCenter />
				) : (
					<div>
						{data.length ? (
							<TableContent users={data} />
						) : (
							<EmptyList imageFile={HumansImg} />
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default FrontLineDownLines;
