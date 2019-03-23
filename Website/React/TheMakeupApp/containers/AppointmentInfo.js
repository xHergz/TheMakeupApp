import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../Common/components/Button';
import Loader from '../../Common/components/Loader';
import {
    getMakeoverAppointment,
    getMakeoverAppointmentAddons
} from '../actions/MakeoverAppointmentActions';
import setCurrentPage from '../actions/SiteActions';
import FormInfoBlock from '../components/FormInfoBlock';
import FormInfoDisplay from '../components/FormInfoDisplay';
import PAGES from '../constants/Pages';

import '../../../Css/MakeoverAppointment.css';

class AppointmentInfo extends React.Component {
    static renderAddonRow(addon) {
        return (
            <div className="appointment-invoice-row">
                <div className="appointment-invoice-item">
                    {`${addon.description} (Addon)`}
                </div>
                <div className="appointment-invoice-price">
                    ${addon.price}
                </div>
            </div>
        );
    }

    constructor(props) {
        super(props);
        this.sumUpAddonPrices = this.sumUpAddonPrices.bind(this);
        this.renderCreateInstantConsultationButton = this.renderCreateInstantConsultationButton.bind(this);
    }

    componentDidMount() {
        const makeoverAppointmentId = Number(this.props.match.params.makeoverAppointmentId);
        this.props.setCurrentPage(PAGES.APPOINTMENT_INFO.KEY);
        this.props.getMakeoverAppointment(makeoverAppointmentId);
        this.props.getMakeoverAppointmentAddons(makeoverAppointmentId);
    }

    sumUpAddonPrices() {
        if (this.props.currentMakeoverAppointmentAddons.length === 0 || this.props.currentMakeoverAppointmentAddons === null) {
            return 0;
        }

        return this.props.currentMakeoverAppointmentAddons.reduce((a, b) => {
            return b.price === null ? a : a + b.price;
        }, 0);
    }

    renderCreateInstantConsultationButton() {
        if (this.props.currentMakeoverAppointment.artistPortfolioId !== this.props.currentSession.artistPortfolioId) {
            return null;
        }

        return (
            <div className="form-submit-button">
                <Button
                    label="Create Instant Consultation Room"
                    onClickHandler={() => { console.log('Create room'); }}
                />
            </div>
        );
    }

    render() {
        if (this.props.fetchingMakeoverAppointment || this.props.fetchingMakeoverAppointmentAddons) {
            return <Loader />;
        }

        if (this.props.currentMakeoverAppointment === null) {
            return <h1>No Appointment Info Found</h1>;
        }

        const appointmentTotal = this.props.currentMakeoverAppointment.servicePrice + this.props.currentMakeoverAppointment.consultationPrice
            + this.sumUpAddonPrices();
        return (
            <div className="page-container">
                <h1 className="page-title">Appointment #{this.props.match.params.makeoverAppointmentId}</h1>
                <FormInfoDisplay>
                    <FormInfoBlock
                        label="Artist"
                        value={this.props.currentMakeoverAppointment.artistPortfolioDisplayName}
                    >
                        <a href={`/portfolio/${this.props.currentMakeoverAppointment.artistPortfolioDisplayName}`}>
                            View Portfolio
                        </a>
                    </FormInfoBlock>
                    <FormInfoBlock
                        label="Client"
                        value={this.props.currentMakeoverAppointment.clientProfileDisplayName}
                    >
                        <a href={`/profile/${this.props.currentMakeoverAppointment.clientProfileDisplayName}`}>
                            View Profile
                        </a>
                    </FormInfoBlock>
                    <FormInfoBlock
                        label="Makeover Type"
                        value={this.props.currentMakeoverAppointment.makeoverTypeDescription}
                    />
                    <FormInfoBlock
                        label="Service Type"
                        value={this.props.currentMakeoverAppointment.serviceTypeDescription}
                    />
                    <FormInfoBlock
                        label="Consultation Length"
                        value={`${this.props.currentMakeoverAppointment.consultationTypeMinuteLength} Minutes`}
                    />
                    <h3>Invoice</h3>
                    <div className="appointment-invoice-table">
                        <div className="appointment-invoice-row">
                            <div className="appointment-invoice-header appointment-invoice-item-header">Item</div>
                            <div className="appointment-invoice-header appointment-invoice-price-header">Price</div>
                        </div>
                        <div className="appointment-invoice-row">
                            <div className="appointment-invoice-item">Service Base Price</div>
                            <div className="appointment-invoice-price">${this.props.currentMakeoverAppointment.servicePrice}</div>
                        </div>
                        <div className="appointment-invoice-row">
                            <div className="appointment-invoice-item">Consultation Price</div>
                            <div className="appointment-invoice-price">${this.props.currentMakeoverAppointment.consultationPrice}</div>
                        </div>
                        {this.props.currentMakeoverAppointmentAddons.map((addon) => { return AppointmentInfo.renderAddonRow(addon); })}
                        <div className="appointment-invoice-row">
                            <div className="appointment-invoice-item appointment-invoice-total">Total:</div>
                            <div className="appointment-invoice-price">${appointmentTotal}</div>
                        </div>
                    </div>
                </FormInfoDisplay>
                {this.renderCreateInstantConsultationButton()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        currentMakeoverAppointment: state.makeoverAppointmentReducer.currentMakeoverAppointment,
        currentMakeoverAppointmentAddons: state.makeoverAppointmentReducer.currentMakeoverAppointmentAddons,
        fetchingMakeoverAppointment: state.makeoverAppointmentReducer.fetchingMakeoverAppointment,
        fetchingMakeoverAppointmentAddons: state.makeoverAppointmentReducer.fetchingMakeoverAppointmentAddons
    };
}

AppointmentInfo.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    getMakeoverAppointment: PropTypes.func.isRequired,
    getMakeoverAppointmentAddons: PropTypes.func.isRequired,
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
    match: PropTypes.shape({
        params: PropTypes.shape({
            makeoverAppointmentId: PropTypes.string.isRequired
        })
    }).isRequired,
    currentMakeoverAppointment: PropTypes.shape({
        clientProfileId: PropTypes.number,
        clientProfileDisplayName: PropTypes.string,
        artistPortfolioId: PropTypes.number,
        artistPortfolioDisplayName: PropTypes.string,
        consultationTypeId: PropTypes.number,
        consultationTypeMinuteLength: PropTypes.number,
        consultationPrice: PropTypes.number,
        serviceTypeId: PropTypes.number,
        serviceTypeDescription: PropTypes.string,
        servicePrice: PropTypes.number,
        makeoverTypeId: PropTypes.number,
        makeoverTypeDescription: PropTypes.string,
        appointmentDate: PropTypes.string,
        dateScheduled: PropTypes.string
    }),
    currentMakeoverAppointmentAddons: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingMakeoverAppointment: PropTypes.bool.isRequired,
    fetchingMakeoverAppointmentAddons: PropTypes.bool.isRequired
};

AppointmentInfo.defaultProps = {
    currentMakeoverAppointment: null
};

export default withRouter(connect(
    mapStateToProps,
    {
        getMakeoverAppointment,
        getMakeoverAppointmentAddons,
        setCurrentPage
    }
)(AppointmentInfo));
