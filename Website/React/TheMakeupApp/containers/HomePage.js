import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt';
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt';
import faPaintBrush from '@fortawesome/fontawesome-free-solid/faPaintBrush';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faVideo from '@fortawesome/fontawesome-free-solid/faVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';

import PAGES from '../constants/Pages';

import '../../../Css/HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page-links">
            <div className="home-page-tile">
                <a href={PAGES.BROWSE_ARTISTS.LINK}>
                    <FontAwesomeIcon icon={faSearch} size="2x" />
                    <h3>{PAGES.BROWSE_ARTISTS.LABEL}</h3>
                </a>
            </div>
            <div className="home-page-tile">
                <a href={PAGES.INSTANT_CONSULTATION_SEARCH.LINK}>
                    <FontAwesomeIcon icon={faVideo} size="2x" />
                    <h3>{PAGES.INSTANT_CONSULTATION_SEARCH.LABEL}</h3>
                </a>
            </div>
            <div className="home-page-tile">
                <a href={PAGES.ASAP_MAKEOVER_SEARCH.LINK}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                    <h3>{PAGES.ASAP_MAKEOVER_SEARCH.LABEL}</h3>
                </a>
            </div>
            <div className="home-page-tile">
                <a href={PAGES.FUTURE_APPOINTMENT_SEARCH.LINK}>
                    <FontAwesomeIcon icon={faPaintBrush} size="2x" />
                    <h3>{PAGES.FUTURE_APPOINTMENT_SEARCH.LABEL}</h3>
                </a>
            </div>
            <div className="home-page-tile">
                <a href={PAGES.SCHEDULE.LINK}>
                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                    <h3>{PAGES.SCHEDULE.LABEL}</h3>
                </a>
            </div>
        </div>
    );
};

export default HomePage;