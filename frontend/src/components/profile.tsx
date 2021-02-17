import React from 'react';
import { connect } from 'react-redux';
import { user, UserStatus } from './store/state';
import { editUser, logOut } from './store/actions';
import './profile.scss';
import { Redirect } from 'react-router-dom';

type userProps = user & { editUser: () => any } & { logOut: () => any };

class Profile extends React.Component<userProps> {
    constructor(props: userProps) {
        super(props);
        this.edit = this.edit.bind(this);
        this.logOut = this.logOut.bind(this);
    }



    render() {
        if (this.props.isUpdate === true) {
            return <Redirect to='/register' />
        }
        if (this.props.usersStatus!== UserStatus.LoggedIn) {
            return <Redirect to='/login' />
        }
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-6 col-md-12">
                <input type="button" className="btn btn-primary logOut" onClick={this.logOut} value="Log Out" />
                </div></div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 profile">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-12">
                                    <img src={this.props.userInfo?.image ? this.props.userInfo?.image : ''} className="img-rounded img-responsive userImage" />
                                </div>
                                <div className="col-sm-6 col-md-12">
                                    <h2>{this.props.userInfo?.firstName.toUpperCase()} {this.props.userInfo?.lastName.toUpperCase()}</h2>
                                    <h4><i className="glyphicon glyphicon-map-marker iconStyle">
                                    </i>{this.props.userInfo?.address}</h4>
                                   
                                        <div className={"iconDiv"}>
                                            <i className="glyphicon glyphicon-envelope iconStyle"></i><h4>{this.props.userInfo?.email}</h4>
                                        </div>
                                        <br />
                                        <div className={"iconDiv"}>
                                            <i className="glyphicon glyphicon-phone iconStyle"></i><h4>{this.props.userInfo?.phoneNumber}</h4>
                                        </div>
                                        <br />
                                        <div className={"iconDiv"}>
                                            <i className="glyphicon glyphicon-gift iconStyle"></i><h4>{this.props.userInfo?.age}</h4>
                                        </div>
                                    <br />

                                </div>
                                <div className="col-sm-6 col-md-12">
                                    <input type="button" className="btn btn-primary" onClick={this.edit} value="Edit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    edit(e: any) {
        e.preventDefault();
        this.props.editUser();
    }

    logOut(e: any) {
        e.preventDefault();
        this.props.logOut();
    }
}

const mapStateProps = (state: user) => {
    return {
        userInfo: state.userInfo,
        isUpdate: state.isUpdate,
        usersStatus: state.usersStatus,
    }
}

const mapDispatchToProps = {
    editUser,
    logOut
}

export default connect(mapStateProps, mapDispatchToProps)(Profile);