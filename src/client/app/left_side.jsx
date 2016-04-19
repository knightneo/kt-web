import React from 'react';

class LeftSide extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.current = this.props.current;
        this.onMainChange = this.onMainChange.bind(this);
    }

    onMainChange(e) {
        var nextPage = {};
        nextPage.main = 'home';
        nextPage.page = 1;
        switch (e.target.name) {
            case 'home':
                nextPage.main = 'home';
                break;
            case 'writer':
                nextPage.main = 'writer';
                break;
            case 'user_list':
                nextPage.main = 'user_list';
                break;
            case 'reset_password':
                nextPage.main = 'reset_password';
                break;
            default:
                nextPage.main = 'home';
        }
        this.setState({current: nextPage}, function () {
            this.props.callbackParent(this.state.current);
        });
        $('body').removeClass('sidebar-open');
    }

    render() {
        var permissions = this.props.permissions;
        var items = [];
        for (var i=0; i<permissions.length; i++) {
            switch (permissions[i]) {
                case 'read' :
                    items.push(
                        <li key={i}><a name="read" className="ajax-link" onClick={this.onMainChange}>Home</a></li>
                    );
                    break;
                case 'write' :
                    items.push(
                        <li key={i}><a name="writer" className="ajax-link" onClick={this.onMainChange}>My Article</a></li>
                    );
                    break;
                case 'user' :
                    items.push(
                        <li key={i}><a name="user_list" className="ajax-link" onClick={this.onMainChange}>User List</a></li>
                    );
                    break;
                case 'password' :
                    items.push(
                        <li key={i}><a name="reset_password" className="ajax-link" onClick={this.onMainChange}>Reset Password</a></li>
                    );
                    break;
                default:
            }
        }
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        {items}
                    </ul>
                </section>
            </aside>

        );
    }
}

export default LeftSide;
