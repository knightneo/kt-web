import React from 'react';

class ArticleReader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        console.log('found article');
        var article_id = this.props.article;
        var result = ajaxGet('article/' + article_id);
        if (result.success) {
            this.setState({title:result.data.title, content:result.data.content, username:result.data.username, created_at:result.data.created_at});
        }
        $('.textarea').wysihtml5({
            toolbar : false,
            events : {
                'load' : function () {
                    console.log('wysihtml5 loaded');
                    $('.wysihtml5-sandbox').contents().find('body').attr('contenteditable',false);
                }
            }
        });
        var editor = $('.textarea').data('wysihtml5').editor;
        editor.composer.disable();
    }

    componentDidUpdate() {
        //$('.wysihtml5-toolbar').hide();        
        console.log('article updated');
    }

    handleChange() {

    }

    handleClick() {
        
    }

    back() {
        var nextPage = {}
        nextPage.main = this.props.from.main;
        nextPage.page = this.props.from.page;
        nextPage.from = {};
        nextPage.from.main = 'article';
        nextPage.from.page = this.props.page;
        this.props.callbackParent(nextPage);
    }

    render() {
        var date = new Date(this.state.created_at * 1000);
        var dateString = date.toString();
        var avatar = '../../../bower_components/AdminLTE/dist/img/user4-128x128.jpg';
        return (
            <div className="row">
                <section className="col-lg-12">
                    <div className="box">
                        <div className="box-header">
                            <div className="row">
                                <div className="col-xs-6">
                                    <button type="button" className="btn btn-success btn pull-left" onClick={this.back}>
                                        <i className="fa fa-arrow-left"></i>Back
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="box-body pad">
                            <div className="row chat">
                                <div className="item">
                                    <img src={avatar} name='user' alt="user image" className="online" onClick={this.handleClick} />
                                    <p className="message">
                                        <a href="#" className="name">
                                            <small className="text-muted pull-right">{dateString}</small>
                                            {this.state.username}
                                        </a>
                                        <b>{this.state.title}</b>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <form className="col-xs-12">
                                    <textarea className="textarea readonly" placeholder="Place some text here" style={{'width': '100%', 'height': '300px', 'fontSize': '14px', 'lineHeight': '18px', 'border': '1px solid #dddddd', 'padding': '10px'}} value={this.state.content} onChange={this.handleChange}></textarea>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ArticleReader;
