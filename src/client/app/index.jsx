import React from 'react';
import {render} from 'react-dom';
import Header from './header.jsx';
import LeftSide from './left_side.jsx';
import Home from './home.jsx';
import Writer from './writer.jsx';
import Like from './like.jsx';
import Login from './login.jsx';
import Editor from './editor.jsx';
import ArticleReader from './article_reader.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        var token = getTokenFromCookie();
        if (token == '') {
            this.state.isLogin = false;
        } else {
            this.state.isLogin = true;
            this.state.access_token = token;
        }
        this.getContent = this.getContent.bind(this);
    }

    getContent() {
        switch (this.state.url) {
            case '':
                console.log(this.state);
            case 'home':
                console.log('found home');
                var page = 1;
                if (this.state.data.page != undefined) {
                    page = this.state.data.page;
                }
                return (<Home page={page} />);
            case 'like':
                return (<Like />);
            case 'writer':
                var page = 1;
                console.log('found writer');
                if (this.state.data.page != undefined) {
                    page = this.state.data.page;
                }
                return (<Writer page={page} />);
            case 'editor':
                return (<Editor />);
            case 'article':
                var article_id = this.state.data.article;
                var from = this.state.data.from;
                var page = this.state.data.page;
                return (<ArticleReader article={article_id} from={from} page={page}/>);
            default:
                return (<Home />);
        }
    }

    jump(url, data, open_new) {
        var hash = url + '?';
        for (var key in data) {
            hash += (hash == url + '?' ? '' : '&') + key + '=' + data[key];
        }
        if (open_new) {
            window.open('/react/#' + hash);
        } else {
            this.setState({url: url,data: data}, function(){document.location.hash = hash;});
        }
    }

    render() {
        return (
            <div className="hold-trasition skin-blue sidebar-mini">
                <Header isLogin={this.state.isLogin} token={this.state.isLogin? this.state.access_token : ''} />
                <LeftSide />
                <div className="content-wrapper">
                    <section className="content" id="content">
                        {this.getContent()}
                    </section>
                </div>
                <div className="control-sidebar-bg"></div>
            </div>
        );
    }
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
