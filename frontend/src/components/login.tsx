import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from './store/actions';
import { user } from './store/state';
import { Redirect } from 'react-router-dom';
import './login.scss';

type userProps = user & { fetchUserInfo: (userInfo: { email: string, password: string }) => any };

class Login extends Component<userProps> {
    constructor(props: userProps) {
        super(props);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    render() {
        if (this.props.usersStatus === 1) {
            return <Redirect to='/profile' />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 login">
                        <form onSubmit={(e) => this.login(e)}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary submit">Submit</button>
                            <a type="submit" href="/register">Sign Up</a>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    login(e: any) {
        e.preventDefault();
        this.props.fetchUserInfo({
            email: (document.getElementById('exampleInputEmail1') as HTMLInputElement).value,
            password: (document.getElementById('exampleInputPassword1') as HTMLInputElement).value
        });
    }

    signUp(e: any) {
        e.preventDefault();
        return <Redirect to='/register' />
    }
}

const mapStateProps = (state: user) => {
    return {
        usersStatus: state.usersStatus,
    }
}

const mapDispatchToProps = {
    fetchUserInfo
}

export default connect(mapStateProps, mapDispatchToProps)(Login);