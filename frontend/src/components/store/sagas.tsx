import "regenerator-runtime/runtime";
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'
import { userProfile, UserStatus } from './state';
import { createFormData } from "./sagaHelper";

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
    var bodyFormData = createFormData(action.payload);

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

function* updateUser(action: { type: string, payload: userProfile }) {
    var bodyFormData = createFormData(action.payload);
    let data;

    try {
        const request = {
            method: 'POST',
            body: bodyFormData,
        }
        yield fetch('http://localhost:8080/updateUser', request)
            .then((response) => response.json())
            .then((messages) => { messages.message; data = messages.data});
            yield put(actions.updateUserSuccess(data));
    } catch (e) {
        console.log(e);
        yield put(actions.updateUserFail());
    }
}


function* userSaga() {
    yield takeLatest("FETCH_USER_INFO", fetchUserInfo);
    yield takeLatest("ADD_USER", addUser);
    yield takeLatest("UPDATE_USER", updateUser);
}

export default userSaga;