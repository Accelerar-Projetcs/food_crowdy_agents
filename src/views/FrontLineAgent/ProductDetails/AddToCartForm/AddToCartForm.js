import React, { useState, useContext } from 'react';
import {
  Dialog,
  Card,
  CardHeader,
  CardActions,
  Button,
  Divider,
  IconButton,
  TextField,
  CardContent, Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Close as CloseIcon } from '@material-ui/icons';
import { addToCart } from '../../../../Redux/Reducers/Cart/';
import { contextApi } from '../../../../components/context/Context';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { CartStyles } from './Styles';

const useStyles = makeStyles((theme) => CartStyles(theme));

const AddToCartForm = ({ data, price, setOpen, open }) => {
  const [quantity, setQuantity] = useState(0);
  const { setCartState } = useContext(contextApi);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const AddToCart = (e) => {
    e.preventDefault()
    const units = Math.floor(price.conversionUnit)
    if (!quantity) {
      toast.error('Fill the number of slot needed', {
				toastId: 'add to cart error'
			});
    } else if (quantity > data.quantity * units) {
			toast.warning(`Available quantity is ${data.quantity * units}`, {
				toastId: 'add to cart error'
      })}
       else  {
      if (Number.isInteger(quantity)) {
        const item = {
          productId: data._id,
          image: data.image.secureUrl,
          title: data.title,
          category: data.category,
          location: data.availableState,
          availableQty: data.quantity,
          quantity: Math.abs(quantity),
          unitPrice: price.displayPrice,
          measurementType: price.conversionType,
          converisonUnit: price.conversionUnit,
          unitSpace: data.unitSpace,
          totalPrice: Math.abs(quantity) * price.displayPrice
        };
        dispatch(addToCart(item));
        setCartState({ right: true });
        handleClose()
      } else {
        toast.error('Slot must be a whole number', {
          toastId: 'add to cart error'
        });
      }

    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        className={classes.root}
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <Card>
          <form>
            <div className={classes.close}>
              <CardHeader subheader='' title='Choose Number of Slots' />
              <div>
                <IconButton aria-label='close' onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <CardContent>
              <Alert severity='info'>
                <AlertTitle>Info</AlertTitle>
								Add item to your cart and make payments
								<br />
              </Alert>
              <div>
                <h5>{data.title}</h5>
                <Chip
                  label={` Per ${price.conversionType}`}
                  color='secondary'
                  size='medium'
                />
              </div>
              <TextField
                className={classes.textField}
                fullWidth
                name='noOfSlots'
                onChange={(e) => setQuantity(+e.target.value)}
                type='number'
                required
                variant='outlined'
              />
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                onClick={handleClose}
                variant='outlined'
                className={classes.btn}
                color='inherit'>
                CANCEL
							</Button>
              <Button
                onClick={AddToCart}
                type='submit'
                variant='contained'
                color='primary'>
                Add to cart
							</Button>
            </CardActions>
          </form>
        </Card>
      </Dialog>
    </div>
  );
};

export default AddToCartForm;
