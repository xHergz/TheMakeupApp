import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';

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
    static test() {
        return <h1>Basic React App</h1>;
    }

    componentDidMount() {
        this.props.getCurrentSessionInfo();
    }

    render() {
        return (
            <div>
                <Header
                    displayName={this.props.currentSession.displayName}
                />
                <div className="page-content">
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
        currentSession: state.sessionReducer.currentSession
    };
}

TheMakeupApp.propTypes = {
    getCurrentSessionInfo: PropTypes.func.isRequired,
    currentSession: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired
    }).isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        getCurrentSessionInfo
    }
)(TheMakeupApp));
