import React from 'react';
import { connect } from 'react-redux';
import { user } from './store/state';
import { fetchUserInfo } from './store/actions';
import './profile.scss';

type userProps = user & { fetchUserInfo: (userId: number) => any };

class Profile extends React.Component<userProps> {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-md-6 profile">
                        <div className="well well-sm">
                            <div className="row">
                                <div className="col-sm-6 col-md-12">
                                    <img src={this.props.userInfo.image} className="img-rounded img-responsive" />
                                </div>
                                <div className="col-sm-6 col-md-12">
                                    <h2>{this.props.userInfo.firstName.toUpperCase()} {this.props.userInfo.lastName.toUpperCase()}</h2>
                                    <h4><i className="glyphicon glyphicon-map-marker iconStyle">
                                    </i>{this.props.userInfo.address}</h4>
                                   
                                        <div className={"iconDiv"}>
                                            <i className="glyphicon glyphicon-envelope iconStyle"></i><h4>{this.props.userInfo.email}</h4>
                                        </div>
                                        <br />
                                        <div className={"iconDiv"}>
                                            <i className="glyphicon glyphicon-phone iconStyle"></i><h4>{this.props.userInfo.phoneNumber}</h4>
                                        </div>
                                        <br />
                                        <div className={"iconDiv"}>
                                            <i className="glyphicon glyphicon-gift iconStyle"></i><h4>{this.props.userInfo.age}</h4>
                                        </div>
                                    <br />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateProps = (state: user) => {
    return {
        userInfo: state.userInfo,
    }
}

export default connect(mapStateProps, null)(Profile);