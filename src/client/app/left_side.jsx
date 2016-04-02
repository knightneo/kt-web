import React from 'react';

class LeftSide extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li><a className="ajax-link" href="#home">home</a></li>
                        <li><a className="ajax-link" href="#like">like</a></li>
                    </ul>
                </section>
            </aside>

        );
    }
}

export default LeftSide;
