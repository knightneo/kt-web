import React from 'react';
import MTitle from './mtitle.jsx';
import Pagination from './pagination.jsx';

class Writer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.list = [];
        this.state.number = 0;
        this.state.current = this.props.page;
        this.onPageChange = this.onPageChange.bind(this);
        this.callbackEditArticle = this.callbackEditArticle.bind(this);
        this.callbackDeleteArticle = this.callbackDeleteArticle.bind(this);
        this.callbackCreateArticle = this.callbackCreateArticle.bind(this);
        
        var result = ajaxGetWithToken('user/article/'+this.state.current);
        if (result.success) {
            this.state.list = result.data.list;
            this.state.number = result.data.number;
            if (this.state.current > result.data.number) {
                this.state.current = result.data.number;
            }
            //console.log(result.data);
        } else {
            console.log(result.error);
        }
        
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    callbackCreateArticle() {
        var nextPage = {};
        nextPage.main = 'editor';
        nextPage.page = 0;
        nextPage.from = {};
        nextPage.from.main = 'writer';
        nextPage.from.page = this.state.current;
        this.props.callbackParent(nextPage);
    }

    callbackEditArticle(article_id) {
        var nextPage = {};
        nextPage.main = 'editor';
        nextPage.page = article_id;
        nextPage.from = {};
        nextPage.from.main = 'writer';
        nextPage.from.page = this.state.current;
        this.props.callbackParent(nextPage);
    }

    callbackDeleteArticle() {
        this.onPageChange(this.state.current);
    }

    onPageChange(currentPage) {
        if (currentPage > this.state.number) {
            currentPage = this.state.number;
        }
        this.setState({current:currentPage}, function () {
            var result = ajaxGetWithToken('user/article/' + currentPage);
            if (result.success) {
                this.setState({
                    list:result.data.list,
                    number:result.data.number
                }, function () {
                    if (this.state.current > this.state.number) {
                        this.onPageChange(this.state.number);
                    }
                });
                console.log(result.data);
            } else {
                console.log(result.error);
            }
        });
    }

    render() {
        var list = this.state.list;
        var returnArr = [];
        for (var i=0; i<list.length; i++) {
            var title = list[i];
            title.avatar = '../../../bower_components/AdminLTE/dist/img/user4-128x128.jpg';
            returnArr.push(
                <li key={title.id}>
                    <MTitle title={title} from={'writer'} page={this.state.current} total={this.state.number} callbackParentEdit={this.callbackEditArticle} callbackParentDelete={this.callbackDeleteArticle} />
                </li>
            );
        }
        return (
            <div className="row">
                <section className="col-lg-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <div className="pull-left">
                                <button className="btn btn-sm btn-success pull-left" onClick={this.callbackCreateArticle}><i className="fa fa-plus" /></button>
                            </div>
                            <div className="box-tools pull-right">
                                <Pagination current={this.state.current} total={this.state.number} callbackParent={this.onPageChange} />
                            </div>
                        </div>
                        {
                            <div className="box-body chat">
                                {returnArr}
                            </div>
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default Writer;
