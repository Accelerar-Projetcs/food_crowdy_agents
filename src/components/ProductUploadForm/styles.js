export default (theme) => {
	return {
		root: {
			width: '100%',
			display: 'grid',
			placeItems: 'center',
			margin: theme.spacing(1)
		},
		head: {
			background: theme.palette.white
		},
		table: {
			minWidth: 750,
			margin: theme.spacing(0, 1)
		},
		cardHead: {
			display: 'none'
			// justifyContent: 'space-between',
			// margin: theme.spacing(1)
		},
		Tooltip: {
			height: '2.2rem',
			width: '2.5rem',
			margin: theme.spacing(1)
		},
		contentCard: {
			margin: theme.spacing(5, 0)
		},
		block:{
			// margin:theme.spacing(2,0)
			margin:'2rem'
		}
	};
};

export const Styles = (theme) => ({
	scroll: {
		overflow: 'scroll'
	},
	cardDetails: {
		position: 'relative',
		width: '100%'
	},
	list: {
		position: 'absolute',
		background: '#fff',
		width: 'auto',
		margin: '3rem '
	},
	Tooltip: {
		height: '2.2rem',
		width: '2.5rem',
		margin: '.4rem  0 0 0'
	},
	close: {
		float: 'right'
	},
	textField: {
		margin: theme.spacing(2, 0)
	}
});
