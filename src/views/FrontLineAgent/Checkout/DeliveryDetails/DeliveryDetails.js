import React, { useState } from "react";
import {
  Divider,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  makeStyles
} from "@material-ui/core";

import Style from "./Style";
import DoorDelivery from "./Options/DoorDelivery";
import PickUp from "./Options/PickUp";
import Axios from "axios";
import { useSelector } from "react-redux";
import useHeader from "../../../../server/Headers";
import { toast } from "react-toastify";
import { userData } from "../../../../utils/GetUserData";
import { COMPANY_NAME, MOTORCYCLE, TRUCK, LOGISTICS_NAME } from "../../../../constants/brand";
import { agentApi } from "../../../../server/Server";
import { errorHandler } from "../../../../errors/errorHandler";
import BackDropLoader from "../../../../components/BackDrop/BackDrop";

const useStyles = makeStyles((theme) => Style(theme));

const DeliveryDetails = ({ userId, activeStep, setActiveStep, setCheckoutData }) => {
  const classes = useStyles();
  const userName = userData("firstName");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    doorDelivery: false,
    pickup: false,
  });

  const cartItem = useSelector((state) => state.Cart.cart);
  const { headers } = useHeader();

  const products = cartItem.map((item) => ({
    id: item.productId,
    qty: Math.abs(item.quantity),
    measurementType: item.measurementType,
  }));

  const deliveryOption = (e) => {
    if (e.target.value === "doorDelivery") {
      setLocation({ doorDelivery: true });
    } else {
      setLocation({ pickup: true });
    }
  };

  const getDeliveryMethod = (value) => {
    if (value <= MOTORCYCLE) {
      return "motorcycle";
    } else if (value > MOTORCYCLE && value < TRUCK) {
      return "van";
    } else if (value >= TRUCK) {
      return "truck";
    } else {
      return TRUCK
    }
  };

  const getDeliveryMeasurementType = () => {
    const deliveryType = cartItem
      .map((item) => ({
        totalUnitSpace: Math.ceil(
          (item.unitSpace / item.converisonUnit) * item.quantity
        ),
        unit: item.converisonUnit,
      }))
      .reduce((a, b) => a + b.totalUnitSpace, 0);
    const type = getDeliveryMethod(deliveryType);
    return type;
  };


  const getCheapestLogisticsFee = (data) => {
    const foodCrowdyLogistics = data.find(place => place.name === LOGISTICS_NAME)
    if (foodCrowdyLogistics) {
      return foodCrowdyLogistics;
    } else {
      return toast.warning("Sorry we could not cover this distance from our pickup point at this time");
    }
  };
  const getDeliveryPrice = async (
    location,
    deliveryPoint,
    phoneNumber,
    deliveryType
  ) => {
    const dataObj = {
      api_secret_key: process.env.REACT_APP_O2RYDERS_KEY,
      action: "get-delivery-rate",
      item_name: `${COMPANY_NAME}`,
      receiver_name: userName,
      receiver_phone: phoneNumber,
      pickup_location: location,
      delivery_address: deliveryPoint.label,
      vehicle_type: deliveryType,
    };
    try {
      const res = await Axios.post(
        `${process.env.REACT_APP_BASE_URL_O2RYDERS}/v1/api`,
        dataObj
      );
      if (res.error) {
        setLoading(false);
        return toast.error("something went wrong");
      } else if (!res.data.length) {
        return toast.error("Sorry we could not  get your delivery fee  for this location");
      } else {
        return await res.data
      }
    } catch (error) {
      setLoading(false)

    }
  };

  const postDeliveryRequestToCheckout = async (logistics, pickUp) => {
    const data = {
      userId,
      products,
      deliveryState: pickUp.state,
      deliveryAddress: pickUp.description,
    };
    if (logistics) data.delivery = logistics;

    try {
      const res = await agentApi.post(`/fla/checkout-user`, data, { headers });
      setCheckoutData(res.data);
      setActiveStep(activeStep + 1)
      setLoading(false);
    } catch (error) {
      errorHandler(error);

    }
    setLoading(false);
  };
  /**
   * 
   * Function for Product Checkout
   * 
   */

  //Door Delivery Checkout.

  const getDoorDelivery = (data, location, deliveryPoint, phoneNumber) => {
    setLoading(true);
    const deliveryType = getDeliveryMeasurementType();
    getDeliveryPrice(location, deliveryPoint, phoneNumber, deliveryType).then(res => {
      const result = getCheapestLogisticsFee(res);
      postDeliveryRequestToCheckout(result, data);
    }).catch((err) => {
      setLoading(false);
      // return toast.error("something went wrong");
    })
  };

  //Pick Up Checkout
  const pickUpDelivery = (data) => {
    setLoading(true);
    postDeliveryRequestToCheckout("", data);
  };

  return (
    <div>
      {loading && <BackDropLoader />}
      <Typography className={classes.typograghy}>
        <strong>How do you want your order delivered?</strong>
      </Typography>
      <Divider />
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="foodCategory"
          name="category"
          className={classes.typograghy}
          onChange={deliveryOption}
        >
          <FormControlLabel
            value={"doorDelivery"}
            control={<Radio />}
            label="1. Door Delivery"
          />
          {location.doorDelivery && (
            <DoorDelivery getDoorDelivery={getDoorDelivery} />
          )}

          <Divider className={classes.TextField} />
          <FormControlLabel
            value={"pickUp"}
            control={<Radio />}
            label={"2. Pick Up"}
          />
        </RadioGroup>
        {location.pickup && <PickUp pickUpDelivery={pickUpDelivery} />}
      </FormControl>
    </div>
  );
};

export default DeliveryDetails;

