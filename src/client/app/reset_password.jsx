import React from 'react';
import Modal from 'react-modal';

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.email = '';
        this.state.password = '';
        this.state.isAlertOpen = false;
        this.state.alertMsg = '';
        this.handleChange = this.handleChange.bind(this);
        this.reset = this.reset.bind(this);
        this.submit = this.submit.bind(this);
        this.openAlertBox = this.openAlertBox.bind(this);
        this.closeAlertBox = this.closeAlertBox.bind(this);
    }

    handleChange(e) {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    reset() {
        this.setState({email:'', password:''});
    }

    submit() {
        var data = {};
        data.email = this.state.email;
        data.password = this.state.password;
        console.log(data);
        var result = ajaxPostWithToken('admin/user/reset/password', data);
        if (result.success && result.data.result) {
            this.openAlertBox('You have reset this user\'s password!');
        } else {
            this.openAlertBox('Password reset failed, please retry!');
        }
    }

    openAlertBox(msg) {
        this.setState({
            isAlertOpen: true,
            alertMsg: msg,
        });
    }

    closeAlertBox() {
        this.setState({
            isAlertOpen: false,
            alertMsg: '',
        });
    }

    render() {
        var avatar = '../../../bower_components/AdminLTE/dist/img/user4-128x128.jpg';
        return (
            <div className="row">
                <section className="col-lg-12">
                    <div className="box">
                        <div className="box-header">
                        </div>
                        <div className="box-body pad">
                            <div className="row chat">
                                <div className="item">
                                    <img src={avatar} name='user' alt="user image" className="online" onClick={this.handleClick} />
                                    <p className="message">
                                        <b>{RESET_PASSWORD_PAGE}</b>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form">
                                    <div className="col-xs-12">
                                        <br />
                                        <div className="form-group">
                                            <input name="email" type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input name="password" type="password" className="form-control" placeholder="New Password" value={this.state.password} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <div className="col-xs-6">
                                                <button className="btn btn-default" onClick={this.reset}>
                                                    <i className="fa fa-refresh" />Reset
                                                </button>
                                            </div>
                                            <div className="col-xs-6">
                                                <button className="btn btn-danger pull-right" onClick={this.submit}>
                                                    <i className="fa fa-check" />Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Modal isOpen={this.state.isAlertOpen} onRequestClose={this.closeAlertBox} style={customStyles}>
                    <div className="modal-header">
                        <i className="fa fa-cog" /> {SYSTEM_INFO}
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <b>{this.state.alertMsg}</b>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="col-xs-6 pull-right">
                            <button className="btn btn-danger btn-block btn-flat" onClick={this.closeAlertBox}>OK</button>
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

export default ResetPassword;
