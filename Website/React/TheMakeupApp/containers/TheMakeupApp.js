import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';

import ErrorList from '../components/ErrorList';

import { dismissMessage } from '../actions/MessageActions';
import { getNumberOfNewNotifications } from '../actions/NotificationActions';
import { getCurrentSessionInfo } from '../actions/SessionActions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PAGES from '../constants/Pages';
import Account from './Account';
import AppointmentInfo from './AppointmentInfo';
import AppointmentSetup from './AppointmentSetup';
import ArtistApplication from './ArtistApplication';
import ArtistPortfolio from './ArtistPortfolio';
import AsapMakeoverSearch from './AsapMakeoverSearch';
import BrowseArtists from './BrowseArtists';
import ClientProfile from './ClientProfile';
import Consultation from './Consultation';
import FutureAppointmentSearch from './FutureAppointmentSearch';
import HomePage from './HomePage';
import InstantConsultationSearch from './InstantConsultationSearch';
import NotFound from './NotFound';
import Notifications from './Notifications';
import Schedule from './Schedule';

import '../../../Css/TheMakeupApp.css';

class TheMakeupApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshNewNotificationsId: null
        };
        this.refreshNewNotifications = this.refreshNewNotifications.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentSessionInfo();
        this.refreshNewNotifications();
        const intervalId = window.setInterval(this.refreshNewNotifications, 5000);
        this.setState({refreshNewNotificationsId: intervalId});
    }

    componentWillUnmount() {
        window.clearInterval(this.state.refreshNewNotificationsId);
    }

    refreshNewNotifications() {
        this.props.getNumberOfNewNotifications(this.props.sessionKey, this.props.currentSession.displayName);
    }

    render() {
        return (
            <div>
                <Header
                    displayName={this.props.currentSession.displayName}
                    currentPageKey={this.props.currentPageKey}
                    newNotifications={this.props.newNotifications}
                />
                <div className="page-content">
                    <ErrorList
                        dismissMessage={this.props.dismissMessage}
                        messages={this.props.messages}
                    />
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path={PAGES.ACCOUNT.LINK} component={Account} />
                        <Route exact path={PAGES.APPOINTMENT_INFO.LINK} component={AppointmentInfo} />
                        <Route exact path={PAGES.APPOINTMENT_SETUP.LINK} component={AppointmentSetup} />
                        <Route exact path={PAGES.ARTIST_APPLICATION.LINK} component={ArtistApplication} />
                        <Route exact path={PAGES.ARTIST_PORTFOLIO.LINK} component={ArtistPortfolio} />
                        <Route exact path={PAGES.ASAP_MAKEOVER_SEARCH.LINK} component={AsapMakeoverSearch} />
                        <Route exact path={PAGES.BROWSE_ARTISTS.LINK} component={BrowseArtists} />
                        <Route exact path={PAGES.CLIENT_PROFILE.LINK} component={ClientProfile} />
                        <Route exact path={PAGES.CONSULTATION.LINK} component={Consultation} />
                        <Route exact path={PAGES.FUTURE_APPOINTMENT_SEARCH.LINK} component={FutureAppointmentSearch} />
                        <Route exact path={PAGES.INSTANT_CONSULTATION_SEARCH.LINK} component={InstantConsultationSearch} />
                        <Route exact path={PAGES.NOTIFICATIONS.LINK} component={Notifications} />
                        <Route exact path={PAGES.SCHEDULE.LINK} component={Schedule} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPageKey: state.siteReducer.currentPageKey,
        currentSession: state.sessionReducer.currentSession,
        messages: state.messageReducer.messages,
        newNotifications: state.notificationReducer.newNotifications,
        sessionKey: state.sessionReducer.sessionKey
    };
}

TheMakeupApp.propTypes = {
    currentPageKey: PropTypes.string.isRequired,
    currentSession: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired
    }).isRequired,
    dismissMessage: PropTypes.func.isRequired,
    getCurrentSessionInfo: PropTypes.func.isRequired,
    getNumberOfNewNotifications: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    newNotifications: PropTypes.number.isRequired,
    sessionKey: PropTypes.string.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        dismissMessage,
        getCurrentSessionInfo,
        getNumberOfNewNotifications
    }
)(TheMakeupApp));
