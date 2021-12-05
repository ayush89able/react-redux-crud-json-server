import React, { useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { loadUsers, deleteUser } from '../redux/action';
import { useNavigate } from 'react-router-dom';

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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Home = (props) => {
  const classes = useStyles();
  const buttonStyles = useButtonStyles()

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.users)
  // console.log(users)
  useEffect(()=>{
    dispatch(loadUsers())
  },[])

  const handleUserDelete = (id) => {
    dispatch(deleteUser(id))
  }

  return(
    <TableContainer component={Paper}>
      <div className={buttonStyles.root}>
        <Button variant="contained" color="primary" onClick={() => navigate('/AddUser')}>Add User</Button>
      </div>  
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Name</StyledTableCell>
          <StyledTableCell align="center">Email</StyledTableCell>
          <StyledTableCell align="center">Contact</StyledTableCell>
          <StyledTableCell align="center">Address</StyledTableCell>
          <StyledTableCell align="center">Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <StyledTableRow key={user.name}>
            <StyledTableCell align="center">{user.name}</StyledTableCell>
            <StyledTableCell align="center">{user.email}</StyledTableCell>
            <StyledTableCell align="center">{user.contact}</StyledTableCell>
            <StyledTableCell align="center">{user.address}</StyledTableCell>
            <StyledTableCell align="center">
              <div className={buttonStyles.root}>
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                  <Button color="primary" onClick={() => navigate(`/EditUser/${user.id}`)}>EDIT</Button>
                  <Button color="secondary" onClick={() => handleUserDelete(user.id)}>DELETE</Button>
                </ButtonGroup>
              </div>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}
export default Home