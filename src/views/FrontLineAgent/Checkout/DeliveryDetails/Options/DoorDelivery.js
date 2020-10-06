import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { makeStyles, TextField, Grid, Button } from "@material-ui/core";
import Style from "../Style";
import { deliveryAddress } from "../validator";
import { toast } from "react-toastify";
import { offices } from "../../../../../utils/LocationList";

const useStyles = makeStyles((theme) => Style(theme));

const DoorDelivery = ({ getDoorDelivery }) => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(deliveryAddress),
  });
  const classes = useStyles();
  const [deliveryPoint, setDeliveryPoint] = useState("");
  const [location, setLocation] = useState();


  const saveAddress = (value) => {
    if (value && deliveryPoint) {
      const { description, state, phoneNumber } = value;
      const data = {
        description,
        state,
      };
      getDoorDelivery(data, location, deliveryPoint, phoneNumber);
    } else {
      toast.error(`Landmark nearest location is required`);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(saveAddress)}>
      <TextField
        className={classes.textField2}
        id="outlined-select-days"
        select
        fullWidth
        name="state"
        inputRef={register}
        onChange={(e) => setLocation(e.target.value)}
        helperText={errors && errors.state ? errors.state.message : ""}
        error={errors && errors.state ? true : false}
        SelectProps={{
          name: "state",
          native: true,
        }}
        variant="outlined"
      >
        <option value={""}>Choose State</option>
        {offices.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </TextField>
      <Grid container spacing={3}>
        <Grid item md={12} lg={12} xl={12} xs={12} sm={12}>
          <label>Enter Your Nearest Landmark</label>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_MAP}
            autocompletionRequest={{
              componentRestrictions: {
                country: ['ng']
              }
            }}
            selectProps={{
              deliveryPoint,
              onChange: setDeliveryPoint,
            }}
            onLoadFailed={(error) => { }}
          />
        </Grid>
      </Grid>
      <TextField
        className={classes.textField2}
        id="outlined-select-number"
        fullWidth
        inputRef={register}
        placeholder="Enter Your Phone Number e.g 08165xxxxxxx"
        name="phoneNumber"
        helperText={
          errors && errors.phoneNumber ? errors.phoneNumber.message : ""
        }
        error={errors && errors.phoneNumber ? true : false}
        SelectProps={{
          name: "phoneNumber",
          native: true,
        }}
        variant="outlined"
      />
      <TextField
        className={classes.textField2}
        id="outlined-select-location"
        multiline
        fullWidth
        rows={7}
        inputRef={register}
        placeholder="Enter your full addresss"
        name="description"
        helperText={
          errors && errors.description ? errors.description.message : ""
        }
        error={errors && errors.description ? true : false}
        SelectProps={{
          name: "description",
          native: true,
        }}
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="secondary">
        Continue
      </Button>
    </form>
  );
};

export default DoorDelivery;
