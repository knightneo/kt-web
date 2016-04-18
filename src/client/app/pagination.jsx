import React from 'react';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    prevPage() {
        console.log('prev');
        if (this.props.current > 0){
            this.props.callbackParent(this.props.current - 1);
        }
    }

    nextPage() {
        console.log('next');
        if (this.props.current <= this.props.total) {
            this.props.callbackParent(this.props.current + 1);
        }
    }

    render() {

        if (this.props.total <= 1){
            return (
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" className="btn-info active">1</a></li>
                </ul>
            );
        } else if (this.props.current == 1) {
            return (
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" className="btn-info active">1</a></li>
                    <li><a href="#" onClick={this.nextPage}><i className="fa fa-arrow-right" /></a></li>
                </ul>
            );
        } else if (this.props.current == this.props.total) {
            return (
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" onClick={this.prevPage}><i className="fa fa-arrow-left" /></a></li>
                    <li><a href="#" className="btn-info active">{this.props.current}</a></li>
                </ul>
            );
        } else {
            return (
                <ul className="pagination pagination-sm inline">
                    <li><a href="#" onClick={this.prevPage}><i className="fa fa-arrow-left" /></a></li>
                    <li><a href="#" className="btn-info active">{this.props.current}</a></li>
                    <li><a href="#" onClick={this.nextPage}><i className="fa fa-arrow-right" /></a></li>
                </ul>
            );
        }
    }
}

export default Pagination;
