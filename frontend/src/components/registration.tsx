import React, { Component } from 'react';
import { connect } from 'react-redux';
import { user, userProfile } from './store/state';
import { Redirect } from 'react-router-dom';
import { addUser, updateUser } from './store/actions';
import './registration.scss';

type userProps = user & { addUser: (userInfo: userProfile) => any } & { updateUser: (userInfo: userProfile) => any };

class Register extends Component<userProps> {
    constructor(props: userProps) {
        super(props);
        this.userAction = this.userAction.bind(this);
    }

    render() {
        if (this.props.userAdded === true) {
            return <Redirect to='/login' />
        }

        if (this.props.userUpdateSuccess) {
            return <Redirect to='/profile' />
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 login">
                        <form onSubmit={(e) => this.userAction(e)}>
                            <div className="form-group">
                                <label className="required">First Name</label>
                                <input type="text" className="form-control" id="firstname" placeholder="Enter your first name" defaultValue={this.props.isUpdate ? this.props.userInfo.firstName : ""} required/>
                            </div>
                            <div className="form-group">
                                <label className="required">Last Name</label>
                                <input type="text" className="form-control" id="lastname" placeholder="Enter your last name" defaultValue={this.props.isUpdate ? this.props.userInfo.lastName : ""} required />
                            </div>
                            <div className="form-group">
                                <label className="required">Age</label>
                                <input type="number" className="form-control" id="age" placeholder="Enter your age" defaultValue={this.props.isUpdate ? this.props.userInfo.age : ""} required/>
                            </div>
                            <div className="form-group">
                                <label className="required">Phone Number</label>
                                <input type="number" className="form-control" id="phonenumber" placeholder="Enter your contact number" defaultValue={this.props.isUpdate ? this.props.userInfo.phoneNumber : ""} required/>
                            </div>
                            <div className="form-group">
                                <label className="required">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="Enter your address" defaultValue={this.props.isUpdate ? this.props.userInfo.address : ""} required/>
                            </div>
                            <div className="form-group">
                                <label className="required">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="abc@example.com" defaultValue={this.props.isUpdate ? this.props.userInfo.email : ""} required/>
                            </div>
                            <div className="form-group">
                                <label className="required">Profile Picture</label>
                                <input type="file" className="form-control" id="profilepic" placeholder="Enter your image" defaultValue={this.props.isUpdate ? this.props.userInfo.profilePic : ""} required/>
                            </div>
                            <div className="form-group">
                                <label className="required">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter Password" defaultValue={this.props.isUpdate ? this.props.userInfo.password : ""} required/>
                            </div>
                            <button type="submit" className="btn btn-primary">{this.props.isUpdate ? 'Save' : 'Submit'}</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    userAction(e: any) {
        e.preventDefault();
        let userInfo: userProfile =
            {
                firstName: (document.getElementById('firstname') as HTMLInputElement).value,
                lastName: (document.getElementById('lastname') as HTMLInputElement).value,
                age: Number((document.getElementById('age') as HTMLInputElement).value),
                phoneNumber: Number((document.getElementById('phonenumber') as HTMLInputElement).value),
                address: (document.getElementById('address') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
    
                // We should ecnrypt the password in real world scenario
                password: (document.getElementById('password') as HTMLInputElement).value,
    
                profilePic: (document.getElementById('profilepic') as HTMLInputElement).files![0],
            }

            console.log(userInfo)

            if(!this.props.isUpdate) {
                this.props.addUser(userInfo);
            } else {
                userInfo.userID = this.props.userInfo.userID,
                this.props.updateUser(userInfo);
            }
    }
}

const mapStateProps = (state: user) => {
    return {
        usersStatus: state.usersStatus,
        userAdded: state.userAdded,
        userInfo: state.userInfo,
        isUpdate: state.isUpdate,
        userUpdateSuccess: state.userUpdateSuccess,
    }
}

const mapDispatchToProps = {
    addUser,
    updateUser,
}

export default connect(mapStateProps, mapDispatchToProps)(Register);