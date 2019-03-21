import PropTypes from 'prop-types';
import React from 'react';
import {
    Map,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../Common/components/Button';
import DropdownInput from '../../Common/components/DropdownInput';
import Loader from '../../Common/components/Loader';
import TabContainer from '../../Common/components/TabContainer';
import TabContent from '../../Common/components/TabContent';
import TabHeader from '../../Common/components/TabHeader';
import TabHeaderItem from '../../Common/components/TabHeaderItem';

import { getMakeoverTypes } from '../actions/ArtistMakeoverOfferedActions';
import { goToMakeoverAppointmentSetup } from '../actions/MakeoverAppointmentActions';
import { addErrorMessage } from '../actions/MessageActions';
import setCurrentPage from '../actions/SiteActions';
import { searchForArtists } from '../actions/OnlineArtistActions';
import InfoBlock from '../components/InfoBlock';
import DISTANCE_OPTIONS from '../constants/DistanceOptions';
import PAGES from '../constants/Pages';

import '../../../Css/Search.css';
import SearchResult from '../components/SearchResult';

const FUTURE_APPOINTMENT = {
    SERVICE_TYPE_ID: 3,
    SERVICE_TYPE_DESCRIPTION: 'Future Appointment'
};

const TABS = {
    LIST: {
        KEY: 'LIST',
        LABEL: 'List'
    },
    MAP: {
        KEY: 'MAP',
        LABEL: 'Map'
    }
};

class FutureAppointmentSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            didSearch: false,
            currentPosition: {
                longitude: null,
                latitude: null
            },
            gettingLocation: false
        };
        this.displayGeolocationError = this.displayGeolocationError.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.searchArtists = this.searchArtists.bind(this);
        this.requestAppointment = this.requestAppointment.bind(this);
        this.renderSearchButton = this.renderSearchButton.bind(this);
        this.renderResult = this.renderResult.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.renderMapMarker = this.renderMapMarker.bind(this);
        this.makeoverTypeInput = React.createRef();
        this.maxDistanceInput = React.createRef();
        this.resultMap = null;
    }

    componentWillMount() {
        this.props.setCurrentPage(PAGES.FUTURE_APPOINTMENT_SEARCH.KEY);
        this.props.getMakeoverTypes();
    }

    getCurrentLocation() {
        this.setState({
            gettingLocation: true,
            didSearch: false
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.searchArtists, this.displayGeolocationError);
        }
        else {
            this.props.addErrorMessage('Could not get geolocation');
            this.setState({
                gettingLocation: false
            });
        }
    }

    displayGeolocationError(error) {
        let message = '';
        this.setState({
            gettingLocation: false
        });
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

    searchArtists(currentLocation) {
        this.setState({
            didSearch: true,
            currentPosition: {
                longitude: currentLocation.coords.longitude,
                latitude: currentLocation.coords.latitude
            },
            gettingLocation: false
        });
        this.props.searchForArtists(
            this.makeoverTypeInput.current.getValue(),
            FUTURE_APPOINTMENT.SERVICE_TYPE_ID,
            currentLocation.coords.longitude,
            currentLocation.coords.latitude,
            this.maxDistanceInput.current.getValue()
        );
    }

    requestAppointment(artistPortfolioId, artistDisplayName, servicePrice, artistServiceId) {
        const makeoverTypeId = Number(this.makeoverTypeInput.current.getValue());
        const makeoverTypeDescription = this.props.makeoverTypes.find(
            (type) => { return type.makeoverTypeId === makeoverTypeId; }
        ).makeoverTypeDescription;
        this.props.goToMakeoverAppointmentSetup(artistPortfolioId, artistDisplayName, makeoverTypeId, makeoverTypeDescription,
            FUTURE_APPOINTMENT.SERVICE_TYPE_ID, FUTURE_APPOINTMENT.SERVICE_TYPE_DESCRIPTION, servicePrice, artistServiceId);
    }

    renderSearchButton() {
        if (this.props.fetchingSearchOnlineArtists || this.state.gettingLocation) {
            return <Loader />;
        }

        return (
            <Button
                label="Search"
                onClickHandler={this.getCurrentLocation}
            />
        );
    }

    renderResult(result) {
        return (
            <SearchResult
                artistResult={result}
                onRequestAppointment={this.requestAppointment}
            />
        );
    }

    renderMapMarker(result) {
        const position = [result.latitude, result.longitude];
        return (
            <Marker position={position}>
                <Popup>
                    {result.displayName}
                </Popup>
            </Marker>
        );
    }

    renderResults() {
        if (!this.state.didSearch || this.props.fetchingSearchOnlineArtists) {
            return null;
        }

        if (this.props.currentOnlineArtistSearchResults.length === 0) {
            return (
                <div className="search-results">
                    <h4>- No available Artists -</h4>
                </div>
            );
        }

        const position = [this.state.currentPosition.latitude, this.state.currentPosition.longitude];
        return (
            <TabContainer>
                <TabHeader>
                    <TabHeaderItem
                        tabLabel={TABS.LIST.LABEL}
                        tabKey={TABS.LIST.KEY}
                        isInitialTab
                    />
                    <TabHeaderItem
                        tabLabel={TABS.MAP.LABEL}
                        tabKey={TABS.MAP.KEY}
                    />
                </TabHeader>
                <TabContent
                    tabKey={TABS.LIST.KEY}
                    isInitialTab
                >
                    <div className="search-result-list">
                        {this.props.currentOnlineArtistSearchResults.map((result) => { return this.renderResult(result); })}
                    </div>
                </TabContent>
                <TabContent
                    tabKey={TABS.MAP.KEY}
                >
                    <Map
                        center={position}
                        zoom={13}
                    >
                        <TileLayer
                            attribution={`Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`}
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {this.props.currentOnlineArtistSearchResults.map((result) => { return this.renderMapMarker(result); })}
                    </Map>
                </TabContent>
            </TabContainer>
        );
    }

    render() {
        if (this.props.fetchingMakeoverTypes) {
            return <Loader />;
        }

        return (
            <div className="page-container">
                <h1 className="page-title">Future Appointment Search</h1>
                <InfoBlock
                    message={'A Future Appointment consists of the an Instant Consultation for some preliminary information gathering '
                        + 'for the Artist, and then an in person makeover at the time scheduled with an artist!'}
                />
                <DropdownInput
                    ref={this.makeoverTypeInput}
                    options={this.props.makeoverTypes}
                    valueKey="makeoverTypeId"
                    labelKey="makeoverTypeDescription"
                    label="Makeover Type"
                />
                <DropdownInput
                    ref={this.maxDistanceInput}
                    options={DISTANCE_OPTIONS}
                    valueKey="distance"
                    labelKey="label"
                    label="Distance"
                />
                <div className="search-button">
                    {this.renderSearchButton()}
                </div>
                {this.renderResults()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        makeoverTypes: state.artistMakeoverOfferedReducer.makeoverTypes,
        fetchingMakeoverTypes: state.artistMakeoverOfferedReducer.fetchingMakeoverTypes,
        currentOnlineArtistSearchResults: state.onlineArtistReducer.currentOnlineArtistSearchResults,
        fetchingSearchOnlineArtists: state.onlineArtistReducer.fetchingSearchOnlineArtists
    };
}

FutureAppointmentSearch.propTypes = {
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
    setCurrentPage: PropTypes.func.isRequired,
    addErrorMessage: PropTypes.func.isRequired,
    getMakeoverTypes: PropTypes.func.isRequired,
    makeoverTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingMakeoverTypes: PropTypes.bool.isRequired,
    searchForArtists: PropTypes.func.isRequired,
    currentOnlineArtistSearchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingSearchOnlineArtists: PropTypes.bool.isRequired,
    goToMakeoverAppointmentSetup: PropTypes.func.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        addErrorMessage,
        getMakeoverTypes,
        searchForArtists,
        goToMakeoverAppointmentSetup,
        setCurrentPage
    }
)(FutureAppointmentSearch));
