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
            fetchUserInfoFail: true,
        };
        case 'ADD_USER_SUCCESS': return {
            ...state,
            userAdded: true,
        };
        case 'ADD_USER_FAIL': return {
            ...state,
            userAdded: false,
        };
        default: 
            return state;

    }
}

export default reducer