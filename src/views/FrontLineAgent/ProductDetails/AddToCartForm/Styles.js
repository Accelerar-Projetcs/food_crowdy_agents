export const CartStyles =(theme)=>({
	root: {
		height: '100%'
	},
	close: {
		display: `flex`,
		justifyContent: 'space-between'
	},
	textField: {
		marginTop: theme.spacing(2)
	},

	btn: {
		color: theme.palette.error.main,
		border: `1px solid ${theme.palette.error.main}`
	}
})