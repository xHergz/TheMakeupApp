import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../Common/components/Button';
import Loader from '../../Common/components/Loader';
import {
    acknowledgeAllNotifications,
    getMoreNotifications,
    getNotifications
} from '../actions/NotificationActions';
import setCurrentPage from '../actions/SiteActions';
import Notification from '../components/Notification';
import { GetSessionKey } from '../constants/ApiInfo';
import PAGES from '../constants/Pages';

import '../../../Css/Notifications.css';

class Notifications extends React.Component {
    static compareNotifications(notificationA, notificationB) {
        if (notificationA.timestamp < notificationB.timestamp) {
            return 1;
        }
        if (notificationA > notificationB) {
            return -1;
        }
        return 0;
    }

    static renderNotification(notification) {
        return (
            <Notification
                key={notification.notificationId}
                notification={notification}
            />
        );
    }

    constructor(props) {
        super(props);
        this.loadMoreNotifications = this.loadMoreNotifications.bind(this);
        this.renderLoadMoreNotifications = this.renderLoadMoreNotifications.bind(this);
    }

    componentDidMount() {
        this.props.setCurrentPage(PAGES.NOTIFICATIONS.KEY);
        this.props.getNotifications(GetSessionKey(), this.props.currentSession.displayName);
        this.props.acknowledgeAllNotifications(GetSessionKey(), this.props.currentSession.displayName);
    }

    loadMoreNotifications() {
        const lastNotificationId = Math.min(...this.props.notifications.map((notification) => { return notification.notificationId; }));
        this.props.getMoreNotifications(GetSessionKey(), this.props.currentSession.displayName, lastNotificationId);
    }

    renderLoadMoreNotifications() {
        if (!this.props.canFetchMoreNotifications) {
            return <h6>No more Notifications</h6>;
        }
        if (this.props.isFetchingMoreNotifications) {
            return <Loader />;
        }
        return (
            <Button
                label="Load More Notifications"
                onClickHandler={this.loadMoreNotifications}
            />
        );
    }

    render() {
        if (this.props.isFetchingNotifications) {
            return <Loader />;
        }
        return (
            <div className="notifications-container">
                <div className="notifications">
                    {this.props.notifications.sort((a, b) => { return Notifications.compareNotifications(a, b); })
                        .map((notification) => { return Notifications.renderNotification(notification); })}
                </div>
                {this.renderLoadMoreNotifications()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        canFetchMoreNotifications: state.notificationReducer.canFetchMoreNotifications,
        currentSession: state.sessionReducer.currentSession,
        isFetchingMoreNotifications: state.notificationReducer.isFetchingMoreNotifications,
        isFetchingNotifications: state.notificationReducer.isFetchingNotifications,
        notifications: state.notificationReducer.notifications
    };
}

Notifications.propTypes = {
    acknowledgeAllNotifications: PropTypes.func.isRequired,
    canFetchMoreNotifications: PropTypes.bool.isRequired,
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.number.isRequired,
        isClient: PropTypes.number.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number,
        isArtistOnline: PropTypes.number
    }).isRequired,
    getMoreNotifications: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    isFetchingMoreNotifications: PropTypes.bool.isRequired,
    isFetchingNotifications: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    setCurrentPage: PropTypes.func.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        acknowledgeAllNotifications,
        getMoreNotifications,
        getNotifications,
        setCurrentPage
    }
)(Notifications));
