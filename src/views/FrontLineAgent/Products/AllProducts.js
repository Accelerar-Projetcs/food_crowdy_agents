import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: 345
		margin: theme.spacing(2)
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

export default function RecipeReviewCard() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const data = [
		{
			id: '212',
			title: '3 Basin of Rice',
			price: '30, 000.00',
			marketPrice: '20, 000'
		},
		{
			id: '220120912',
			title: '3 Basin of Rice',
			price: '30, 000.00',
			marketPrice: '20, 000'
		},
		{
			id: '2wioqw12',
			title: '3 Basin of Rice',
			price: '30, 000.00',
			marketPrice: '20, 000'
		},
		{
			id: '2122912',
			title: '3 Basin of Rice',
			price: '30, 000.00',
			marketPrice: '20, 000'
		}
	];

	return (
		<React.Fragment>
			<Grid container spacing={4}>
				{data.map((item) => (
					<Grid spacing={3} itemitem lg={6} md={12} xl={9} xs={12}>
						<Card className={classes.root}>
							<CardHeader
								avatar={
									<Avatar aria-label='recipe' className={classes.avatar}>
										R
									</Avatar>
								}
								action={
									<IconButton aria-label='settings'>
										<MoreVertIcon />
									</IconButton>
								}
								title={item.title}
								subheader={item.price}
							/>
							<CardMedia
								className={classes.media}
								image='/static/images/cards/paella.jpg'
								title='Paella dish'
							/>
							<CardContent>
								<Typography variant='body2' color='textSecondary' component='p'>
									This impressive paella is a perfect party dish and a fun meal
									to cook together with your guests. Add 1 cup of frozen peas
									along with the mussels, if you like.
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<IconButton aria-label='add to favorites'>
									<FavoriteIcon />
								</IconButton>
								<IconButton aria-label='share'>
									<ShareIcon />
								</IconButton>
								<IconButton
									className={clsx(classes.expand, {
										[classes.expandOpen]: expanded
									})}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label='show more'>
									<ExpandMoreIcon />
								</IconButton>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</React.Fragment>
	);
}
