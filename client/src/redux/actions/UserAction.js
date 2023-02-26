import { ActionTypes } from '../constants';

export const getUsers = (users)=>{
    return {
        type:ActionTypes.GET_USERS,
        payload:users
    }
}
export const addUser = (user)=>{
    return {
        type:ActionTypes.ADD_USER,
        payload:user
    }
}
export const updateUser = (user)=>{
    return {
        type:ActionTypes.UPDATE_USER,
        payload:user
    }
}

export const deleteUser = (user) =>{
    return{
        type:ActionTypes.DELETE_USER,
        payload:user
    }
}