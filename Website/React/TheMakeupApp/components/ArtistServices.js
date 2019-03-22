import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../Common/components/Button';
import DropdownInput from '../../Common/components/DropdownInput';
import Loader from '../../Common/components/Loader';
import Modal from '../../Common/components/Modal';
import {
    validatePrice,
    validateDescription
} from '../../Common/helpers/validationUtilities';
import {
    addArtistMakeoverOffered,
    deleteArtistMakeoverOffered,
    disableArtistMakeoversOfferedEditing,
    enableArtistMakeoversOfferedEditing,
    getArtistMakesoversOffered,
    getMakeoverTypes
} from '../actions/ArtistMakeoverOfferedActions';
import {
    addArtistService,
    deleteArtistService,
    disableArtistServicesEditing,
    enableArtistServicesEditing,
    getArtistServices,
    getServiceTypes
} from '../actions/ArtistServiceActions';
import {
    addArtistServiceConsultation,
    deleteArtistServiceConsultation,
    disableArtistServiceConsultationsEditing,
    enableArtistServiceConsultationsEditing,
    getArtistServiceConsultations,
    getConsultationTypes
} from '../actions/ArtistServiceConsultationActions';
import {
    addArtistServiceAddon,
    deleteArtistServiceAddon,
    disableArtistServiceAddonEditing,
    enableArtistServiceAddonEditing,
    getArtistServiceAddons
} from '../actions/ArtistServiceAddonActions';
import { goToMakeoverAppointmentSetup } from '../actions/MakeoverAppointmentActions';
import MakeoverOffered from './MakeoverOffered';
import WarningBlock from './WarningBlock';

import '../../../Css/Services.css';
import TextInput from '../../Common/components/TextInput';

class ArtistServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canAddService: false,
            canAddServiceConsultation: false,
            canAddServiceAddon: false,
            editing: false,
            currentMakeoverTypeId: null,
            currentServiceTypeId: null
        };
        this.addServiceInputValidityChanged = this.addServiceInputValidityChanged.bind(this);
        this.addServiceAddonInputChanged = this.addServiceAddonInputChanged.bind(this);
        this.addServiceConsultationInputChanged = this.addServiceConsultationInputChanged.bind(this);
        this.disableEditing = this.disableEditing.bind(this);
        this.enableEditing = this.enableEditing.bind(this);
        this.fetchingData = this.fetchingData.bind(this);
        this.openAddServiceModal = this.openAddServiceModal.bind(this);
        this.openAddServiceAddonModal = this.openAddServiceAddonModal.bind(this);
        this.openAddServiceConsultationModal = this.openAddServiceConsultationModal.bind(this);
        this.renderEditButton = this.renderEditButton.bind(this);
        this.renderAddMakeoverOfferedButton = this.renderAddMakeoverOfferedButton.bind(this);
        this.renderMakeoverOffered = this.renderMakeoverOffered.bind(this);
        this.renderMakeoversOffered = this.renderMakeoversOffered.bind(this);
        this.renderSubmitAddMakeoverOfferedButton = this.renderSubmitAddMakeoverOfferedButton.bind(this);
        this.renderSubmitAddServiceButton = this.renderSubmitAddServiceButton.bind(this);
        this.renderSubmitAddServiceAddonButton = this.renderSubmitAddServiceAddonButton.bind(this);
        this.renderSubmitAddServiceConsultationButton = this.renderSubmitAddServiceConsultationButton.bind(this);
        this.addMakeoverOfferedModal = React.createRef();
        this.makeoverTypeInput = React.createRef();
        this.addServiceModal = React.createRef();
        this.serviceTypeInput = React.createRef();
        this.servicePriceInput = React.createRef();
        this.addServiceAddonModal = React.createRef();
        this.serviceAddonDescriptionInput = React.createRef();
        this.serviceAddonPriceInput = React.createRef();
        this.addServiceConsultationModal = React.createRef();
        this.consultationTypeInput = React.createRef();
        this.serviceConsultationPriceInput = React.createRef();
    }

    componentDidMount() {
        if (this.props.currentArtistPortfolio !== null) {
            this.props.getArtistMakesoversOffered(this.props.artistDisplayName);
            this.props.getMakeoverTypes();
            this.props.getArtistServices(this.props.artistDisplayName);
            this.props.getServiceTypes();
            this.props.getArtistServiceConsultations(this.props.artistDisplayName);
            this.props.getConsultationTypes();
            this.props.getArtistServiceAddons(this.props.artistDisplayName);
        }
    }

    addServiceInputValidityChanged() {
        if (this.servicePriceInput.current.isValid()) {
            this.setState({
                canAddService: true
            });
        }
        else {
            this.setState({
                canAddService: false
            });
        }
    }

    addServiceAddonInputChanged() {
        if (this.serviceAddonDescriptionInput.current.isValid() && !this.serviceAddonDescriptionInput.current.isEmpty()
            && this.serviceAddonPriceInput.current.isValid()) {
            this.setState({
                canAddServiceAddon: true
            });
        }
        else {
            this.setState({
                canAddServiceAddon: false
            });
        }
    }

    addServiceConsultationInputChanged() {
        if (!this.serviceConsultationPriceInput.current.isEmpty() && this.serviceConsultationPriceInput.current.isValid()) {
            this.setState({
                canAddServiceConsultation: true
            });
        }
        else {
            this.setState({
                canAddServiceConsultation: false
            });
        }
    }

    disableEditing() {
        this.setState({
            editing: false
        });
    }

    enableEditing() {
        this.setState({
            editing: true
        });
    }

    fetchingData() {
        return (
            this.props.fetchingArtistMakeoversOffered
            || this.props.fetchingMakeoverTypes
            || this.props.fetchingArtistServices
            || this.props.fetchingServiceTypes
            || this.props.fetchingArtistServiceConsultations
            || this.props.fetchingConsultationTypes
            || this.props.fetchingArtistServiceAddons
        );
    }

    openAddServiceModal(artistMakeoverTypeId) {
        this.setState({
            currentMakeoverTypeId: artistMakeoverTypeId
        });
        this.addServiceModal.current.openModal();
    }

    openAddServiceAddonModal(artistServiceId) {
        this.setState({
            currentServiceTypeId: artistServiceId
        });
        this.addServiceAddonModal.current.openModal();
    }

    openAddServiceConsultationModal(artistServiceId) {
        this.setState({
            currentServiceTypeId: artistServiceId
        });
        this.addServiceConsultationModal.current.openModal();
    }

    renderEditButton() {
        if (!this.props.ownsArtistPortfolio) {
            return null;
        }

        if (this.state.editing) {
            return (
                <Button
                    label="Done"
                    onClickHandler={this.disableEditing}
                />
            );
        }

        return (
            <Button
                label="Edit"
                onClickHandler={this.enableEditing}
            />
        );
    }

    renderAddMakeoverOfferedButton() {
        if (!this.state.editing) {
            return null;
        }

        return (
            <Button
                label="Add Makeover Type"
                onClickHandler={() => { this.addMakeoverOfferedModal.current.openModal(); }}
            />
        );
    }

    renderMakeoverOffered(makeoverOffered) {
        return (
            <MakeoverOffered
                makeoverOffered={makeoverOffered}
                makeoverServices={this.props.artistServices.filter((service) => { return service.artistMakeoverOfferedId === makeoverOffered.artistMakeoverOfferedId; })}
                makeoverServiceAddons={this.props.artistServiceAddons}
                makeoverServiceConsultations={this.props.artistServiceConsultations}
                editing={this.state.editing}
                onDeleteMakeover={this.props.deleteArtistMakeoverOffered}
                onAddService={this.openAddServiceModal}
                onDeleteService={this.props.deleteArtistService}
                onAddServiceAddon={this.openAddServiceAddonModal}
                onDeleteServiceAddon={this.props.deleteArtistServiceAddon}
                onAddServiceConsultation={this.openAddServiceConsultationModal}
                onDeleteServiceConsultation={this.props.deleteArtistServiceConsultation}
                onRequestAppointment={this.props.goToMakeoverAppointmentSetup}
                currentArtistDisplayName={this.props.artistDisplayName}
                currentArtistPortfolioId={this.props.currentArtistPortfolio.artistPortfolioId}
                ownsArtistPortfolio={this.props.ownsArtistPortfolio}
            />
        );
    }

    renderMakeoversOffered() {
        if (this.props.artistMakeoversOffered.length === 0) {
            return <h6 className="none-message">Sorry, I&#39;m Currently Not Offering Any Services!</h6>;
        }

        if (this.props.ownsArtistPortfolio) {
            return this.props.artistMakeoversOffered.map((makeover) => { return this.renderMakeoverOffered(makeover); });
        }

        const completeServices = this.props.artistMakeoversOffered.filter((makeover) => {
            console.log('Makeover:', makeover);
            const makeoverServices = this.props.artistServices.filter((service) => {
                console.log('Service:', service);
                const serviceConsultations = this.props.artistServiceConsultations.filter((consultation) => {
                    return consultation.artistServiceId === service.artistServiceId;
                });
                console.log('Service Consultations:', serviceConsultations);
                return serviceConsultations.length > 0 && service.artistMakeoverOfferedId === makeover.artistMakeoverOfferedId;
            });
            console.log('Makeover Services:', makeoverServices);
            return makeoverServices.length > 0;
        });

        console.log('Complete Service:', completeServices);

        if (completeServices.length === 0) {
            return (
                <WarningBlock
                    message="Sorry, I'm not offering any services right now!"
                />
            );
        }
        return completeServices.map((makeover) => { return this.renderMakeoverOffered(makeover); });
    }

    renderSubmitAddMakeoverOfferedButton() {
        if (this.props.fetchingAddArtistMakeoverOffered) {
            return <Loader />;
        }

        return (
            <div className="service-add-button-container">
                <Button
                    label="Submit"
                    onClickHandler={
                        () => {
                            this.props.addArtistMakeoverOffered(
                                this.props.currentArtistPortfolio.artistPortfolioId,
                                this.makeoverTypeInput.current.getValue(),
                                this.props.artistDisplayName
                            );
                        }
                    }
                />
            </div>
        );
    }

    renderSubmitAddServiceButton() {
        if (this.props.fetchingAddArtistService) {
            return <Loader />;
        }

        return (
            <div className="service-add-button-container">
                <Button
                    label="Submit"
                    onClickHandler={
                        () => {
                            this.props.addArtistService(
                                this.state.currentMakeoverTypeId,
                                this.serviceTypeInput.current.getValue(),
                                this.servicePriceInput.current.getValue(),
                                this.props.artistDisplayName
                            );
                        }
                    }
                    disabled={!this.state.canAddService}
                />
            </div>
        );
    }

    renderSubmitAddServiceAddonButton() {
        if (this.props.fetchingAddArtistServiceAddon) {
            return <Loader />;
        }

        return (
            <div className="service-add-button-container">
                <Button
                    label="Submit"
                    onClickHandler={
                        () => {
                            this.props.addArtistServiceAddon(
                                this.state.currentServiceTypeId,
                                this.serviceAddonDescriptionInput.current.getValue(),
                                this.serviceAddonPriceInput.current.getValue(),
                                this.props.artistDisplayName
                            );
                        }
                    }
                    disabled={!this.state.canAddServiceAddon}
                />
            </div>
        );
    }

    renderSubmitAddServiceConsultationButton() {
        if (this.props.fetchingAddArtistServiceConsultation) {
            return <Loader />;
        }

        return (
            <div className="service-add-button-container">
                <Button
                    label="Submit"
                    onClickHandler={
                        () => {
                            this.props.addArtistServiceConsultation(
                                this.state.currentServiceTypeId,
                                this.consultationTypeInput.current.getValue(),
                                this.serviceConsultationPriceInput.current.getValue(),
                                this.props.artistDisplayName
                            );
                        }
                    }
                    disabled={!this.state.canAddServiceConsultation}
                />
            </div>
        );
    }

    render() {
        if (this.fetchingData()) {
            return <Loader />;
        }

        if (this.props.currentArtistPortfolio === null) {
            return null;
        }

        return (
            <div className="artist-service-container">
                <div className="form-info-actions">
                    <div className="form-info-action" />
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        {this.renderEditButton()}
                    </div>
                </div>
                <div className="artist-makeovers-offered">
                    {this.renderMakeoversOffered()}
                    <div className="service-add-button-container">
                        {this.renderAddMakeoverOfferedButton()}
                    </div>
                </div>
                <Modal
                    ref={this.addMakeoverOfferedModal}
                >
                    <DropdownInput
                        ref={this.makeoverTypeInput}
                        label="Makeover Type"
                        options={this.props.makeoverTypes}
                        valueKey="makeoverTypeId"
                        labelKey="makeoverTypeDescription"
                    />
                    {this.renderSubmitAddMakeoverOfferedButton()}
                </Modal>
                <Modal
                    ref={this.addServiceModal}
                >
                    <DropdownInput
                        ref={this.serviceTypeInput}
                        label="Service Type"
                        options={this.props.serviceTypes}
                        valueKey="serviceTypeId"
                        labelKey="serviceTypeDescription"
                    />
                    <TextInput
                        ref={this.servicePriceInput}
                        label="Price"
                        onValidate={validatePrice}
                        onValidityChanged={this.addServiceInputValidityChanged}
                    />
                    {this.renderSubmitAddServiceButton()}
                </Modal>
                <Modal
                    ref={this.addServiceAddonModal}
                >
                    <TextInput
                        ref={this.serviceAddonDescriptionInput}
                        label="Description"
                        onValidate={validateDescription}
                        onValidityChanged={this.addServiceAddonInputChanged}
                    />
                    <TextInput
                        ref={this.serviceAddonPriceInput}
                        label="Price"
                        onValidate={validatePrice}
                        onValidityChanged={this.addServiceAddonInputChanged}
                    />
                    {this.renderSubmitAddServiceAddonButton()}
                </Modal>
                <Modal
                    ref={this.addServiceConsultationModal}
                >
                    <DropdownInput
                        ref={this.consultationTypeInput}
                        label="Consultation Type"
                        options={this.props.consultationTypes}
                        valueKey="consultationTypeId"
                        labelKey="minuteLength"
                    />
                    <TextInput
                        ref={this.serviceConsultationPriceInput}
                        label="Price"
                        onValidate={validatePrice}
                        onValidityChanged={this.addServiceConsultationInputChanged}
                    />
                    {this.renderSubmitAddServiceConsultationButton()}
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        artistMakeoversOffered: state.artistMakeoverOfferedReducer.artistMakeoversOffered,
        makeoverTypes: state.artistMakeoverOfferedReducer.makeoverTypes,
        fetchingArtistMakeoversOffered: state.artistMakeoverOfferedReducer.fetchingArtistMakeoversOffered,
        fetchingMakeoverTypes: state.artistMakeoverOfferedReducer.fetchingMakeoverTypes,
        fetchingAddArtistMakeoverOffered: state.artistMakeoverOfferedReducer.fetchingAddArtistMakeoverOffered,
        fetchingDeleteArtistMakeoverOffered: state.artistMakeoverOfferedReducer.fetchingDeleteArtistMakeoverOffered,
        editingArtistMakeoversOffered: state.artistMakeoverOfferedReducer.editingArtistMakeoversOffered,
        artistServices: state.artistServiceReducer.artistServices,
        serviceTypes: state.artistServiceReducer.serviceTypes,
        fetchingArtistServices: state.artistServiceReducer.fetchingArtistServices,
        fetchingServiceTypes: state.artistServiceReducer.fetchingServiceTypes,
        fetchingAddArtistService: state.artistServiceReducer.fetchingAddArtistService,
        fetchingDeleteArtistService: state.artistServiceReducer.fetchingDeleteArtistService,
        editingArtistServices: state.artistServiceReducer.editingArtistServices,
        artistServiceConsultations: state.artistServiceConsultationReducer.artistServiceConsultations,
        consultationTypes: state.artistServiceConsultationReducer.consultationTypes,
        fetchingArtistServiceConsultations: state.artistServiceConsultationReducer.fetchingArtistServiceConsultations,
        fetchingConsultationTypes: state.artistServiceConsultationReducer.fetchingConsultationTypes,
        fetchingAddArtistServiceConsultation: state.artistServiceConsultationReducer.fetchingAddArtistServiceConsultation,
        fetchingDeleteArtistServiceConsultation: state.artistServiceConsultationReducer.fetchingDeleteArtistServiceConsultation,
        editingArtistServiceConsultations: state.artistServiceConsultationReducer.editingArtistServiceConsultations,
        artistServiceAddons: state.artistServiceAddonReducer.artistServiceAddons,
        fetchingArtistServiceAddons: state.artistServiceAddonReducer.fetchingArtistServiceAddons,
        fetchingAddArtistServiceAddon: state.artistServiceAddonReducer.fetchingAddArtistServiceAddon,
        fetchingDeleteArtistServiceAddon: state.artistServiceAddonReducer.fetchingDeleteArtistServiceAddon,
        editingArtistServiceAddons: state.artistServiceAddonReducer.editingArtistServiceAddons
    };
}

