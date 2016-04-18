import React from 'react';

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.target.name == 'user') {
            console.log('user');
        } else {
            this.props.callbackParent(this.props.title.id);
            console.log('article');
        }
    }

    render() {
        var title = this.props.title;
        var date = new Date(title.created_at * 1000);
        var dateString = date.toString();
        return (
            <div className="item" onClick={this.handleClick}>
                <img src={this.props.title.avatar} name='user' alt="user image" className="online" onClick={this.handleClick} />
                <p className="message">
                    <a href="#" className="name">
                        <small className="text-muted pull-right">{dateString}</small>
                        {this.props.title.username}
                    </a>
                    <b>{this.props.title.title}</b>
                </p>
            </div>
        );
    }
}

export default Title;
