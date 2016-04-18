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
import UserList from './user_list.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.main = 'home';
        this.state.page = 1;
        this.state.user = {};
        this.state.role = 'reader';
        this.state.permissions = ['read'];
        var token = getTokenFromCookie();
        if (token == '') {
            this.state.isLogin = false;
        } else {
            this.state.isLogin = true;
            this.state.access_token = token;
        }
        this.onMainChange = this.onMainChange.bind(this);
        this.getContent = this.getContent.bind(this);
        this.setProfile = this.setProfile.bind(this);
    }

    componentDidUpdate() {
    }

    setProfile(profile) {
        if (this.state.isLogin) {
            var permissions = [];
            for(var i=0; i<profile.permission.length; i++){
                permissions.push(profile.permission[i].permission_name);
            }
            this.setState({
                user:profile.user,
                role:profile.role.name,
                permissions:permissions
            }, function (){
                console.log(this.state);
            });
        }
    }

    onMainChange(nextPage) {
        console.log(nextPage);
        this.setState(nextPage, function() {
            console.log(this.state);
        });
    }

    getContent() {
        console.log(this.state);
        switch (this.state.main) {
            case '':
                console.log(this.state);
            case 'home':
                return (<Home page={this.state.page} callbackParent={this.onMainChange} />);
            case 'article':
                var article_id = this.state.page;
                var from = this.state.from;
                return (<ArticleReader article={article_id} from={from} callbackParent={this.onMainChange} />);
            case 'writer':
                return (<Writer page={this.state.page} callbackParent={this.onMainChange} />);
            case 'editor':
                var article_id = this.state.page;
                var from = this.state.from;
                return (<Editor page={this.state.page} from={from} callbackParent={this.onMainChange} />);
            case 'user_list':
                return (<UserList page={this.state.page} user = {this.state.user} />);
            default:
                return (<Home page={this.state.page} />);
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="hold-trasition skin-blue sidebar-mini">
                <Header isLogin={this.state.isLogin} token={this.state.isLogin? this.state.access_token : ''} callbackParent={this.setProfile} />
                <LeftSide current={{main:this.state.main}} callbackParent={this.onMainChange} permissions={this.state.permissions} />
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
