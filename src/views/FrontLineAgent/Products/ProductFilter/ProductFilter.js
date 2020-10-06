import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core/';
import { contextApi } from '../../../../components/context/Context';
import { statesAvailable } from '../../../../utils/LocationList';

const useStyles = makeStyles((theme) => ({
  select: {
    display: 'flex',
  }, label: {
    margin: theme.spacing(2, 0, 0, .3)
  },
  textField: {
    margin: theme.spacing(2, 3)
  }
}));

const ProductFilter = () => {
  const classes = useStyles();
  const { setLocation } = useContext(contextApi);
  const handleChange = (e) => {
    localStorage.setItem("user_current_state", JSON.stringify(e.target.value));
    setLocation(e.target.value)
  }


  return (
    <>
      <TextField
        className={classes.textField}
        id="outlined-select-state"
        select
        label=""
        name="location"
        onChange={handleChange}
        margin="dense"
        SelectProps={{
          native: true,
        }}
        variant="outlined"
      >
         <option value={''}>
           Select state
          </option>
        {statesAvailable.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </TextField>
    </>
  );
};

export default ProductFilter;
