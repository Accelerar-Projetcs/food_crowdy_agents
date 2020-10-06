import React, { useEffect, useState } from "react";
import {
  Card,
  makeStyles,
  CardHeader,
  CardContent,
  Divider,
  Paper,
  Button,
  InputLabel,
  Input,
  FormControl,
  Select,
  MenuItem, Typography, FormControlLabel, RadioGroup, Radio, CardActions
} from "@material-ui/core";
import useHeader from '../../../../server/Headers'
import useAgent from '../../../../hooks/useAgent'
import Style from "./Styles";
import { Person as PersonIcon, Phone as PhoneIcon } from "@material-ui/icons";
import { toast } from "react-toastify";
import BackDropLoader from "../../../../components/BackDrop/BackDrop";
import ChooseByID from "./ChooseByID/ChooseByID";

const useStyles = makeStyles((theme) => Style(theme));

const Cooperatives = () => {
  const classes = useStyles();
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });
  const [selectedUser, setselectedUser] = useState({});
  const [isUser, setIsUser] = useState({ isValid: false });
  const { headers } = useHeader();
  const { data, loading } = useAgent(`/fla/downliner`, headers);
  const [downlines, setDownlines] = useState([]);

  const chooseDownLineToCheckout = (e) => {
    if (e.target.value === 'uniqueId') {
      setOptions({ option1: true })
    } else if (e.target.value === 'userList') {
      setOptions({ option2: true })
    } else {
      setOptions({ option3: true })

    }
  };

  const selectUser = (e) => {
    if (e.target.value === '') {
      return toast.error(
        'please choose your downline or you can signup a new user'
      );
    }
    const value = e.target.value;

    const filteredItem = downlines.filter((list) => list._id === value);
    setselectedUser(filteredItem[0]);
  };

  useEffect(() => {
    if (data.length) {
      setDownlines(data);
    }
  }, [data]);

  return (
    <div>
      {loading && <BackDropLoader />}
      <Paper className={classes.paper}>
        <Card>
          <Divider />
          <CardContent>
            <CardHeader title={<Typography variant='h3' className={classes.typograghyTitle}>
              <PersonIcon color='primary' /> Choose your downline
					</Typography>} />
            <Divider />
            <CardContent className={classes.content}>
              <FormControl className={classes.select} fullWidth component='fieldset'>
                <RadioGroup

                  aria-label='checkoutUser'
                  name='category'
                  onChange={chooseDownLineToCheckout}>
                  <FormControlLabel
                    value={'uniqueId'}
                    control={<Radio />}
                    label={<Typography variant='h4'>1. Checkout user by Id</Typography>}

                  />
                  {options.option1 && <ChooseByID
                    selectedUser={selectUser}
                    setselectedUser={setselectedUser}
                    setIsUser={setIsUser}
                  />
                  }
                  <Divider />
                  <FormControlLabel
                    value={'userList'}
                    control={<Radio />}
                    label={<Typography variant='h4'>2. Choose from downlines </Typography>}
                  />
                  {options.option2 && (
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-dialog-select-label">
                        Choose your downlines
                        </InputLabel>
                      <Select
                        fullWidth
                        name="coOperative"
                        variant="outlined"
                        margin={"dense"}
                        onChange={selectUser}
                        labelId="demo-dialog-select-label"
                        id="demo-dialog-select"

                        input={<Input fullWidth />}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {downlines.map((item) => (
                          <MenuItem key={item._id} value={item._id}>

                            <Typography variant="body1"> {item.name}</Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  {selectUser && options.option2 && (
                    <>
                      <Typography className={classes.text} variant='h6'>
                        <PersonIcon className={classes.icon} /> {selectedUser.name}
                      </Typography>
                      <Divider />
                      <Typography className={classes.text} variant='body1'>
                        <PhoneIcon className={classes.icon} /> {selectedUser.phoneNumber}
                      </Typography>
                    </>
                  )}
                  <Divider className={classes.TextField} />
                  <FormControlLabel
                    value={'pickUp'}
                    control={<Radio />}
                    label={<Typography variant='h4'>3. Add New User</Typography>}
                  />
                  {options.option3 && (

                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      href='/agents/frontline/add-downlines'
                      color='primary'>
                      Register User
                    </Button>

                  )}
                </RadioGroup>
                <Divider />
              </FormControl>

            </CardContent>
            <CardActions>
              <div>
                {selectedUser && isUser.isValid && (
                  <Button
                    type='submit'
                    variant='contained'
                    href={`/agents/frontline/product/checkout/${selectedUser._id}`}
                    color='primary'>
                    Proceed to checkout
                  </Button>
                )}
              </div>
            </CardActions>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
};

export default Cooperatives;
