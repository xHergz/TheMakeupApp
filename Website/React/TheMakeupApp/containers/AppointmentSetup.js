import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DateInput from '../../Common/components/DateInput';
import DropdownInput from '../../Common/components/DropdownInput';
import ListInput from '../../Common/components/ListInput';
import Loader from '../../Common/components/Loader';
import { validateDate } from '../../Common/helpers/validationUtilities';
import { getArtistServiceAddons } from '../actions/ArtistServiceAddonActions';
import { getArtistServiceConsultations } from '../actions/ArtistServiceConsultationActions';
import { createMakeoverAppointment } from '../actions/MakeoverAppointmentActions';
import setCurrentPage from '../actions/SiteActions';
import FormInfoBlock from '../components/FormInfoBlock';
import FormInfoDisplay from '../components/FormInfoDisplay';
import PAGES from '../constants/Pages';
import Button from '../../Common/components/Button';

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
            artistServiceId: Number(urlParams.get('artistServiceId')),
            canSubmitAppointment: false
        };
        this.appointmentSetupInputChanged = this.appointmentSetupInputChanged.bind(this);
        this.submitAppointmentSetup = this.submitAppointmentSetup.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.appointmentDateInput = React.createRef();
        this.consultationTypeInput = React.createRef();
        this.addonsInput = React.createRef();
    }

    componentDidMount() {
        this.props.setCurrentPage(PAGES.APPOINTMENT_SETUP.KEY);
        this.props.getArtistServiceAddons(this.state.artistDisplayName);
        this.props.getArtistServiceConsultations(this.state.artistDisplayName);
    }

    appointmentSetupInputChanged() {
        if (this.appointmentDateInput.current.isValid() && !this.appointmentDateInput.current.isEmpty()) {
            this.setState({
                canSubmitAppointment: true
            });
        }
        else {
            this.setState({
                canSubmitAppointment: false
            });
        }
    }

    submitAppointmentSetup() {
        const consultationTypeId = this.consultationTypeInput.current.getValue();
        const consultationPrice = this.props.artistServiceConsultations.find(
            (consultation) => {
                return consultation.artistServiceId === this.state.artistServiceId
                    && consultation.consultationTypeId === consultationTypeId;
            }
        ).price;
        const addonIds = this.addonsInput.current.getValues().map((id) => { return Number(id); });
        const addons = this.props.artistServiceAddons.filter((addon) => { return addonIds.includes(addon.artistServiceAddonId); })
            .map((addon) => {
                return {
                    description: addon.artistServiceAddonDescription,
                    price: addon.price
                };
            });
        this.props.createMakeoverAppointment(this.props.currentSession.clientProfileId, this.state.artistPortfolioId, consultationTypeId,
            consultationPrice, this.state.serviceTypeId, this.state.servicePrice, this.state.makeoverTypeId,
            this.appointmentDateInput.current.getValue(), addons);
    }

    renderSubmitButton() {
        if (this.props.fetchingCreateMakeoverAppointment) {
            return <Loader />;
        }

        return (
            <div className="form-submit-button">
                <Button
                    label="Submit"
                    onClickHandler={this.submitAppointmentSetup}
                    disabled={!this.state.canSubmitAppointment}
                />
            </div>
        );
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
            <div className="page-container">
                <h1 className="page-title">Appointment Setup</h1>
                <FormInfoDisplay>
                    <FormInfoBlock
                        label="With Artist"
                        value={this.state.artistDisplayName}
                    />
                    <FormInfoBlock
                        label="Makeover Type"
                        value={this.state.makeoverTypeDescription}
                    />
                    <FormInfoBlock
                        label="Service Type"
                        value={this.state.serviceTypeDescription}
                    />
                    <DateInput
                        ref={this.appointmentDateInput}
                        label="Appointment Date"
                        onValidate={validateDate}
                        onValidityChanged={this.appointmentSetupInputChanged}
                    />
                    <DropdownInput
                        ref={this.consultationTypeInput}
                        options={consultationsWithPrices}
                        valueKey="id"
                        labelKey="description"
                        label="Consultation Type"
                    />
                    <ListInput
                        ref={this.addonsInput}
                        listLabel="Selected Addons"
                        inputLabel="Available Addons"
                        listOptions={addonsWithPrices}
                        listIdKey="id"
                        listDescriptionKey="description"
                    />
                </FormInfoDisplay>
                {this.renderSubmitButton()}
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
        artistPortfolioId: PropTypes.number,
        isArtistOnline: PropTypes.number
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
