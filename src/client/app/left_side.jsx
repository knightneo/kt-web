import React from 'react';

class LeftSide extends React.Component {

    constructor(props) {
        super(props);
        this.closeSideBar = this.closeSideBar.bind(this);
    }

    closeSideBar() {
        $('body').removeClass('sidebar-open');
    }

    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li><a className="ajax-link" href="#home" onClick={this.closeSideBar}>home</a></li>
                        <li><a className="ajax-link" href="#writer" onClick={this.closeSideBar}>writer</a></li>
                    </ul>
                </section>
            </aside>

        );
    }
}

export default LeftSide;
