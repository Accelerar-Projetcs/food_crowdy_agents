export const dialogStyles =(theme)=>({
	// root: {
	// 	margin: 0,
	// 	padding: theme.spacing(2)
	// },
	// close: {
	// 	display: `flex`,
	// 	justifyContent: 'space-between'
	// },
	// btnOrange: {
	// 	background: theme.palette.tetiary.main,
	// 	color: theme.palette.white,
	// 	'&:hover': {
	// 		background: theme.palette.tetiary.light
	// 	}
	// },
	// closeButton: {
	// 	position: 'absolute',
	// 	right: theme.spacing(1),
	// 	top: theme.spacing(1),
	// 	color: theme.palette.grey[500]
	// }
})

export const productDetailStyle =(theme)=>({
  root: {
		// margin: theme.spacing(0.5)
	}
})

export const productsDataStyles =(theme)=>({
  root: {
		margin: `.4rem 0`
	},
	content: {
		background: theme.palette.background.paper,
		margin: theme.spacing(2, 0),
		// padding: theme.spacing(1)
		// width: '95%'
	},
	description: {
		'& >*': {
			margin: theme.spacing(1)
		}
	},
	btnOrange: {
		background: theme.palette.tetiary.main,
		color: theme.palette.white
	},
	details: {
		'& > *': {
			margin: theme.spacing(2, 0)
		}
	},
	price: {
		fontWeight: 600,
		fontSize: '1.2rem '
	},
	priceTitle: {
		color: theme.palette.tetiary.main
	},
	buyBtn: {
		margin: theme.spacing(1, 0)
	},
	chip: {
		background: theme.palette.tetiary.main,
		color: theme.palette.white
	},
	slots: {
		fontSize: '1.2rem',
		margin: theme.spacing(2, 0)
	},
	slotNum: {
		color: theme.palette.primary.main,
		fontWeight: 600
	},
	image: {
		width: '100%'
	},
	icon: {
		margin: `-.4rem 0`
	}
})