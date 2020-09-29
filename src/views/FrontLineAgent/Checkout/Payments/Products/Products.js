import React from "react";
import {
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@material-ui/core/";
import { formatter } from "../../../../../utils/localStore";
import {Style} from './Style'

const useStyles = makeStyles((theme) => (Style(theme)));
const FoodItems = ({ data, total }) => {
    const classes = useStyles();

    return (
        <List>
            {data.map((product) => (
                <ListItem className={classes.listItem} key={product.id}>
                    <ListItemText
                        className={classes.list}
                        primary={product.title}
                        secondary={`Qty: ${product.quantity}`}
                    />
                    <Typography variant="body2">
                        {formatter.format(product.unitPrice)}
                    </Typography>
                </ListItem>
            ))}

            <ListItem>
                <ListItemText className={classes.list} primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                    {formatter.format(total)}
                </Typography>
            </ListItem>
        </List>
    );
};

export default FoodItems;