ArtistServices.propTypes = {
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
    addArtistMakeoverOffered: PropTypes.func.isRequired,
    deleteArtistMakeoverOffered: PropTypes.func.isRequired,
    disableArtistMakeoversOfferedEditing: PropTypes.func.isRequired,
    enableArtistMakeoversOfferedEditing: PropTypes.func.isRequired,
    getArtistMakesoversOffered: PropTypes.func.isRequired,
    getMakeoverTypes: PropTypes.func.isRequired,
    artistMakeoversOffered: PropTypes.arrayOf(PropTypes.object).isRequired,
    makeoverTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistMakeoversOffered: PropTypes.bool.isRequired,
    fetchingMakeoverTypes: PropTypes.bool.isRequired,
    fetchingAddArtistMakeoverOffered: PropTypes.bool.isRequired,
    fetchingDeleteArtistMakeoverOffered: PropTypes.bool.isRequired,
    editingArtistMakeoversOffered: PropTypes.bool.isRequired,
    addArtistService: PropTypes.func.isRequired,
    deleteArtistService: PropTypes.func.isRequired,
    disableArtistServicesEditing: PropTypes.func.isRequired,
    enableArtistServicesEditing: PropTypes.func.isRequired,
    getArtistServices: PropTypes.func.isRequired,
    getServiceTypes: PropTypes.func.isRequired,
    artistServices: PropTypes.arrayOf(PropTypes.object).isRequired,
    serviceTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistServices: PropTypes.bool.isRequired,
    fetchingServiceTypes: PropTypes.bool.isRequired,
    fetchingAddArtistService: PropTypes.bool.isRequired,
    fetchingDeleteArtistService: PropTypes.bool.isRequired,
    editingArtistServices: PropTypes.bool.isRequired,
    addArtistServiceConsultation: PropTypes.func.isRequired,
    deleteArtistServiceConsultation: PropTypes.func.isRequired,
    disableArtistServiceConsultationsEditing: PropTypes.func.isRequired,
    enableArtistServiceConsultationsEditing: PropTypes.func.isRequired,
    getArtistServiceConsultations: PropTypes.func.isRequired,
    getConsultationTypes: PropTypes.func.isRequired,
    artistServiceConsultations: PropTypes.arrayOf(PropTypes.object).isRequired,
    consultationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistServiceConsultations: PropTypes.bool.isRequired,
    fetchingConsultationTypes: PropTypes.bool.isRequired,
    fetchingAddArtistServiceConsultation: PropTypes.bool.isRequired,
    fetchingDeleteArtistServiceConsultation: PropTypes.bool.isRequired,
    editingArtistServiceConsultations: PropTypes.bool.isRequired,
    addArtistServiceAddon: PropTypes.func.isRequired,
    deleteArtistServiceAddon: PropTypes.func.isRequired,
    disableArtistServiceAddonEditing: PropTypes.func.isRequired,
    enableArtistServiceAddonEditing: PropTypes.func.isRequired,
    getArtistServiceAddons: PropTypes.func.isRequired,
    artistServiceAddons: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistServiceAddons: PropTypes.bool.isRequired,
    fetchingAddArtistServiceAddon: PropTypes.bool.isRequired,
    fetchingDeleteArtistServiceAddon: PropTypes.bool.isRequired,
    editingArtistServiceAddons: PropTypes.bool.isRequired,
    goToMakeoverAppointmentSetup: PropTypes.func.isRequired,
    artistDisplayName: PropTypes.string.isRequired,
    currentArtistPortfolio: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string
    }),
    ownsArtistPortfolio: PropTypes.bool
};

ArtistServices.defaultProps = {
    currentArtistPortfolio: null,
    ownsArtistPortfolio: false
};

export default withRouter(connect(
    mapStateToProps,
    {
        addArtistMakeoverOffered,
        deleteArtistMakeoverOffered,
        disableArtistMakeoversOfferedEditing,
        enableArtistMakeoversOfferedEditing,
        getArtistMakesoversOffered,
        getMakeoverTypes,
        addArtistService,
        deleteArtistService,
        disableArtistServicesEditing,
        enableArtistServicesEditing,
        getArtistServices,
        getServiceTypes,
        addArtistServiceConsultation,
        deleteArtistServiceConsultation,
        disableArtistServiceConsultationsEditing,
        enableArtistServiceConsultationsEditing,
        getArtistServiceConsultations,
        getConsultationTypes,
        addArtistServiceAddon,
        deleteArtistServiceAddon,
        disableArtistServiceAddonEditing,
        enableArtistServiceAddonEditing,
        getArtistServiceAddons,
        goToMakeoverAppointmentSetup
    }
)(ArtistServices));
