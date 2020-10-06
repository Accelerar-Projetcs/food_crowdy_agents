import React, { useEffect, useState } from 'react';
import { Typography, Divider, makeStyles, TextField, Button } from '@material-ui/core';
import { LocationOn, Mail, Person as PersonIcon, Phone as PhoneIcon } from '@material-ui/icons'
import Style from "./Style";
import { agentApi } from '../../../../../server/Server';
import useHeader from '../../../../../server/Headers';
import BackDropLoader from '../../../../../components/BackDrop/BackDrop';
import { errorHandler } from '../../../../../errors/errorHandler';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => Style(theme));

const ChooseByID = ({ selectedUser, setselectedUser, setIsUser }) => {
  const [loading, setloading] = useState(false)
  const [id, setId] = useState('')
  const [user, setUser] = useState('')
  const classes = useStyles()
  const { headers } = useHeader()


  const confirmUser = async () => {
    if (!id) return toast.error(`Please enter user unique id`)

    setloading(true)
    try {
      const res = await agentApi.get(
        `/fla/downliner-profile/${id}`, { headers }
      );
      if (res.data) {
        setselectedUser(res.data)
        setUser(res.data)
        setIsUser({ isValid: true })
      } else {
        toast.error(`Please ensure the user id is valid`)
      }
    } catch (error) {
      errorHandler(error)
    }
    setloading(false)
  }
  useEffect(() => {

  }, [selectedUser])
  return (
    <>
      {loading && <BackDropLoader />}
      <div>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => setId(e.target.value)}
          className={classes.TextField}
          placeholder="Enter user unique id e.g(FCUSR001)"
        />
        <div className={classes.TextField}>
          <Button
            fullWidth
            variant="contained"
            onClick={confirmUser}
            color="primary">
            Submit </Button>
        </div>
      </div>
      {user && <>
        <Typography className={classes.text} variant='h6'>
          <PersonIcon className={classes.icon} /> {user.name}
        </Typography>
        <Typography className={classes.text} variant='body1'>
          <Mail className={classes.icon} /> {user.email}
        </Typography>
        <Divider />
        <Typography className={classes.text} variant='body1'>
          <PhoneIcon className={classes.icon} /> {user.phoneNumber}
        </Typography>
        <Typography className={classes.text} variant='body1'>
          <LocationOn className={classes.icon} /> {user.location}
        </Typography>
      </>
      }

    </>
  )
}

export default ChooseByID
