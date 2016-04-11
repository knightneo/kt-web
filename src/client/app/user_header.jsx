import React from 'react';

class UserHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
        this.state.token = this.props.token;
        this.logout = this.logout.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.state.user = this.getProfile();
    }

    logout() {
        deleteTokenFromCookie();
        location.reload();
    }

    getProfile() {
        var result = ajaxGetWithToken('profile');
        if (result.success) {
            console.log(result.data);
            return result.data.user;
        } else {
            console.log(result.error);
            deleteTokenFromCookie();
        }
    }

    render() {
        return (
            <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <img src="/bower_components/AdminLTE/dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                        <span className="hidden-xs">{this.state.user.name}</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li className="user-header">
                            <img src="/bower_components/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />

                            <p>
                                {this.state.user.name}
                                <small>{this.state.user.email}</small>
                            </p>
                        </li>
                        <li className="user-footer">
                            <div className="pull-left">
                                <a href="#" className="btn btn-default btn-flat">Profile</a>
                            </div>
                            <div className="pull-right">
                                <a href="#" className="btn btn-default btn-flat" onClick={this.logout}>Sign out</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <li className="hidden">
                    <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                </li>
            </ul>
        );
    }
}

export default UserHeader;
