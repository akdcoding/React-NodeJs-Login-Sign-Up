import "regenerator-runtime/runtime";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import { userProfile, UserStatus } from './state';

function* fetchUserInfo(action: { type: string, payload: userProfile }) {
    try {
        const request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        let response;
        let data;
        yield fetch('http://localhost:8080/userLogin/'+ action.payload.email + '/' + action.payload.password, request)
            .then((response) => response.json())
            .then((messages) => { response = messages.body.status; data = messages.body.data });
        console.log(data);
        if (response == UserStatus.LoggedIn)
            yield put(actions.fetchUserInfoSuccess(data));
        else if (response == UserStatus.UserNotFound)
            yield put(actions.userNotFound());
        else if (response == UserStatus.WrongPassword)
            yield put(actions.userIncorrectPassword());
    } catch (e) {
        yield put(actions.fetchUserInfoFail());
    }
}

function* addUser(action: { type: string, payload: userProfile }) {
    var bodyFormData = new FormData();
    bodyFormData.append('firstName', action.payload.firstName);
    bodyFormData.append('lastName', action.payload.lastName);
    bodyFormData.append('age', action.payload.age.toString());
    bodyFormData.append('phoneNumber', action.payload.phoneNumber.toString());
    bodyFormData.append('address', action.payload.address);
    bodyFormData.append('email', action.payload.email);
    bodyFormData.append('password', action.payload.password);
    bodyFormData.append('userPic', action.payload.profilePic, action.payload.profilePic.name);

    try {
        const request = {
            method: 'POST',
            body: bodyFormData,
        }
        yield fetch('http://localhost:8080/userSignUp', request)
            .then((response) => response.json())
            .then((messages) => { messages.message; });
            yield put(actions.addUserSuccess());
    } catch (e) {
        yield put(actions.addUserFail());
    }
}


function* userSaga() {
    yield takeLatest("FETCH_USER_INFO", fetchUserInfo);
    yield takeLatest("ADD_USER", addUser);
}

export default userSaga;