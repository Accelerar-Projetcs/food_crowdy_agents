import React from "react";
import {
  makeStyles,
  Typography,
  Grid,
  ListItem,
  ListItemText,
} from "@material-ui/core/";
import Payments from "./Payment";
import FoodItems from "./Products/Products";
import { formatter } from "../../../../utils/localStore";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  listItem: {},

  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  deliveryPrice: {
    fontWeight: 700,
    fontSize: `1.4rem`,
  },
  deliverylist: {
    fontSize: `2rem`,
    borderTop: "1.5px solid #ccc",
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2, 0),
  },
}));

export default function ReviewDetails({ data }) {
  const classes = useStyles();

  if (data) {
    return (
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <Typography variant="body1">
          <strong>Order Ref {data.orderReference}</strong>
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sm={12}>
            <FoodItems data={data} total={data.totalPrice} />

            <ListItem className={classes.listItem}>
              <ListItemText primary="Shipping Fee" />
              <Typography variant="subtitle1" className={classes.total}>
                {formatter.format((data.delivery.price || 0))}
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                className={classes.deliverylist}
                primary="Total Amount"
              />
              <Typography variant="subtitle1" className={classes.deliveryPrice}>
                {formatter.format(data.totalPrice)}
              </Typography>
            </ListItem>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <div>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping Details
                </Typography>
              <Typography gutterBottom>{data.user.name}</Typography>
              <Typography gutterBottom>{data.user.email}</Typography>
              <Typography gutterBottom>{data.user.phoneNumber}</Typography>
              <Typography gutterBottom>{data.user.address}</Typography>
            </div>

          </Grid>
        </Grid>
        <Payments paymentData={data} />
      </div>
    );
  } else {
    return (<span>Error</span>)
  }
}
