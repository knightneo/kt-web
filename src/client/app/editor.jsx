import React from 'react';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.id = this.props.page;
        this.handleChange = this.handleChange.bind(this);
        this.back = this.back.bind(this);
        this.submit = this.submit.bind(this);

        if (this.state == 1) {
            this.state.title = '';
            this.state.content = '';
        } else {
            var result = ajaxGet('article/' + this.state.id);
            if (result.success) {
                this.state.title = result.data.title;
                this.state.content = result.data.content;
            } else {
                console.log(result.error);
            }
        }
    }

    componentDidMount() {
        $('.textarea').wysihtml5();
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState, function () {
            console.log(this.state);
        });
    }

    back() {
        var nextPage = {}
        nextPage.main = this.props.from.main;
        nextPage.page = this.props.from.page;
        nextPage.from = {};
        nextPage.from.main = 'editor';
        nextPage.from.page = this.props.page;
        this.props.callbackParent(nextPage);
    }

    submit() {
        var title = this.state.title;
        var content = $('.textarea').val();
        var data = {};
        data.title = title;
        data.content = content;
        if (this.state.id == 0) {
            var result = ajaxPostWithToken('article', data);
            if (result.success) {
                this.back();
            } else {
                console.log(result.error);
            }
        } else {
            var result = ajaxPutWithToken('article/' + this.state.id, data);
            if (result.success) {
                this.back();
            } else {
                console.log(result.error);
            }
        }
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
                                    <input className="form-control" placeholder="title" name="title" value={this.state.title} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <form className="col-xs-12">
                                    <textarea name="content" className="textarea" placeholder="Place some text here" style={{'width': '100%', 'height': '200px', 'fontSize': '14px', 'lineHeight': '18px', 'border': '1px solid #dddddd', 'padding': '10px'}} value={this.state.content} onChange={this.handleChange}></textarea>
                                </form>
                            </div>
                            <div className="row">
                                <div className="col-xs-6">
                                    <button type="button" className="btn btn-default btn pull-left" onClick={this.back}>
                                        <i className="fa fa-times"></i>Cancel
                                    </button>
                                </div>
                                <div className="col-xs-6">
                                    <button type="button" className="btn btn-success btn pull-right" onClick={this.submit}>
                                        <i className="fa fa-check"></i>Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Editor;
