import React from 'react';
import GuestHeader from './guest_header.jsx';
import UserHeader from './user_header.jsx';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.userInfo = this.userInfo.bind(this);
    };

    userInfo() {
        if (this.props.isLogin) {
            return (
                <UserHeader />
            );
        }else {
            return (
                <GuestHeader />
            );
        }
    };
    
    render() {
        return (
            <header className="main-header">
                <a href="/bower_components/index2.html" className="logo">
                    <span className="logo-mini"><b>KT</b></span>
                    <span className="logo-lg"><b>KT</b></span>
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
