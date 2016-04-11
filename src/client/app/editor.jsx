import React from 'react';

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.article = this.props.article;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        $('.textarea').wysihtml5();
    }

    handleChange() {

    }

    submit() {

    }

    render() {
        return (
            <div className="row">
                <section className="col-lg-12">
                    <div className="box">
                        <div className="box-header">
                        </div>
                        <div className="box-body pad">
                            <div className="row">
                                <div className="col-xs-12">
                                    <input className="form-control" placeholder="title" />
                                </div>
                            </div>
                            <div className="row">
                                <form className="col-xs-12">
                                    <textarea className="textarea" placeholder="Place some text here" style={{'width': '100%', 'height': '200px', 'fontSize': '14px', 'lineHeight': '18px', 'border': '1px solid #dddddd', 'padding': '10px'}}></textarea>
                                </form>
                            </div>
                            <div className="row">
                                <div className="col-xs-6">
                                    <button type="button" className="btn btn-default btn pull-left">
                                        <i className="fa fa-times"></i>Cancel
                                    </button>
                                </div>
                                <div className="col-xs-6">
                                    <button type="button" className="btn btn-success btn pull-right">
                                        <i className="fa fa-check"></i>Save
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
