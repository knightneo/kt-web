import React from 'react';

class Title extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        var title = this.props.title;
        return (
            <div className="item">
                <img src={this.props.title.avatar} alt="user image" className="online" />
                <p className="message">
                    <a href="#" className="name">
                        <small className="text-muted pull-right"><i className="fa fa-clock-o"></i> 2:15</small>
                        {this.props.title.username}
                    </a>
                    <b>{this.props.title.title}</b>
                    <br />
                    {this.props.title.article}
                </p>
            </div>
        );
    }
}

export default Title;
