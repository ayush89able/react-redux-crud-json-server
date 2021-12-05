import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData, updateUser } from '../redux/action'

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

const EditUser = () => {
    const classes = useStyles()
    const buttonStyles = useButtonStyles()
    const { user } = useSelector(state => state.users)
    // console.log(user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()
    const [state, setState] = useState({
        name: '',
        email: '',
        contact: '',
        address: ''
    })
    const [error, setError] = useState([])
    const { name, email, contact, address } = state

    useEffect(()=>{
        dispatch(getUserData(id))
    },[])

    useEffect(()=>{
        if(user) {
            setState({...user})
        }
    },[user])

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
            console.log(state)
            dispatch(updateUser(state))
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
      <Button variant="contained" color="primary" onClick={handleAddUser}>Update User</Button>
    </form>
    </>
    )
}

export default EditUser