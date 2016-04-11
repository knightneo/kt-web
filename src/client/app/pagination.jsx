import React from 'react';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.total = parseInt(this.props.total);
        this.state.current = parseInt(this.props.current);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    prevPage() {
        console.log('prev');
        console.log(this.state);
        if (this.state.current > 0){
            this.setState({current:this.state.current-1}, function(){
                //console.log(this.state);
                this.props.callbackParent(this.state.current);
            });
        }
    }

    nextPage() {
        console.log('next');
        console.log(this.state);
        if (this.state.current <= this.state.total) {
            this.setState({current:this.state.current+1}, function(){
                //console.log(this.state);
                this.props.callbackParent(this.state.current);
            });
        }
    }

    render() {
        if (this.state.total == 1){
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" className="btn-info active">1</a></li>
                </ul>
        } else if (this.state.current == 1) {
            return (
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" className="btn-info active">1</a></li>
                    <li><a href="#" onClick={this.nextPage}><i className="fa fa-arrow-right" /></a></li>
                </ul>
            );
        } else if (this.state.current == this.state.total) {
            return (
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" onClick={this.prevPage}><i className="fa fa-arrow-left" /></a></li>
                    <li><a href="#" className="btn-info active">{this.state.current}</a></li>
                </ul>
            );
        } else {
            return (
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" onClick={this.prevPage}><i className="fa fa-arrow-left" /></a></li>
                    <li><a href="#" className="btn-info active">{this.state.current}</a></li>
                    <li><a href="#" onClick={this.nextPage}><i className="fa fa-arrow-right" /></a></li>
                </ul>
            );
        }
    }
}

export default Pagination;
