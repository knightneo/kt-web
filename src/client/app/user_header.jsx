import React from 'react';
import Modal from 'react-modal';

class UserHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state={};
        this.state.token = this.props.token;
        this.state.isAlertOpen = false;
        this.state.isPasswordOpen = false;
        this.state.alertMsg = '';
        this.state.oldpassword = '';
        this.state.newpassword = '';
        this.state.newpasswordretype = '';
        this.state.alertCloseOpenPassword = false;
        this.logout = this.logout.bind(this);
        this.getProfile = this.getProfile.bind(this);
        var profile = this.getProfile();
        this.state.user = profile.user;
        this.props.callbackParent(profile);
        this.openAlertBox = this.openAlertBox.bind(this);
        this.closeAlertBox = this.closeAlertBox.bind(this);
        this.openPasswordBox = this.openPasswordBox.bind(this);
        this.closePasswordBox = this.closePasswordBox.bind(this);
        this.reset = this.reset.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    openPasswordBox() {
        this.setState({
            isPasswordOpen: true,
            isAlertOpen: false,
        });
    }

    closePasswordBox() {
        this.setState({
            isPasswordOpen: false,
            isAlertOpen: false,
        });
    }

    openAlertBox(msg) {
        this.setState({
            isPasswordOpen: false,
            isAlertOpen: true,
            alertMsg: msg,
        });
    }

    closeAlertBox() {
        this.setState({
            isPasswordOpen: this.state.alertCloseOpenPassword ? true : false,
            isAlertOpen: false,
            alertMsg: '',
        });
    }

    reset() {
        if (this.state.oldpassword.length == 0) {
            this.setState({alertCloseOpenPassword: true});
            this.openAlertBox('Please enter your password!');
        } else if (this.state.newpassword.length == 0) {
            this.setState({alertCloseOpenPassword: true});
            this.openAlertBox('Please enter your new password!');
        } else if (this.state.newpasswordretype.length == 0) {
            this.setState({alertCloseOpenPassword: true});
            this.openAlertBox('Please retype your new password!');
        } else if (this.state.newpassword == this.state.oldpassword) {
            this.setState({alertCloseOpenPassword: true});
            this.openAlertBox('New password must be different from the old one!');
        } else if (this.state.newpassword != this.state.newpasswordretype) {
            this.setState({alertCloseOpenPassword: true});
            this.openAlertBox('Password retype is different from new password!');
        } else {
            var credentials = {};
            credentials.email = this.state.user.email;
            credentials.password = this.state.oldpassword;
            var result = ajaxPost('signin', credentials);
            if (result.success) {
                storeTokenIntoCookie(result.data.token);
                var innerResult = ajaxPostWithToken('reset/password', {password: this.state.newpassword});
                if (innerResult.success && innerResult.data.result) {
                    this.setState({alertCloseOpenPassword: false});
                    this.openAlertBox('You have reset password!');
                } else {
                    this.setState({alertCloseOpenPassword: true});
                    this.openAlertBox('Password reset failed, please retry!');
                }
            } else {
                this.setState({alertCloseOpenPassword: true});
                this.openAlertBox('Wrong Password!');
            }

        }
    }

    logout() {
        deleteTokenFromCookie();
        location.reload();
    }

    getProfile() {
        var result = ajaxGetWithToken('profile');
        if (result.success) {
            console.log(result.data);
            return result.data;
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
                                <a href="#" className="btn btn-default btn-flat" onClick={this.openPasswordBox}>Reset Password</a>
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
                <Modal isOpen={this.state.isPasswordOpen} onRequestClose={this.closePasswordBox} style={customStyles}>
                    <div className="modal-header">
                        <i className="fa fa-cog" /> System Info
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form">
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Password" name="oldpassword" value={this.state.oldpassword} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="New Password" name="newpassword" value={this.state.newpassword} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" placeholder="Retype New Password" name="newpasswordretype" value={this.state.newpasswordretype} onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="col-xs-6">
                            <button className="btn btn-default btn-block btn-flat" onClick={this.closePasswordBox}>Cancel</button>
                        </div>
                        <div className="col-xs-6 pull-right">
                            <button className="btn btn-danger btn-block btn-flat" onClick={this.reset}>Submit</button>
                        </div>
                    </div>
                </Modal>
                <Modal isOpen={this.state.isAlertOpen} onRequestClose={this.closeAlertBox} style={customStyles}>
                    <div className="modal-header">
                        <i className="fa fa-cog" /> System Info
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <b>{this.state.alertMsg}</b>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="col-xs-6 pull-right">
                            <button className="btn btn-danger btn-block btn-flat" onClick={this.closeAlertBox}>OK</button>
                        </div>
                    </div>
                </Modal>
            </ul>
        );
    }
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '30%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'

    }

};

export default UserHeader;
