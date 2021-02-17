import { userProfile } from "./state"

export function logOut() {
    return {
      type: 'LOG_OUT',
    }
  }

  export function fetchUserInfo(userInfo: { email: string, password: string }) {
    return {
      type: 'FETCH_USER_INFO',
      payload: userInfo,
    }
  }

  export function fetchUserInfoSuccess(data: userProfile | undefined) {
    return {
      type: 'FETCH_USER_INFO_SUCCESS',
      payload: data,
    }
  }

  export function fetchUserInfoFail() {
    return {
      type: 'FETCH_USER_INFO_FAIL',
    }
  }



  export function userNotFound() {
    return {
      type: 'USER_NOT_FOUND',
    }
  }

  export function userIncorrectPassword() {
    return {
      type: 'USER_INCORRECT_PASWORD',
    }
  }

  export function addUser(userInfo: userProfile) {
    return {
      type: 'ADD_USER',
      payload: userInfo,
    }
  }

  export function addUserSuccess() {
    return {
      type: 'ADD_USER_SUCCESS',
    }
  }

  export function addUserFail() {
    return {
      type: 'ADD_USER_FAIL',
    }
  }

  export function updateUser(userInfo: userProfile) {
    return {
      type: 'UPDATE_USER',
      payload: userInfo,
    }
  }

  export function updateUserSuccess(userInfo: userProfile | undefined) {
    return {
      type: 'UPDATE_USER_SUCCESS',
      payload: userInfo,
    }
  }

  export function updateUserFail() {
    return {
      type: 'UPDATE_USER_FAIL',
    }
  }

  export function editUser() {
    return {
      type: 'EDIT_USER',
    }
  }
