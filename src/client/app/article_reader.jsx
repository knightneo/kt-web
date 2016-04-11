import React from 'react';

class ArticleReader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        var article_id = this.props.article;
        var result = ajaxGet('article/' + article_id);
        if (result.success) {
            this.setState({title:result.data.title, content:result.data.content, username:result.data.username});
        }
    }

    handleChange() {

    }

    back() {
        var newHash='#' + this.props.from + '?page=' + this.props.page;
        console.log(newHash);
        document.location.hash = newHash;
    }

    render() {
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
                            <div className="row">
                                <div className="col-xs-12">
                                    <input className="form-control" value={this.state.title} onChange={this.handleChange} placeholder="title" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <label className="control-label">{this.state.username}</label>
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
