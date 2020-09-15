import React, {  useContext, Fragment } from 'react';
import clsx from 'clsx';
import {
	Button,
	IconButton,
	makeStyles,
	SwipeableDrawer
} from '@material-ui/core/';
import Cart from '../Cart';

import Styles from './Style';
import { contextApi } from '../../context/Context';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles((theme) => Styles(theme));

export default function SwipeableTemporaryDrawer({ icon, open }) {
	const classes = useStyles();
	const { cartState, setCartState } = useContext(contextApi);

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setCartState({ ...cartState, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			style={{ background: '#fff' }}
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role='presentation'
			onKeyDown={toggleDrawer(anchor, true)}>
			<Cart toggleDrawer={toggleDrawer(anchor, false)} />
		</div>
	);

	return (
		<div>
			<IconButton onClick={toggleDrawer('right', false)}>
				<ArrowBack />
			</IconButton>
			{['right'].map((anchor) => (
				<Fragment key={anchor}>
					<Button onClick={toggleDrawer('right', true)}>{icon}</Button>
					<SwipeableDrawer
						anchor={anchor}
						color='inherit'
						open={cartState[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}>
						{list(anchor)}
					</SwipeableDrawer>
				</Fragment>
			))}
		</div>
	);
}
