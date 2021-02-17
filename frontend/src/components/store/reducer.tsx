import { logOut } from './actions';
import { initState, user } from './state';

const reducer = (state: user = initState, action: any) => {
    switch (action.type) {
        case 'USER_NOT_FOUND': return {
            ...state,
            usersStatus: 3,
        };
        case 'USER_INCORRECT_PASWORD': return {
            ...state,
            usersStatus: 4,
        };
        case 'FETCH_USER_INFO_SUCCESS': return {
            ...state,
            userInfo: action.payload,
            ferchUserInfoSuccess: true,
            usersStatus: 1,
        };
        case 'FETCH_USER_INFO_FAIL': return {
            ...state,
            ferchUserInfoSuccess: false,
        };
        case 'ADD_USER_SUCCESS': return {
            ...state,
            userAdded: true,
        };
        case 'ADD_USER_FAIL': return {
            ...state,
            userAdded: false,
        };
        case 'UPDATE_USER_SUCCESS': return {
            ...state,
            userInfo: action.payload,
            userUpdateSuccess: true,
            isUpdate: false,
        };
        case 'UPDATE_USER_FAIL': return {
            ...state,
            userUpdateSuccess: false,
        };
        case 'EDIT_USER': return {
            ...state,
            isUpdate: true,
            userUpdateSuccess: undefined,
        };
        case 'LOG_OUT': return {
            ...state,
            usersStatus: 2,
        };
        default: 
            return state;

    }
}

export default reducer