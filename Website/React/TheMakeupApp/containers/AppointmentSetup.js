import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import { getArtistServiceAddons } from '../actions/ArtistServiceAddonActions';
import { getArtistServiceConsultations } from '../actions/ArtistServiceConsultationActions';
import { createMakeoverAppointment } from '../actions/MakeoverAppointmentActions';
import setCurrentPage from '../actions/SiteActions';
import PAGES from '../constants/Pages';

class AppointmentSetup extends React.Component {
    constructor(props) {
        const urlParams = new URLSearchParams(window.location.search);
        super(props);
        this.state = {
            artistPortfolioId: urlParams.get('artistPortfolioId'),
            artistDisplayName: urlParams.get('artistDisplayName'),
            makeoverTypeId: urlParams.get('makeoverTypeId'),
            makeoverTypeDescription: urlParams.get('makeoverTypeDescription'),
            serviceTypeId: urlParams.get('serviceTypeId'),
            serviceTypeDescription: urlParams.get('serviceTypeDescription'),
            servicePrice: urlParams.get('servicePrice'),
        };
    }

    componentDidMount() {
        this.props.setCurrentPage(PAGES.APPOINTMENT_SETUP.KEY);
        this.props.getArtistServiceAddons(this.state.artistDisplayName);
        this.props.getArtistServiceConsultations(this.state.artistDisplayName);
    }

    render() {
        if (this.props.fetchingArtistServiceAddons || this.props.fetchingArtistServiceConsultations) {
            return <Loader />;
        }

        return (
            <div className="appointment-setup-form">
                <div>
                    <h1>Appointment Setup</h1>
                </div>
                <div>
                    <h5>With Artist: </h5><h6>{this.state.artistDisplayName}</h6>
                </div>
                <div>
                    <h5>Makeover Type: </h5><h6>{this.state.makeoverTypeDescription}</h6>
                </div>
                <div>
                    <h5>Service Type: </h5><h6>{this.state.serviceTypeDescription}</h6>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        fetchingCreateMakeoverAppointment: state.setupMakeoverAppointmentReducer.fetchingCreateMakeoverAppointment,
        artistServiceAddons: state.artistServiceAddonReducer.artistServiceAddons,
        fetchingArtistServiceAddons: state.artistServiceAddonReducer.fetchingArtistServiceAddons,
        artistServiceConsultations: state.artistServiceConsultationReducer.artistServiceConsultations,
        fetchingArtistServiceConsultations: state.artistServiceConsultationReducer.fetchingArtistServiceConsultations
    };
}

AppointmentSetup.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    createMakeoverAppointment: PropTypes.func.isRequired,
    getArtistServiceAddons: PropTypes.func.isRequired,
    getArtistServiceConsultations: PropTypes.func.isRequired,
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
    fetchingCreateMakeoverAppointment: PropTypes.bool.isRequired,
    artistServiceAddons: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistServiceAddons: PropTypes.bool.isRequired,
    artistServiceConsultations: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistServiceConsultations: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        createMakeoverAppointment,
        getArtistServiceAddons,
        getArtistServiceConsultations,
        setCurrentPage
    }
)(AppointmentSetup));
