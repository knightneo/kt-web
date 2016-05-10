import React from 'react';
import Modal from 'react-modal';

class GuestHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: false,
            isRegisterOpen: false,
            isAlertOpen: false,
            alertCloseOpen: '',
            email: '',
            password: '',
            alertMsg: '',
            register_name: '',
            register_email: '',
            register_password: '',
            register_password_retype: '',
        };
        this.openLoginBox = this.openLoginBox.bind(this);
        this.closeLoginBox = this.closeLoginBox.bind(this);
        this.openRegisterBox = this.openRegisterBox.bind(this);
        this.closeRegisterBox = this.closeRegisterBox.bind(this);
        this.openAlertBox = this.openAlertBox.bind(this);
        this.closeAlertBox = this.closeAlertBox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    openLoginBox() {
        this.setState({
            isLoginOpen: true,
            isRegisterOpen: false,
            isAlertOpen:false,
        });
    }

    closeLoginBox() {
        this.setState({
            isLoginOpen: false,
            isRegisterOpen: false,
            isAlertOpen:false,
        });
    }

    openRegisterBox() {
        this.setState({
            isLoginOpen: false,
            isRegisterOpen: true,
            isAlertOpen:false,
        });
    }

    closeRegisterBox() {
        this.setState({
            isLoginOpen: false,
            isRegisterOpen: false,
            isAlertOpen:false,
        });
    }

    openAlertBox(msg) {
        this.setState({
            isLoginOpen: false,
            isRegisterOpen: false,
            isAlertOpen: true,
            alertMsg: msg,
        });
    }

    closeAlertBox() {
        this.setState({
            isLoginOpen: this.state.alertCloseOpen=='login' ? true : false,
            isRegisterOpen: this.state.alertCloseOpen=='register' ? true : false,
            isAlertOpen:false,
            alertMsg: '',
            alertCloseOpen: ''
        });
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState, function() {
            console.log(this.state);
        });
    }

    login() {
        var credentials = {};
        credentials.email = this.state.email;
        credentials.password = this.state.password;
        var result = ajaxPost('signin', credentials);
        if (result.success) {
            storeTokenIntoCookie(result.data.token);
            location.reload();
        } else {
            console.log(result.error);
            this.openAlertBox('Wrong email or password!');
            this.setState({alertCloseOpen: 'login'});
        }
    }

    register() {
        var name = this.state.register_name;
        var email = this.state.register_email;
        var password = this.state.register_password;
        var password_retype = this.state.register_password_retype;
        if (name.length == 0) {
            this.openAlertBox('Name must not be empty!');
            this.setState({alertCloseOpen: 'register'});
        } else if (email.length == 0) {
            this.openAlertBox('Email must not be empty!');
            this.setState({alertCloseOpen: 'register'});
        } else if (password.length == 0) {
            this.openAlertBox('Password must not be empty!');
            this.setState({alertCloseOpen: 'register'});
        } else if (password_retype.length == 0) {
            this.openAlertBox('Password retype must not be empty!');
            this.setState({alertCloseOpen: 'register'});
        } else if (password != password_retype) {
            this.openAlertBox('different password');
            this.setState({alertCloseOpen: 'register'});
        } else {
            var data = {};
            data.email = email;
            data.name = name;
            data.password = password;
            var result = ajaxPost('check/email/available',data);
            if (result.success && result.data.result) {
                var innerResult = ajaxPost('signup',data);
                console.log(innerResult);
                if (innerResult.success && innerResult.data.result) {
                    this.openAlertBox('You have signed up successfully, please sign in!');
                    this.setState({alertCloseOpen: 'login'});
                } else {
                    this.openAlertBox('Register failed, please try again');
                    this.setState({alertCloseOpen: 'register'});
                }
            } else if (result.success && !result.data.result) {
                this.openAlertBox('This email has already been signed up, please try another!');
                this.setState({alertCloseOpen: 'register'});
            } else {
                this.openAlertBox('Register failed, please try again');
                this.setState({alertCloseOpen: 'register'});
                console.log(result.error)
            }
            //location.reload();
        }
    }

    render() {
        return (
            <ul className="nav navbar-nav">
                <li className="dropdown user user-menu">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="fa fa-user" />
                        <span className="hidden-xs">Account</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li className="user-header">
                            <img src="/bower_components/AdminLTE/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />

                            <p>
                                Welcome to {APP_NAME}
                            </p>
                        </li>
                        <li className="user-footer">
                            <div className="pull-left">
                                <a href="#" className="btn btn-default btn-flat" onClick={this.openLoginBox}>Sign In</a>
                            </div>
                            <div className="pull-right">
                                <a href="#" className="btn btn-default btn-flat" onClick={this.openRegisterBox}>Sign Up</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <Modal isOpen={this.state.isLoginOpen} onRequestClose={this.closeLoginBox} style={customStyles}>
                    <div className="row">
                        <section className="col-lg-12">
                            <div className="login-box">
                                <div className="login-logo">
                                    <b>{APP_NAME}</b>
                                </div>
                                <div className="login-box-body">
                                    <p>输入用户名和密码登陆</p>
                                    <div className="form-horizontal">
                                        <div className="form-group has-feedback">
                                            <input name="email" type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                        </div>
                                        <div className="form-group has-feedback">
                                            <input name="password" type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-6">
                                                <button className="btn btn-default btn-block btn-flat" onClick={this.closeLoginBox}>Cancel</button>
                                            </div>
                                            <div className="col-xs-6">
                                                <button type="submit" className="btn btn-success btn-block btn-flat" onClick={this.login}>Sign In</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </Modal>
                <Modal isOpen={this.state.isRegisterOpen} onRequestClose={this.closeRegisterBox} style={customStyles}>
                    <div className="row">
                        <section className="col-lg-12">
                            <div className="register-box">
                                <div className="box-header">
                                    <div className="register-logo">
                                        <b>{APP_NAME}</b>
                                    </div>
                                    <p className="login-box-msg">Sign Up</p>
                                    <div className="form-group has-feedback">
                                        <input name="register_name" type="text" className="form-control" placeholder="name" onChange={this.handleChange} />
                                        <span className="glyphicon glyphicon-user form-control-feedback"></span>
                                    </div>
                                    <div className="form-group has-feedback">
                                        <input name="register_email" type="email" className="form-control" placeholder="Email" onChange={this.handleChange} />
                                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                    </div>
                                    <div className="form-group has-feedback">
                                        <input name="register_password" type="password" className="form-control" placeholder="Password" onChange={this.handleChange} />
                                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                    </div>
                                    <div className="form-group has-feedback">
                                        <input name="register_password_retype" type="password" className="form-control" placeholder="Retype password" onChange={this.handleChange} />
                                        <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
                                    </div>
                                    <div className="form-group has-feedback">
                                        <div className="col-xs-6">
                                            <button className="btn btn-default btn-block btn-flat" onClick={this.closeRegisterBox}>Cancel</button>
                                        </div>
                                        <div className="col-xs-6">
                                            <button type="submit" className="btn btn-success btn-block btn-flat" onClick={this.register}>Sign Up</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
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

export default GuestHeader;
