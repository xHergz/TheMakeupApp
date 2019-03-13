import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import {
    createArtistPortfolio,
    disableArtistPortfolioEditing,
    enableArtistPortfolioEditing,
    getArtistPortfolio,
    updateArtistPortfolio
} from '../actions/ArtistPortfolioActions';
import setCurrentPage from '../actions/SiteActions';
import PortfolioBase from '../components/PortfolioBase';
import { GetPortfolioPageKey } from '../constants/UrlInfo';

class ArtistPortfolio extends React.Component {
    constructor(props) {
        super(props);
        this.currentSessionOwnsArtistPortfolio = this.currentSessionOwnsArtistPortfolio.bind(this);
    }

    componentWillMount() {
        const displayName = this.props.match.params.displayName;
        this.props.setCurrentPage(GetPortfolioPageKey(displayName));
        this.props.getArtistPortfolio(displayName);
    }

    currentSessionOwnsArtistPortfolio() {
        return this.props.match.params.displayName === this.props.currentSession.displayName;
    }

    isFetchingData() {
        return (
            this.props.fetchingArtistPortfolio
        );
    }

    render() {
        if (this.isFetchingData()) {
            return <Loader />;
        }

        return (
            <div className="artist-portfolio-container">
                <h1>{this.props.match.params.displayName}&#39;s Artist Portfolio</h1>
                <PortfolioBase
                    currentSession={this.props.currentSession}
                    currentArtistPortfolio={this.props.currentArtistPortfolio}
                    fetchingCreateArtistPortfolio={this.props.fetchingCreateArtistPortfolio}
                    fetchingUpdateArtistPortfolio={this.props.fetchingUpdateArtistPortfolio}
                    editingArtistPortfolio={this.props.editingArtistPortfolio}
                    onCancelEditArtistPortfolio={this.props.disableArtistPortfolioEditing}
                    onCreateArtistPortfolio={this.props.createArtistPortfolio}
                    onEditArtistPortfolio={this.props.enableArtistPortfolioEditing}
                    onUpdateArtistPortfolio={this.props.updateArtistPortfolio}
                    ownsArtistPortfolio={this.currentSessionOwnsArtistPortfolio()}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        currentArtistPortfolio: state.artistPortfolioReducer.currentArtistPortfolio,
        fetchingArtistPortfolio: state.artistPortfolioReducer.fetchingArtistPortfolio,
        fetchingCreateArtistPortfolio: state.artistPortfolioReducer.fetchingCreateArtistPortfolio,
        fetchingUpdateArtistPortfolio: state.artistPortfolioReducer.fetchingUpdateArtistPortfolio,
        editingArtistPortfolio: state.artistPortfolioReducer.editingArtistPortfolio
    };
}

ArtistPortfolio.propTypes = {
    createArtistPortfolio: PropTypes.func.isRequired,
    disableArtistPortfolioEditing: PropTypes.func.isRequired,
    enableArtistPortfolioEditing: PropTypes.func.isRequired,
    getArtistPortfolio: PropTypes.func.isRequired,
    updateArtistPortfolio: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            displayName: PropTypes.string.isRequired
        })
    }).isRequired,
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired,
        isClient: PropTypes.bool.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired,
    currentArtistPortfolio: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string
    }),
    fetchingArtistPortfolio: PropTypes.bool.isRequired,
    fetchingCreateArtistPortfolio: PropTypes.bool.isRequired,
    fetchingUpdateArtistPortfolio: PropTypes.bool.isRequired,
    editingArtistPortfolio: PropTypes.bool.isRequired
};

ArtistPortfolio.defaultProps = {
    currentArtistPortfolio: null
};

export default withRouter(connect(
    mapStateToProps,
    {
        createArtistPortfolio,
        disableArtistPortfolioEditing,
        enableArtistPortfolioEditing,
        getArtistPortfolio,
        updateArtistPortfolio,
        setCurrentPage
    }
)(ArtistPortfolio));
