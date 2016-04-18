import React from 'react';
import Pagination from './pagination.jsx';
import Modal from 'react-modal';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.list = [];
        this.state.number = 0;
        this.state.isSetting = false;
        this.state.setUserID = 0;
        this.roleID = 0;
        this.roleIDOrigin = 0;
        this.state.isAllowed = true;
        this.state.user = this.props.user;
        this.state.current = this.props.page;
        this.onPageChange = this.onPageChange.bind(this);

        var result = ajaxGetWithToken('admin/user/list/' + this.state.current);
        if (result.success) {
            this.state.list = result.data.list;
            this.state.number = result.data.number;
            console.log(result.data);
        } else {
            console.log(result.error);
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        result = ajaxGetWithToken('admin/role/list');
        if (result.success) {
            this.state.settingList = result.data;
        } else {
            console.log(result.error);
        }
        this.getSettingList = this.getSettingList.bind(this);
        this.roleChange = this.roleChange.bind(this);
        this.submitModal =this.submitModal.bind(this);
    }

    componentDidMount() {
    }

    openModal(user) {
        var isAllowed = user.id == this.state.user.id ? false : true;
        console.log(isAllowed);
        this.setState({
            isSetting: true,
            setUserID:user.id,
            roleID: user.role_id,
            roleIDOrigin: user.role_id,
            isAllowed: isAllowed
        });
    }

    getSettingList() {
        if (this.state.isAllowed){
            var options = [];
            var list = this.state.settingList;
            for (var i=0; i<list.length; i++) {
                options.push(
                    <div className="radio" key={list[i].id}>
                        <input type="radio" name="role" id={'role_item_' + list[i].id} value={list[i].id} checked={this.state.roleID == list[i].id} onChange={this.roleChange.bind(this, list[i].id)} />
                        <label htmlFor={'role_item_' + list[i].id}>
                            {list[i].name}
                        </label>
                    </div>
                );
            }
            return (
                <form role="form">
                    <div className="form-group">
                        {options}
                    </div>
                </form>
            );
        } else {
            return (
                <b>Your are not allowed to manage your own role!</b>
            );
        }
    }

    roleChange(role_id) {
        this.setState({roleID: role_id});
    }

    closeModal() {
        this.setState({
            isSetting: false,
            roleID:this.state.roleIDOrigin
        });
    }

    submitModal() {
        if (this.state.roleID == this.state.roleIDOrigin) {
            this.setState({isSetting: false});
        } else {
            var data={};
            data.role_id = this.state.roleID;
            var result = ajaxPutWithToken('admin/role/' + this.state.setUserID, data);
            console.log(result);
            if (result.success && result.data.result) {
                this.onPageChange(this.state.current);
            } else {
                this.onPageChange(this.state.current);
            }
        }
    }

    onPageChange(currentPage) {
        this.setState({current:currentPage}, function () {
            var result = ajaxGetWithToken('admin/user/list/' + currentPage);
            if (result.success) {
                this.setState({
                    list:result.data.list,
                    number:result.data.number,
                    isSetting: false
                });
                console.log(result.data);
            } else {
                console.log(result.error);
            }
        });
    }

    getContent() {
        var user_list = this.state.list;
        var avatar = '../../../bower_components/AdminLTE/dist/img/user4-128x128.jpg';
        var user_data = [];
        for (var i=0; i<user_list.length; i++) {
            user_data.push(
                <li key={user_list[i].id}>
                    <div className="item" onClick={this.openModal.bind(this, user_list[i])} name={user_list[i].id}>
                        <img src={avatar} alt="user image" className="online" />
                        <div className="col-xs-4 pull-right">
                            <p className="message">
                                <b>rele:</b>
                                <br/>
                                {user_list[i].role_name}
                            </p>
                        </div>
                        <div className="col-xs-4 pull-right">
                            <p className="message">
                                <b>name:</b>
                                <br/>
                                {user_list[i].name}
                            </p>
                        </div>
                    </div>
                </li>
            );
        }
        return user_data;
    }

    render() {
        return (
            <div className="row">
                <section className="col-lg-12">
                    <div className="box box-primary">
                        <div className="box-header">
                            <i className="ion ion-clipboard"></i>
                            <h3 className="box-title">User List</h3>
                            <div className="box-tools pull-right">
                                <Pagination current={this.state.current} total={this.state.number} callbackParent={this.onPageChange} />
                            </div>
                        </div>
                        <div className="box-body chat">
                            {this.getContent()}
                        </div>
                    </div>
                </section>
                <Modal isOpen={this.state.isSetting} onRequestClose={this.closeModal} style={customStyles}>
                    <div className="modal-header">
                        <i className="fa fa-cog" /> System Info
                    </div>
                    <div className="modal-body">
                        Choose a role for this user:
                        <br />
                        <div className="row">
                            <div className="col-xs-12">
                                {this.getSettingList()}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="col-xs-6">
                            <button className="btn btn-default btn-block btn-flat" onClick={this.closeModal}>Cancel</button>
                        </div>
                        <div className="col-xs-6">
                            <button className="btn btn-danger btn-block btn-flat" onClick={this.submitModal}>Save</button>
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

export default UserList;
