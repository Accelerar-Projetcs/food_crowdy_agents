import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, makeStyles, TextField, Typography } from "@material-ui/core/";
import { LocationOn as Location, CheckCircle as CheckCircleIcon } from "@material-ui/icons/";
import Style from './Style';
import AddToCartForm from "../../ProductDetails/AddToCartForm/AddToCartForm";
import { Rating } from "@material-ui/lab";
import { formatter } from "../../../../utils/localStore";

const useStyles = makeStyles((theme) => (Style(theme)))

const ProductCard = ({ item }) => {
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const [price, setPrice] = useState({
    displayPrice: "",
    marketPrice: "",
    conversionType: "",
    conversionUnit: "",
  });

  const getDisplayPriceInDecimal = (value) =>
    Number(Math.round(value + 'e2') + 'e-2');

  const handleChange = (e) => {
    const filterItem = item.measurement.filter(
      (item) => item.conversionType === e.target.value
    );
    setPrice({
      displayPrice: getDisplayPriceInDecimal(filterItem[0].displayPrice),
      marketPrice: filterItem[0].marketPrice,
      conversionType: filterItem[0].conversionType,
      conversionUnit: filterItem[0].conversionUnit,
    });
  };

  useEffect(() => {
    if (item && item.measurement) {
      setPrice({
        displayPrice: getDisplayPriceInDecimal(item.measurement[0].displayPrice),
        marketPrice: item.measurement[0].marketPrice,
        conversionType: item.measurement[0].conversionType,
        conversionUnit: item.measurement[0].conversionUnit,
      });
    }
  }, [item.measurement, item]);

  return (
    <>
      <AddToCartForm data={item} price={price} open={open} setOpen={setopen} />

      <div className={classes.card}>
        <Link
          to={`/product-details/${item.category}/${item.title}/${item._id}`}
        >
          <div className={classes.imgcard}>
            <img
              src={item.image.secureUrl}
              alt={item.title} />
          </div>
        </Link>
        <div className={classes.cardBody}>

          <Typography variant="h5">
            {item.title.split(" ").slice(0, 3).join(" ")}..
          </Typography>
          <Typography variant="body1">
            Grains
          </Typography>
          <span className={classes.discount}> -
                {Math.ceil(
            ((price.marketPrice - price.displayPrice) /
              price.marketPrice) *
            100
          )}
                %</span>
          <div>
            <TextField
              className="product-select"
              select
              color="secondary"
              size="small"
              variant="outlined"
              id="demo-simple-select-outlined"
              onChange={handleChange}
              SelectProps={{
                name: "type",
                native: true,
              }}
            >
              {item.measurement.map((type) => (
                <option
                  key={type.conversionType}
                  value={type.conversionType}
                >
                  {`Per ${type.conversionType}`}
                </option>
              ))}
            </TextField>
          </div>
          <Link
            to={`/product-details/${item.category}/${item.title}/${item._id}`}
          >
            <div>
              <Rating name={item.title} value={5} />
            </div>
            <Divider />
            <div className={classes.price}>
              <p className={classes.displayPrice}>
                {formatter.format(price.displayPrice)}
              </p>
              <p className={classes.marketPrice}>
                {formatter.format(price.marketPrice)}
              </p>
              <div>
                <Location fontSize={'small'} color="secondary" className="location-icon" />{item.availableState}
              </div>

            </div>

            <Divider />
            <span className={classes.available}>Number of products available</span>
          </Link>
          <div>
            <Button fullWidth className={classes.btnSmall} variant="outlined" > {Math.floor(price.conversionUnit * item.quantity)} {item.isSoldOut ? 'sold out' : 'available'}  <CheckCircleIcon className={classes.btnIcon} color="secondary" /></Button>
            <Button onClick={() => {
              setopen(true);
            }} fullWidth className={classes.btn} variant="contained" color="secondary" disabled={item.isSoldOut ? true : false} >Add to Cart </Button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductCard;
