import React from 'react';
import Title from './title.jsx';

class Like extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var tmp_data = {};
        tmp_data.avatar = '../../../bower_components/AdminLTE/dist/img/user4-128x128.jpg';
        tmp_data.username = 'knightneo';
        tmp_data.title = 'Title';
        tmp_data.article = 'this is the beginning of the article...';
        return (
            <div className="row">
                <section className="col-lg-12 connectedSortable">
                    <div className="box box-primary">
                        <div className="box-header">
                            <i className="ion ion-clipboard"></i>
                            <h3 className="box-title">Like</h3>
                            <div className="box-tools pull-right">
                                <ul className="pagination pagination-sm inline">
                                    <li><a href="#">&laquo;</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">&raquo;</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="box-body chat">
                            <li>
                                <Title title={tmp_data}/>
                            </li>
                            <li>
                                <Title title={tmp_data}/>
                            </li>
                            <li>
                                <Title title={tmp_data}/>
                            </li>
                            <li>
                                <Title title={tmp_data}/>
                            </li>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Like;
