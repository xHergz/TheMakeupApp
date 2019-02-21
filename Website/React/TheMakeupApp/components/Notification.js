import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import faQuestionCircle from '@fortawesome/fontawesome-free-solid/faQuestionCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import '../../../Css/Notifications.css';

const NOTIFICATION_TYPE = {
    ALERT: 1,
    TASK: 2
};

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.renderNewBadge = this.renderNewBadge.bind(this);
    }

    static getClass(notificationTypeId) {
        switch (notificationTypeId) {
            case NOTIFICATION_TYPE.ALERT:
                return 'alert-notification';
            case NOTIFICATION_TYPE.TASK:
                return 'task-notification';
            default:
                return 'unknown-notification';
        }
    }

    static getIcon(notificationTypeId) {
        switch (notificationTypeId) {
            case NOTIFICATION_TYPE.ALERT:
                return faInfoCircle;
            case NOTIFICATION_TYPE.TASK:
                return faExclamationCircle;
            default:
                return faQuestionCircle;
        }
    }

    renderNewBadge(received) {
        if (received) {
            return null;
        }
        return (
            <div className="new-badge">
                NEW
            </div>
        )
    }

    render() {
        const notificationClass = Notification.getClass(this.props.notification.notificationTypeId);
        const notificationIcon = Notification.getIcon(this.props.notification.notificationTypeId);
        return (
            <div
                key={this.props.notification.notificationId}
                className={notificationClass}
            >
                <a href={this.props.notification.actionUrl}>
                    <FontAwesomeIcon icon={notificationIcon} size="2x" />
                    <div className="notification-content">
                        <div className="notification-info">
                            <h6>{this.props.notification.timestamp}</h6>
                            {this.renderNewBadge(this.props.notification.received)}
                        </div>
                        <h5>{this.props.notification.message}</h5>
                    </div>
                </a>
            </div>
        );
    }
}

Notification.propTypes = {
    notification: PropTypes.object.isRequired
};

export default Notification;
