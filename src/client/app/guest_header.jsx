import React from 'react';
import Modal from 'react-modal';

class GuestHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: false,
            email: '',
            password: '',
        };
        this.openLoginBox = this.openLoginBox.bind(this);
        this.closeLoginBox = this.closeLoginBox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    openLoginBox() {
        this.setState({isLoginOpen: true});
    }

    closeLoginBox() {
        this.setState({isLoginOpen: false});
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
        } else {
            console.log(result.error);
        }
        location.reload();
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
                                Welcome to KT
                            </p>
                        </li>
                        <li className="user-footer">
                            <div className="pull-left">
                                <a href="#" className="btn btn-default btn-flat" onClick={this.openLoginBox}>Sign In</a>
                            </div>
                            <div className="pull-right">
                                <a href="#" className="btn btn-default btn-flat">Sign Up</a>
                            </div>
                        </li>
                    </ul>
                </li>
                <Modal isOpen={this.state.isLoginOpen} onRequestClose={this.closeLoginBox} style={customStyles}>
                    <div className="row">
                        <section className="col-lg-12">
                            <div className="login-box">
                                <div className="login-logo">
                                    <a href="/react/"><b>KT</b></a>
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
