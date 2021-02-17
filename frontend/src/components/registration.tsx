import React, { Component } from 'react';
import { connect } from 'react-redux';
import { user, userProfile } from './store/state';
import { Redirect } from 'react-router-dom';
import { addUser } from './store/actions';

type userProps = user & { addUser: (userInfo: userProfile) => any };

class Register extends Component<userProps> {
    constructor(props: userProps) {
        super(props);
        this.addUser = this.addUser.bind(this);
    }

    render() {
        if (this.props.userAdded === true) {
            return <Redirect to='/login' />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 login">
                        <form onSubmit={(e) => this.addUser(e)}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" className="form-control" id="lastname" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" className="form-control" id="age" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="number" className="form-control" id="phonenumber" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" id="address" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Profile Picture</label>
                                <input type="file" className="form-control" id="profilepic" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    addUser(e: any) {
        e.preventDefault();
        this.props.addUser({
            firstName: (document.getElementById('firstname') as HTMLInputElement).value,
            lastName: (document.getElementById('lastname') as HTMLInputElement).value,
            age: Number((document.getElementById('age') as HTMLInputElement).value),
            phoneNumber: Number((document.getElementById('phonenumber') as HTMLInputElement).value),
            address: (document.getElementById('address') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,

            // We should ecnrypt the password in real world scenario
            password: (document.getElementById('password') as HTMLInputElement).value,

            profilePic: (document.getElementById('profilepic') as HTMLInputElement).files![0],
        });
    }
}

const mapStateProps = (state: user) => {
    return {
        usersStatus: state.usersStatus,
    }
}

const mapDispatchToProps = {
    addUser
}

export default connect(mapStateProps, mapDispatchToProps)(Register);