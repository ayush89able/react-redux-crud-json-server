import * as types from './actionType'
import axios from 'axios'

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
})

const deletedUser = () => ({
    type: types.DELETE_USER,
})

const addedUser = () => ({
    type: types.ADD_USER
})

const updatedUser = () => ({
    type: types.UPDATE_USER
})

const getUser = (user) => ({
    type: types.GET_USER,
    payload: user
})

export const loadUsers = () => {
    return function(dispatch) {
        axios.get(`${process.env.REACT_APP_API}`)
        .then((res) =>{
            // console.log(res.data)
            dispatch(getUsers(res.data))
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

export const deleteUser = (id) => {
    return function(dispatch) {
        axios.delete(`${process.env.REACT_APP_API}/${id}`)
        .then((res) =>{
            // console.log(res)
            dispatch(deletedUser(res.data))
            dispatch(loadUsers())
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

export const addUser = (user) => {
    return function(dispatch) {
        // console.log(user)
        axios.post(`${process.env.REACT_APP_API}`, user)
        .then((res) =>{
            // console.log(res)
            dispatch(addedUser())
            // dispatch(loadUsers())
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

export const getUserData = (id) => {
    // console.log(id)
    return function(dispatch) {
        axios.get(`${process.env.REACT_APP_API}/${id}`)
        .then((res) =>{
            dispatch(getUser(res.data))
            // dispatch(loadUsers())
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}

export const updateUser = (user) => {
    console.log(user)
    return function(dispatch) {
        axios.put(`${process.env.REACT_APP_API}/${user.id}`, user)
        .then((res) =>{
            dispatch(updatedUser(res.data))
            // dispatch(loadUsers())
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}