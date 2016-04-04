import React from 'react';
import {render} from 'react-dom';
import Header from './header.jsx';
import LeftSide from './left_side.jsx';
import Home from './home.jsx';
import Like from './like.jsx';
import Login from './login.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getContent = this.getContent.bind(this);
    };

    getContent() {
        switch (this.state.url) {
            case 'home':
                return (<Home />);
            case 'like':
                return (<Like />);
            case 'login':
                return (<Login />);
            default:
                return (<Home />);
        }
    };

    jump(url, data, open_new) {
        var hash = url + '?';
        for (var key in data) {
            hash += (hash == url + '?' ? '' : '&') + key + '=' + data[key];
        }
        if (open_new) {
            window.open('/react/#' + hash);
        } else {
            this.setState({url: url,data: data}, function(){location.hash = hash;});
        }
    };

    render() {
        return (
            <div className="hold-trasition skin-blue sidebar-mini">
                <Header isLogin={false} />
                <LeftSide />
                <div className="content-wrapper">
                    <section className="content" id="content">
                        {this.getContent()}
                    </section>
                </div>
                <div className="control-sidebar-bg"></div>
            </div>
        );
    };
}

var AppDom = render(<App/>, document.getElementById('app'));


window.addEventListener('hashchange', function (e) {
    if (AppDom.state.url != location.hash.substr(1).split('?')[0]) {
        var url = location.hash.split('?')[0].substring(1);
        var params = location.hash.split('?')[1] ? location.hash.split('?')[1].split('&') : null;
        var data = {};
        for (var i in params) {
            data[params[i].split('=')[0]] = params[i].split('=')[1];
        }
        AppDom.setState({
            url: url,
            data: data
        })

    }
}.bind(this));
