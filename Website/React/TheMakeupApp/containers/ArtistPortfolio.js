import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import TabContainer from '../../Common/components/TabContainer';
import TabContent from '../../Common/components/TabContent';
import TabHeader from '../../Common/components/TabHeader';
import TabHeaderItem from '../../Common/components/TabHeaderItem';
import {
    createArtistPortfolio,
    disableArtistPortfolioEditing,
    enableArtistPortfolioEditing,
    getArtistPortfolio,
    updateArtistPortfolio
} from '../actions/ArtistPortfolioActions';
import setCurrentPage from '../actions/SiteActions';
import PortfolioBase from '../components/PortfolioBase';
import PortfolioPictures from '../components/PortfolioPictures';
import ArtistServices from '../components/ArtistServices';
import { GetPortfolioPageKey } from '../constants/UrlInfo';

const TABS = {
    PORTFOLIO: {
        KEY: 'PORTFOLIO',
        LABEL: 'Portfolio'
    },
    SERVICES: {
        KEY: 'SERVICES',
        LABEL: 'Services'
    },
    ABOUT: {
        KEY: 'ABOUT',
        LABEL: 'About'
    }
};

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

    renderTabs() {
        if (this.props.currentArtistPortfolio == null) {
            return null;
        }

        return (
            <TabContainer>
                <TabHeader>
                    <TabHeaderItem
                        tabLabel={TABS.PORTFOLIO.LABEL}
                        tabKey={TABS.PORTFOLIO.KEY}
                        isInitialTab
                    />
                    <TabHeaderItem
                        tabLabel={TABS.SERVICES.LABEL}
                        tabKey={TABS.SERVICES.KEY}
                    />
                    <TabHeaderItem
                        tabLabel={TABS.ABOUT.LABEL}
                        tabKey={TABS.ABOUT.KEY}
                    />
                </TabHeader>
                <TabContent
                    tabKey={TABS.PORTFOLIO.KEY}
                    isInitialTab
                >
                    <PortfolioPictures
                        currentSession={this.props.currentSession}
                        artistDisplayName={this.props.match.params.displayName}
                        currentArtistPortfolio={this.props.currentArtistPortfolio}
                        ownsArtistPortfolio={this.currentSessionOwnsArtistPortfolio()}
                    />
                </TabContent>
                <TabContent
                    tabKey={TABS.SERVICES.KEY}
                >
                    <ArtistServices
                        currentSession={this.props.currentSession}
                        artistDisplayName={this.props.match.params.displayName}
                        currentArtistPortfolio={this.props.currentArtistPortfolio}
                        ownsArtistPortfolio={this.currentSessionOwnsArtistPortfolio()}
                    />
                </TabContent>
                <TabContent
                    tabKey={TABS.ABOUT.KEY}
                >
                    About
                </TabContent>
            </TabContainer>
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
                {this.renderTabs()}
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
        isArtist: PropTypes.number.isRequired,
        isClient: PropTypes.number.isRequired,
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
