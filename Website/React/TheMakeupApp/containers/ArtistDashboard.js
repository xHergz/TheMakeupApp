import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';

import setCurrentPage from '../actions/SiteActions';
import { addErrorMessage } from '../actions/MessageActions';
import {
    setArtistOnline,
    setArtistOffline
} from '../actions/OnlineArtistActions';
import PAGES from '../constants/Pages';
import InfoBlock from '../components/InfoBlock';
import Button from '../../Common/components/Button';

class ArtistDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gettingLocation: false
        };
        this.displayGeolocationError = this.displayGeolocationError.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.goOnline = this.goOnline.bind(this);
        this.goOffline = this.goOffline.bind(this);
        this.renderOnlineButton = this.renderOnlineButton.bind(this);
    }

    componentWillMount() {
        this.props.setCurrentPage(PAGES.ARTIST_DASHBOARD.KEY);
    }

    getCurrentLocation() {
        this.setState({
            gettingLocation: true
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.goOnline, this.displayGeolocationError);
        }
        else {
            this.props.addErrorMessage('Could not get geolocation');
            this.setState({
                gettingLocation: false
            });
        }
    }

    displayGeolocationError(error) {
        this.setState({
            gettingLocation: false
        });
        let message = '';
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                message = 'The request to get user location timed out.';
                break;
            case error.UNKNOWN_ERROR:
                message = 'An unknown error occurred.';
                break;
            default:
                message = `Undefined Error: ${error.code}`;
        }
        this.props.addErrorMessage(message);
    }

    goOnline(position) {
        this.props.setArtistOnline(this.props.currentSession.artistPortfolioId, position.coords.longitude, position.coords.latitude);
        this.setState({
            gettingLocation: false
        });
    }

    goOffline() {
        this.props.setArtistOffline(this.props.currentSession.artistPortfolioId);
    }

    renderOnlineButton() {
        if (!this.props.currentSession.isArtistOnline) {
            if (this.state.gettingLocation) {
                return <Loader />;
            }

            return (
                <Button
                    label="Go Online"
                    onClickHandler={this.getCurrentLocation}
                />
            );
        }

        return (
            <Button
                label="Go Offline"
                onClickHandler={this.goOffline}
            />
        );
    }

    render() {
        if (this.props.fetchingSetArtistOnline || this.props.fetchingSetArtistOffline) {
            return <Loader />;
        }

        return (
            <div className="page-container">
                <h1 className="page-title">{this.props.currentSession.displayName}&#39;s Dashboard</h1>
                <InfoBlock
                    message="TIP: Going online will make you visible to Instant Consultation and ASAP Makeover searches!"
                />
                {this.renderOnlineButton()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        fetchingSetArtistOnline: state.onlineArtistReducer.fetchingSetArtistOnline,
        fetchingSetArtistOffline: state.onlineArtistReducer.fetchingSetArtistOffline
    };
}

ArtistDashboard.propTypes = {
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
    addErrorMessage: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    setArtistOnline: PropTypes.func.isRequired,
    setArtistOffline: PropTypes.func.isRequired,
    fetchingSetArtistOnline: PropTypes.bool.isRequired,
    fetchingSetArtistOffline: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        addErrorMessage,
        setArtistOnline,
        setArtistOffline,
        setCurrentPage
    }
)(ArtistDashboard));
