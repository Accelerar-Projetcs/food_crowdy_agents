export default (theme) => ({
	root: {
		margin: theme.spacing(2, 3)
	},
	radioform: {
		background: theme.palette.grey[100],
		border: `2px solid ${theme.palette.primary.main}`,
		margin: theme.spacing(2, 0),
		padding: theme.spacing(1, 2),
		display: 'block'
	},
	CardHeader: {
		// backgroundColor: theme.palette.tetiary.main,
		color: theme.palette.white
	},
	text: {
		color: theme.palette.white
	},
	Card: {
		boxShadow: 'none'
	},
	radioformflex: {
		display: 'flex'
	},
	button: {
		textAlign: 'right'
	}
});
