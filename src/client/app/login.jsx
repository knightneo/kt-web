import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                                    <input type="email" className="form-control" placeholder="Email"/>
                                    <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="password" className="form-control" placeholder="Password"/>
                                    <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                                </div>
                                <div className="row">
                                    <div className="col-xs-8">
                                        <div className="checkbox icheck">
                                            <label>
                                                <input type="checkbox"/> Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xs-4">
                                        <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;
