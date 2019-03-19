import React from 'react';
import PropTypes from 'prop-types';

import CreatePortfolioBase from './CreatePortfolioBase';
import DisplayPortfolioBase from './DisplayPortfolioBase';
import EditPortfolioBase from './EditPortfolioBase';

import '../../../Css/Portfolio.css';

const PortfolioBase = (props) => {
    if (props.currentArtistPortfolio == null && props.ownsArtistPortfolio) {
        return (
            <CreatePortfolioBase
                currentSession={props.currentSession}
                fetchingCreateArtistPortfolio={props.fetchingCreateArtistPortfolio}
                onCreateArtistPortfolio={props.onCreateArtistPortfolio}
            />
        );
    }

    if (props.editingArtistPortfolio) {
        return (
            <EditPortfolioBase
                currentSession={props.currentSession}
                currentArtistPortfolio={props.currentArtistPortfolio}
                fetchingUpdateArtistPortfolio={props.fetchingUpdateArtistPortfolio}
                onCancelEditArtistPortfolio={props.onCancelEditArtistPortfolio}
                onUpdateArtistPortfolio={props.onUpdateArtistPortfolio}
            />
        );
    }

    return (
        <DisplayPortfolioBase
            currentArtistPortfolio={props.currentArtistPortfolio}
            onEditArtistPortfolio={props.onEditArtistPortfolio}
            ownsArtistPortfolio={props.ownsArtistPortfolio}
        />
    );
};

PortfolioBase.propTypes = {
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
    currentArtistPortfolio: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string
    }),
    fetchingCreateArtistPortfolio: PropTypes.bool,
    fetchingUpdateArtistPortfolio: PropTypes.bool,
    editingArtistPortfolio: PropTypes.bool,
    onCancelEditArtistPortfolio: PropTypes.func,
    onCreateArtistPortfolio: PropTypes.func,
    onEditArtistPortfolio: PropTypes.func,
    onUpdateArtistPortfolio: PropTypes.func,
    ownsArtistPortfolio: PropTypes.bool
};

PortfolioBase.defaultProps = {
    currentArtistPortfolio: null,
    fetchingCreateArtistPortfolio: false,
    fetchingUpdateArtistPortfolio: false,
    editingArtistPortfolio: false,
    onCancelEditArtistPortfolio: () => {},
    onCreateArtistPortfolio: () => {},
    onEditArtistPortfolio: () => {},
    onUpdateArtistPortfolio: () => {},
    ownsArtistPortfolio: false
};

export default PortfolioBase;
