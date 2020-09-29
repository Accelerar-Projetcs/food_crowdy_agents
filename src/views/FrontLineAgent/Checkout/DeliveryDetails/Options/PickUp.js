import React, { useState } from "react";
import { LocationOn as LocationIcon } from "@material-ui/icons";

import { makeStyles, TextField, Button } from "@material-ui/core";
import Style from "../Style";
import { DeliveryData } from "./data";
import { COMPANY_LINE } from "../../../../../constants/brand";

const useStyles = makeStyles((theme) => Style(theme));

const PickUp = ({ pickUpDelivery }) => {
  const classes = useStyles();
  const [location, setLocation] = useState({
    locationArea: "",
    state: "",
  });
  const [errors, setError] = useState("");

  const getArea = (id) => {
    if (id) {
      const filteredItem = DeliveryData.filter((item) => item.name === id);
      setLocation({
        locationArea: filteredItem[0].officeAddress,
        state: id,
      });
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    if (location.state) {
      const { state, locationArea } = location;
      const data = {
        state,
        description: `(pick Up) ${locationArea}`,
      };
      pickUpDelivery(data);
    } else {
      setError(`Please address is required`);
    }
  };

  return (
    <form className={classes.form} onSubmit={saveAddress}>
      <TextField
        className={classes.textField2}
        id="outlined-select-days"
        select
        fullWidth
        name="state"
        onChange={(e) => getArea(e.target.value)}
        helperText={errors ? errors : ""}
        error={errors ? true : false}
        SelectProps={{
          name: "state",
          native: true,
        }}
        variant="outlined"
      >
        <option value={""}>Choose State</option>
        {DeliveryData.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </TextField>
      <div>
        {location.locationArea && (
          <ul className={classes.ul}>
            <LocationIcon />
            <li>
              {" "}
              <strong>Addres</strong> <br />{" "}
              <span>{location.locationArea}</span>
            </li>
            <li>
              {" "}
              <strong>Contact Information</strong> <br />{" "}
              <span>{COMPANY_LINE}</span>
            </li>
          </ul>
        )}
      </div>
      <Button type="submit" variant="contained" color="secondary">
        Continue
      </Button>
    </form>
  );
};

export default PickUp;
