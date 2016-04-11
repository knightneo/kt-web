import React from 'react';
import Title from './title.jsx';
import Pagination from './pagination.jsx';

class Home extends React.Component {

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
        
        var result = ajaxGet('home/article_list/'+this.state.current);
        if (result.success) {
            this.state.list = result.data.list;
            this.state.number = result.data.number;
            //console.log(result.data);
        } else {
            //console.log(result.error);
        }
        
    }

    componentDidMount() {
        document.location.hash = '#home?page=' + this.state.current;
        console.log('home mount');
    }

    componentDidUpdate() {
        document.location.hash = '#home?page=' + this.state.current;
        console.log(document.location.hash);
        console.log('home update');
    }

    onPageChange(currentPage) {
        this.setState({current:currentPage}, function () {
            var result = ajaxGet('home/article_list/' + currentPage);
            document.location.hash = '#home?page=' + this.state.current;
            if (result.success) {
                this.setState({
                    list:result.data.list,
                    number:result.data.number
                });
                console.log(result.data);
            } else {
                //console.log(result.error);
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
                    <Title title={title} from={'home'} page={this.state.current} total={this.state.number} />
                </li>
            );
        }
        return (
            <div className="row">
                <section className="col-lg-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <i className="ion ion-clipboard"></i>
                            <h3 className="box-title">Home</h3>
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

export default Home;
