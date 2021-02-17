import { userProfile } from "./state"

export function logOut(userID: number) {
    return {
      type: 'ADD_TODO',
      payload: userID,
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

  export const userActions = typeof logOut
  || typeof fetchUserInfo
  || typeof fetchUserInfoSuccess
  || typeof fetchUserInfoFail