import React from 'react';
import GuestHeader from './guest_header.jsx';
import UserHeader from './user_header.jsx';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.userInfo = this.userInfo.bind(this);
        this.callbackParent = this.callbackParent.bind(this);
    }

    callbackParent(profile) {
        this.props.callbackParent(profile);
    }

    userInfo() {
        if (this.props.isLogin) {
            return (
                <UserHeader token={this.props.token} callbackParent={this.callbackParent} />
            );
        }else {
            return (
                <GuestHeader />
            );
        }
    }
    
    render() {
        return (
            <header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>{APP_NAME}</b></span>
                    <span className="logo-lg"><b>{APP_NAME}</b></span>
                </a>
                <nav className="navbar navbar-static-top" role="navigation">
                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <div className="navbar-custom-menu">
                        {this.userInfo()}
                    </div>
                </nav>
            </header>
        );
    }
};

export default Header;
