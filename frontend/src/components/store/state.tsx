export interface userProfile {
    firstName: string,
    lastName: string,
    age: number,
    phoneNumber: number,
    address: string,
    profilePic: any | null,
    userID?: number,
    email: string,
    password: string,
    image?: string | undefined,
}

export enum UserStatus {
    LoggedIn = 1,
    LoggedOut,
    UserNotFound,
    WrongPassword,
  }

export interface user {
    usersStatus: UserStatus,
    ferchUserInfoSuccess: boolean | undefined,
    fetchUserInfoFail: boolean | undefined,
    userInfo: userProfile,
    userAdded?: boolean | undefined,
}

export const initState: user = {
    userInfo: {
        firstName: 'Akshada',
        lastName: 'Thube',
        age: 22,
        phoneNumber: 1234567890,
        address: 'abcdef',
        profilePic: undefined,
        userID: 1,
        email: 'abc@gmail.com',
        password: 'password',
        image: 'http://localhost:8080/uploads/2021-02-14T20-31-16.542Zfreddie.jpg',
    },
    usersStatus: 2,
    ferchUserInfoSuccess: undefined,
    fetchUserInfoFail: undefined,
    userAdded: false,
}