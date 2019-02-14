
import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Modal from './Modal';

import '../styles/ConfirmationModal.css';

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onOkClicked = this.onOkClicked.bind(this);
    }

    openModal() {
        this.modal.openModal();
    }

    closeModal() {
        this.modal.closeModal();
    }

    onOkClicked() {
        this.props.onOkHandler();
        this.closeModal();
    }

    render() {
        return (
            <Modal
                ref={(modal) => {this.modal = modal}}
            >
                <div className="confirmation-content">
                    {this.props.children}
                </div>
                <div className="confirmation-buttons">
                    <div>
                        <Button
                            label="Cancel"
                            onClickHandler={this.closeModal}
                        />
                    </div>
                    <div className="confirmation-separation">
                    </div>
                    <div>
                        <Button
                            label="Confirm"
                            onClickHandler={this.onOkClicked}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}

ConfirmModal.propTypes = {
    onOkHandler: PropTypes.func.isRequired
}

export default ConfirmModal;
