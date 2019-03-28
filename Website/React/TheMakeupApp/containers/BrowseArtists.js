import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import { getArtistPortfolios } from '../actions/ArtistPortfolioActions';
import setCurrentPage from '../actions/SiteActions';
import ArtistCard from '../components/ArtistCard';
import PAGES from '../constants/Pages';

import '../../../Css/BrowseArtists.css';

class BrowseArtists extends React.Component {
    constructor(props) {
        super(props);
        this.renderPortfolioCard = this.renderPortfolioCard.bind(this);
        this.renderPortfolios = this.renderPortfolios.bind(this);
    }

    componentDidMount() {
        this.props.setCurrentPage(PAGES.BROWSE_ARTISTS.KEY);
        this.props.getArtistPortfolios();
    }

    renderPortfolioCard(artist) {
        return (
            <ArtistCard
                artist={artist}
            />
        )
    }

    renderPortfolios() {
        if (this.props.artistPortfolios.length === 0) {
            return <h4 className="none-message">- No Artists Registered! -</h4>;
        }

        return this.props.artistPortfolios.map((portfolio) => { return this.renderPortfolioCard(portfolio); });
    }

    render() {
        if (this.props.fetchingArtistPortfolios) {
            return <Loader />;
        }

        return (
            <div className="page-container">
                <h1 className="page-title">Browse Artists</h1>
                <div className="artist-portfolio-list">
                    {this.renderPortfolios()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        artistPortfolios: state.artistPortfolioReducer.artistPortfolios,
        fetchingArtistPortfolios: state.artistPortfolioReducer.fetchingArtistPortfolios
    };
}

BrowseArtists.propTypes = {
    getArtistPortfolios: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
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
    artistPortfolios: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistPortfolios: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        getArtistPortfolios,
        setCurrentPage
    }
)(BrowseArtists));
