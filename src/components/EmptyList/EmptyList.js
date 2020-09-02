import React from 'react';
import emptyLogo from '../../assets/images/directory.svg';
import { Style } from './Style';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => Style(theme));

const EmptyList = () => {
  const classes = useStyles()
	return (
		<div className={classes.root}>
			<img height='100' src={emptyLogo} alt='Empty List' />
		</div>
	);
};

export default EmptyList;
