import { ActionTypes } from '../constants';

const initialState = {
    users: []
}

export const userReducer = (state = initialState, { type, payload }) => {
    
    
    switch (type) {
        case ActionTypes.ADD_USER:
            return {
                ...state,
                users: [...state.users, payload]
            }
        case ActionTypes.GET_USERS:
            
            return {
                ...state,
                users: payload
            }
        case ActionTypes.DELETE_USER:
            const tempUsers = [...state.users];
            const userIndex = tempUsers.findIndex((elem) => elem._id = payload._id);
            tempUsers.splice(userIndex, 1);
            return {
                ...state,
                users: tempUsers
            }
        case ActionTypes.UPDATE_USER:
            const localUsers = [...state.users];
            const userPos = localUsers.findIndex((elem) => elem._id = payload._id);
            localUsers[userPos] = payload;
            return {
                ...state,
                users: localUsers
            }
        default:
            return state;
    }
}