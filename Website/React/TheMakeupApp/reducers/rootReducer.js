
import { combineReducers } from 'redux';

import artistApplicationReducer from './ArtistApplicationReducer';
import artistMakeoverOfferedReducer from './ArtistMakeoverOfferedReducer';
import artistPortfolioReducer from './ArtistPortfolioReducer';
import artistPortfolioPictureReducer from './ArtistPortfolioPictureReducer';
import artistQualificationReducer from './ArtistQualificationReducer';
import artistServiceAddonReducer from './ArtistServiceAddonReducer';
import artistServiceConsultationReducer from './ArtistServiceConsultationReducer';
import artistServiceReducer from './ArtistServiceReducer';
import clientAllergySensitivityReducer from './ClientAllergySensitivityReducer';
import clientHeadshotReducer from './ClientHeadshotReducer';
import clientProductPreferenceReducer from './ClientProductPreferenceReducer';
import clientProfileReducer from './ClientProfileReducer';
import clientReviewReducer from './ClientReviewReducer';
import makeoverAppointmentReducer from './MakeoverAppointmentReducer';
import messageReducer from './MessageReducer';
import notificationReducer from './NotificationReducer';
import onlineArtistReducer from './OnlineArtistReducer';
import sanitizationQuizReducer from './SanitizationQuizReducer';
import sessionReducer from './SessionReducer';
import setupMakeoverAppointmentReducer from './SetupMakeoverAppointmentReducer';
import siteReducer from './SiteReducer';
import userReducer from './UserReducer';
import audioReducer from './AudioReducer';
import videoReducer from './VideoReducer';
import roomReducer from './RoomReducer';

const rootReducer = combineReducers({
    artistApplicationReducer,
    artistMakeoverOfferedReducer,
    artistPortfolioReducer,
    artistPortfolioPictureReducer,
    artistQualificationReducer,
    artistServiceAddonReducer,
    artistServiceConsultationReducer,
    artistServiceReducer,
    clientAllergySensitivityReducer,
    clientHeadshotReducer,
    clientProductPreferenceReducer,
    clientProfileReducer,
    clientReviewReducer,
    makeoverAppointmentReducer,
    messageReducer,
    notificationReducer,
    onlineArtistReducer,
    sanitizationQuizReducer,
    sessionReducer,
    setupMakeoverAppointmentReducer,
    siteReducer,
    userReducer,
    audio: audioReducer,
    video: videoReducer,
    rooms: roomReducer
});

export default rootReducer;
