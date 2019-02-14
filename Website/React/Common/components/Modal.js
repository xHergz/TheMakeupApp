import React from 'react';

import '../styles/Modal.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({open: true});
    }

    closeModal() {
        this.setState({open: false});
    }

    render() {
        if (!this.state.open) {
            return null;
        }
        // const modalClass = this.state.open ? "modal-background" : "modal-background modal-hidden";
        return (
            <div className="modal-background">
                <div className="modal">
                    <div className="modal-header">
                        <span className="close-button" onClick={this.closeModal}>
                            &times;
                        </span>
                    </div>
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
