import React from 'react';

class GuestHeader extends React.Component {

    constructor(props) {
        super(props);
    };

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
                                <a href="#" className="btn btn-default btn-flat">Sign In</a>
                            </div>
                            <div className="pull-right">
                                <a href="#" className="btn btn-default btn-flat">Sign Up</a>
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

export default GuestHeader;
