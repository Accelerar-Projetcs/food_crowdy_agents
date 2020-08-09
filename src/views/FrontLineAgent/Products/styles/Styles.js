export const allProductsStyles = (theme) => ({
	root: {
		display: 'flex'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto',
		'& >*': {
			margin: theme.spacing(0.3, 0)
		}
	},
	cover: {
		width: 151
	},
	price: {
		display: 'block',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		fontWeight: 600
	},
	marketPrice: {
		textDecoration: `line-through`
	},
	playIcon: {
		height: 38,
		width: 38
	},
	card: {
		padding: theme.spacing(1)
	},
	header: {
		display: 'flex',
		justifyContent: `space-between`
	},
	textField: {
		margin: theme.spacing(0, 1)
	}
});

export const categoryStyles = (theme) => ({
	root: {
		padding: theme.spacing(4)
	}
});

export const productsStyles = (theme) => ({
	root: {
		padding: theme.spacing(0)
	}
});
