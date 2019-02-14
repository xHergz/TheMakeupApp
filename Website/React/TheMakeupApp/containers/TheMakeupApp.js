
import React from 'react';
import {
    Switch,
    Route,
    withRouter
} from 'react-router-dom';

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

class TheMakeupApp extends React.Component {
    static test() {
        return <h1>Basic React App</h1>;
    }

    render() {
        return (
            <div>
                <div className="themakeupapp-content">
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
            </div>
        );
    }
}

export default TheMakeupApp;
