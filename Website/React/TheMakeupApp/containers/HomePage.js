import faAddressCard from '@fortawesome/fontawesome-free-solid/faAddressCard';
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt';
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt';
import faPaintBrush from '@fortawesome/fontawesome-free-solid/faPaintBrush';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faVideo from '@fortawesome/fontawesome-free-solid/faVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import setCurrentPage from '../actions/SiteActions';
import PAGES from '../constants/Pages';

import '../../../Css/HomePage.css';

class HomePage extends React.Component {
    componentWillMount() {
        this.props.setCurrentPage(PAGES.HOME_PAGE.KEY);
    }

    renderArtistApplicationLink() {
        if (this.props.currentSession.isClient && !this.props.currentSession.isArtist) {
            return (
                <div className="home-page-tile">
                    <a href={PAGES.ARTIST_APPLICATION.LINK}>
                        <FontAwesomeIcon icon={faAddressCard} size="2x" />
                        <h3>{PAGES.ARTIST_APPLICATION.LABEL}</h3>
                    </a>
                </div>
            );
        }
        return null;
    }

    render() {
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
                {this.renderArtistApplicationLink()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession
    };
}

HomePage.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.number.isRequired,
        isClient: PropTypes.number.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        setCurrentPage
    }
)(HomePage));
