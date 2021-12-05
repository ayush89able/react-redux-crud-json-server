import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../redux/action'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

const useButtonStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const AddUser = () => {
    const classes = useStyles()
    const buttonStyles = useButtonStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: '',
        email: '',
        contact: '',
        address: ''
    })
    const [error, setError] = useState([])
    const { name, email, contact, address } = state

    const ChangeHandler = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handleAddUser = () => {
        if(!name || !email || !contact || !address) {
            setError("Please fill All Fields")
        } else if(contact.length !== 10) {
            setError("Contact should be of 10 digits")
        } else if(!validateEmail(email)) {
            setError("Badly formatted Email")
        } else {
            dispatch(addUser(state))
            setError([])
            navigate('/')
        }
    }

    
    return(
    <>
    <div className={buttonStyles.root}>
        <Button variant="contained" color="secondary" onClick={() => navigate('/')}>Back to Users</Button>
    </div>
    {error && <h3 style={{color:'red', textAlign:'center'}}>{error}</h3>}
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="filled-basic" label="Name" name="name" variant="filled" value={name} onChange={ChangeHandler} />
      <TextField id="filled-basic" label="Email" name="email" variant="filled" value={email} onChange={ChangeHandler} />
      <TextField id="filled-basic" label="Contact" type="number" name="contact" variant="filled" value={contact} onChange={ChangeHandler} />
      <TextField id="filled-basic" label="Address" name="address" variant="filled" value={address} onChange={ChangeHandler} />
      <Button variant="contained" color="primary" onClick={handleAddUser}>Add User</Button>
    </form>
    </>
    )
}

export default AddUser