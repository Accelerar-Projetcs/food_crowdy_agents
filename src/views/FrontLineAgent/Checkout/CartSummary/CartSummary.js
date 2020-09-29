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
    ListItemText,
} from "@material-ui/core/";
import { useSelector } from "react-redux";
import Style from './Style'
import { formatter } from "../../../../utils/localStore";

const useStyles = makeStyles((theme) => (Style(theme)));

export default function CartSummary() {
    const classes = useStyles();
    const cartItem = useSelector(state => state.Cart.cart)


    const getTotal = () => cartItem.reduce((a, b) => a + b.unitPrice, 0);

    return (
        <Paper className={classes.demo}>
            <CardHeader color="primary" title="Cart Summary" />
            <CardContent>
                <List>
                    {cartItem.map((item) => (
                        <ListItem key={item.productId}>
                        
                            <ListItemText
                                className={classes.title}
                                primary={item.title.toLowerCase()}
                                secondary={`${item.quantity} x ${formatter.format(
                                    item.unitPrice
                                )}`}
                            />
                            <ListItemText
                                // primary={''}
                                className={classes.unitPrice}
                                primary={
                                    <span>{`${formatter.format(
                                        item.quantity * item.unitPrice
                                    )}`}</span>
                                }
                            />
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
                    href="/products/all"
                >
                    Continue Shopping
        </Button>
            </CardActions>
        </Paper>
    );
}
