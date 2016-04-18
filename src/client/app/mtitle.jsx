import React from 'react';
import Modal from 'react-modal';

class MTitle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.isDeleting = false;
        this.state.isDeleted = false;
        this.editArticle = this.editArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.openDeleteBox = this.openDeleteBox.bind(this);
        this.closeDeleteBox = this.closeDeleteBox.bind(this);
        this.openCallbackDeleteBox = this.openCallbackDeleteBox.bind(this);
        this.closeCallbackDeleteBox = this.closeCallbackDeleteBox.bind(this);
    }

    editArticle() {
        this.props.callbackParentEdit(this.props.title.id)
    }

    deleteArticle() {
        this.closeDeleteBox();
        var result = ajaxGetWithToken('article/' + this.props.title.id + '/delete');
        console.log(result);
        if (result.success) {
            this.openCallbackDeleteBox();
        } else {
            console.log(result.error);
            this.closeDeleteBox();
        }
    }

    openDeleteBox() {
        this.setState({isDeleting: true});
    }

    closeDeleteBox() {
        this.setState({isDeleting: false});
    }

    openCallbackDeleteBox() {
        this.setState({isDeleted: true});
    }

    closeCallbackDeleteBox() {
        this.setState({isDeleted: false});
        this.props.callbackParentDelete();
    }

    render() {
        var title = this.props.title;
        var date = new Date(title.created_at * 1000);
        var dateString = date.toString();
        var bg = title.is_published ? 'success' : 'default';
        return (
            <div className="item">
                <div className="col-xs-10" name="article" onClick={this.editArticle}>
                    <p className="message">
                        <small className="text-muted pull-right">{dateString}</small>
                        <br />
                        <b>{this.props.title.title}</b>
                    </p>
                </div>
                <div className="col-xs-2">
                    <button className="btn pull-right" name="delete_button" onClick={this.openDeleteBox}>
                        <i className="fa fa-trash" />
                    </button>
                </div>
                <Modal isOpen={this.state.isDeleting} onRequestClose={this.closeDeleteBox} style={customStyles}>
                    <div className="modal-header">
                        <i className="fa fa-cog" /> System Info
                    </div>
                    <div className="modal-body">
                        Are you sure to delete<br />
                        <b>{this.props.title.title} ?</b>
                    </div>
                    <div className="modal-footer">
                        <div className="col-xs-6">
                            <button className="btn btn-default btn-block btn-flat" onClick={this.closeDeleteBox}>No</button>
                        </div>
                        <div className="col-xs-6">
                            <button className="btn btn-danger btn-block btn-flat" onClick={this.deleteArticle}>Yes</button>
                        </div>
                    </div>
                </Modal>
                <Modal isOpen={this.state.isDeleted} onRequestClose={this.closeCallbackDeleteBox} style={customStyles}>
                    <div className="modal-header">
                        <i className="fa fa-cog" /> System Info
                    </div>
                    <div className="modal-body">
                        <b>{this.props.title.title}</b> is successfully deleted!
                    </div>
                    <div className="modal-footer">
                        <div className="col-xs-6 pull-right">
                            <button className="btn btn-danger btn-block btn-flat" onClick={this.closeCallbackDeleteBox}>Yes</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '30%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'

    }

};

export default MTitle;
