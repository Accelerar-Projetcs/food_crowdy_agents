import React from "react";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemText, ListItemAvatar, Typography, Avatar
} from "@material-ui/core/";
import { useSelector } from "react-redux";
import Style from './Style'
import { formatter } from "../../../../utils/localStore";

const useStyles = makeStyles((theme) => (Style(theme)));

export default function CartSummary() {
  const classes = useStyles();
  const cartItem = useSelector(state => state.Cart.cart)


  const getTotal = () => cartItem.reduce((a, b) => a + b.unitPrice * b.quantity, 0);

  return (
    <Paper className={classes.root}>
      <CardHeader color="primary" title={`(${cartItem.length}) Cart Summary`} />
      <CardContent>
        <List className={classes.list}>

          {cartItem.map((item, index) => (

            <ListItem key={item.productId} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.title.toLowerCase()} src={item.image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={
                  <React.Fragment>
                    {`${item.quantity} x ${formatter.format(
                      item.unitPrice
                    )}`}
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {`${formatter.format(
                        item.quantity * item.unitPrice
                      )}`}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Divider />
            </ListItem>
          ))}
          <ListItem alignItems="center">
            <ListItemText
              primary={<strong>{formatter.format(getTotal())}</strong>}
            />
          </ListItem>
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant={"outlined"}
          color="secondary"
          href="/agents/frontline/products"
        >
          Continue Shopping
        </Button>
      </CardActions>
    </Paper>
  );
}
