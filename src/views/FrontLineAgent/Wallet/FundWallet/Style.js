export default (theme) => ({
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
  succesbtn:{

  },

	btn: {
		color: theme.palette.error.main,
		border: `1px solid ${theme.palette.error.main}`
},
	content: {
		alignItems: 'center',
		display: 'flex'
	},
	title: {
		fontWeight: 700
	},
	avatar: {
		backgroundColor: theme.palette.tetiary.main,
		height: 56,
		width: 56
	},
	icon: {
		height: 32,
		width: 32
	}
});
