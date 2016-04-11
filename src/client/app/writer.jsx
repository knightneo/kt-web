import React from 'react';
import MTitle from './mtitle.jsx';
import Pagination from './pagination.jsx';

class Writer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.list = [];
        this.state.number = 0;
        if (this.props.page == undefined) {
            this.state.current = 1;
        } else {
            this.state.current = this.props.page;
        }
        this.onPageChange = this.onPageChange.bind(this);
        
        var result = ajaxGetWithToken('user/article/'+this.state.current);
        if (result.success) {
            this.state.list = result.data.list;
            this.state.number = result.data.number;
            //console.log(result.data);
        } else {
            console.log(result.error);
        }
        
    }

    componentDidMount() {
        document.location.hash = '#writer?page=' + this.state.current;
    }

    componentDidUpdate() {
        document.location.hash = '#writer?page=' + this.state.current;
        console.log(document.location.hash);
        console.log('writer update');
    }

    onPageChange(currentPage) {
        this.setState({current:currentPage}, function () {
            var result = ajaxGetWithToken('user/article/' + currentPage);
            document.location.hash = '#writer?page=' + this.state.current;
            if (result.success) {
                this.setState({
                    list:result.data.list,
                    number:result.data.number
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
                    <MTitle title={title} from={'writer'} page={this.state.current} total={this.state.number} />
                </li>
            );
        }
        return (
            <div className="row">
                <section className="col-lg-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <i className="ion ion-clipboard"></i>
                            <h3 className="box-title">Writer</h3>
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
