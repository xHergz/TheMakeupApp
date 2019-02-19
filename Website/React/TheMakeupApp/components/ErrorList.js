import React from 'react';
import PropTypes from 'prop-types';

import MESSAGE_TYPES from '../constants/MessageType';

import '../../../Css/ErrorList.css';

class ErrorList extends React.Component {
    constructor(props) {
        super(props);
        this.displayMessage = this.displayMessage.bind(this);
        this.dismissMessage = this.dismissMessage.bind(this);
    }

    static getMessageClass(type) {
        switch (type) {
            case MESSAGE_TYPES.ERROR:
                return 'error';
            case MESSAGE_TYPES.SUCCESS:
                return 'success';
            case MESSAGE_TYPES.WARNING:
                return 'warning';
            default:
                return 'error';
        }
    }

    displayMessage(message) {
        const messageClass = ErrorList.getMessageClass(message.type);
        return (
            <div className={messageClass} key={message.id}>
                <div>
                    {message.message}
                </div>
                <div
                    className="dismiss-error"
                    onClick={() => { this.dismissMessage(message.id); }}
                >
                    &times;
                </div>
            </div>
        );
    }

    dismissMessage(messageId) {
        this.props.dismissMessage(messageId);
    }

    render() {
        console.log(this.props.messages);
        if (this.props.messages.length === 0) {
            return null;
        }

        return (
            <div className="error-list">
                {this.props.messages.map(this.displayMessage)}
            </div>
        );
    }
}

ErrorList.propTypes = {
    dismissMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        message: PropTypes.string,
        type: PropTypes.number
    }))
};

ErrorList.defaultProps = {
    messages: []
};

export default ErrorList;
