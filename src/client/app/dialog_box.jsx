import React from 'react';
import Modal from 'react-modal';

/*
 * By default the modal is anchored to document.body. All of the following overrides are available.
 *
 * * element
 * Modal.setAppElement(appElement);
 *
 * * query selector - uses the first element found if you pass in a class.
 * Modal.setAppElement('#your-app-element');
 *
 * 
 */
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'

    }

};

class DialogBox extends React.Component {

    constructor(props) {
        super(props);
        console.log(this);
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles} >

                    <h2>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>

            </div>
        );
    }
}

export default DialogBox;
