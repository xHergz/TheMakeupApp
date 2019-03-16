import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DateInput from '../../Common/components/DateInput';
import DropdownInput from '../../Common/components/DropdownInput';
import ListInput from '../../Common/components/ListInput';
import Loader from '../../Common/components/Loader';
import { getArtistServiceAddons } from '../actions/ArtistServiceAddonActions';
import { getArtistServiceConsultations } from '../actions/ArtistServiceConsultationActions';
import { createMakeoverAppointment } from '../actions/MakeoverAppointmentActions';
import setCurrentPage from '../actions/SiteActions';
import FormInfoBlock from '../components/FormInfoBlock';
import FormInfoDisplay from '../components/FormInfoDisplay';
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
            artistServiceId: urlParams.get('artistServiceId')
        };
    }

    componentDidMount() {
        this.props.setCurrentPage(PAGES.APPOINTMENT_SETUP.KEY);
        this.props.getArtistServiceAddons(this.state.artistDisplayName);
        this.props.getArtistServiceConsultations(this.state.artistDisplayName);
    }

    render() {
        const consultationsWithPrices = this.props.artistServiceConsultations.filter((consultation) => {
            return consultation.artistServiceId === this.state.artistServiceId;
        }).map((consultation) => {
            return {
                id: consultation.consultationTypeId,
                description: `${consultation.minuteLength} ($${consultation.price})`
            };
        });

        const addonsWithPrices = this.props.artistServiceAddons.filter((addon) => {
            return addon.artistServiceId === this.state.artistServiceId;
        }).map((addon) => {
            return {
                id: addon.artistServiceAddonId,
                description: `${addon.artistServiceAddonDescription} ($${addon.price})`
            };
        });

        if (this.props.fetchingArtistServiceAddons || this.props.fetchingArtistServiceConsultations) {
            return <Loader />;
        }

        return (
            <div className="appointment-setup-form">
                <h1>Appointment Setup</h1>
                <FormInfoDisplay>
                    <FormInfoBlock
                        label="With Artist"
                        value={this.state.artistDisplayName}
                    />
                    <FormInfoBlock
                        label="Makeover Type"
                        value={this.state.artistDisplayName}
                    />
                    <FormInfoBlock
                        label="Service Type"
                        value={this.state.artistDisplayName}
                    />
                    <DateInput
                        label="Appointment Date"
                    />
                    <DropdownInput
                        options={consultationsWithPrices}
                        valueKey="id"
                        labelKey="description"
                        label="Consultation Type"
                    />
                    <ListInput
                        listLabel="Selected Addons"
                        inputLabel="Available Addons"
                        listOptions={addonsWithPrices}
                        listIdKey="id"
                        listDescriptionKey="description"
                    />
                </FormInfoDisplay>
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
