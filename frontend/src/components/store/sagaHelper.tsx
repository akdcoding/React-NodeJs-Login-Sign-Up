import { userProfile } from "./state";

export function createFormData(data: userProfile) {
    var bodyFormData = new FormData();
    bodyFormData.append('firstName', data.firstName);
    bodyFormData.append('lastName', data.lastName);
    bodyFormData.append('age', data.age.toString());
    bodyFormData.append('phoneNumber', data.phoneNumber.toString());
    bodyFormData.append('address', data.address);
    bodyFormData.append('email', data.email);
    bodyFormData.append('password', data.password);
    bodyFormData.append('userPic', data.profilePic, data.profilePic.name);
    bodyFormData.append('userID', data.userID ? data.userID.toString() : '');

    return bodyFormData;
}