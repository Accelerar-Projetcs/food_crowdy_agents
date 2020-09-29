import React from "react";
import { Button } from "@material-ui/core";
import { CUSTOM_LOGO } from "../../../../constants/brand";


const Payments = ({ paymentData }) => {

  return (
    <form method="POST" action={process.env.REACT_APP_FLUTTER_PAYMENT_URL}>
      <input
        type="hidden"
        name="public_key"
        defaultValue={process.env.REACT_APP_FLUTTER_KEY}
      />
      <input
        type="hidden"
        name="customer[email]"
        defaultValue={paymentData.user.email}
      />
      <input
        type="hidden"
        name="customer[phone_number]"
        defaultValue={paymentData.user.phoneNumber}
      />
      <input
        type="hidden"
        name="customer[name]"
        defaultValue={paymentData.user.name}
      />
      <input
        type="hidden"
        name="tx_ref"
        defaultValue={paymentData.orderReference}
      />
      <input
        type="hidden"
        name="amount"
        defaultValue={
          paymentData.totalPrice + (paymentData.delivery && paymentData.delivery.price ?paymentData.delivery.price:0 ) + Number(process.env.REACT_APP_FOODCROWDY_CHARGE)
        }
      />
      <input type="hidden" name="currency" defaultValue="NGN" />
      <input type="hidden" name="meta[token]" defaultValue="54" />
      <input type="hidden" name="redirect_url" defaultValue={process.env.REACT_APP_FLUTTER_REDIRECT_URL} />
      <input
        type="hidden"
        width="100"
        name="customizations[logo]"
        defaultValue={CUSTOM_LOGO}
      />
      <input
        type="hidden"
        name="customizations[title]"
        defaultValue="Food Crowdy"
      />
      <Button  type="submit" variant="contained" color="primary">
        MAKE PAYMENT
      </Button>
    </form>
  );
};

export default Payments;
