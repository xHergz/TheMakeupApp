import PropTypes from 'prop-types';
import React from 'react';

import '../../../Css/Services.css';
import Button from '../../Common/components/Button';
import WarningBlock from './WarningBlock';

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.renderRemoveButton = this.renderRemoveButton.bind(this);
        this.renderDeleteInfoButton = this.renderDeleteInfoButton.bind(this);
        this.renderServiceInfoRow = this.renderServiceInfoRow.bind(this);
        this.renderServiceConsultations = this.renderServiceConsultations.bind(this);
        this.renderServiceAddons = this.renderServiceAddons.bind(this);
        this.renderAddInfoButton = this.renderAddInfoButton.bind(this);
        this.renderRequestAppointmentButton = this.renderRequestAppointmentButton.bind(this);
    }

    renderRemoveButton() {
        if (!this.props.editing) {
            return null;
        }

        return (
            <Button
                label="Delete"
                onClickHandler={() => { this.props.onDeleteService(this.props.service.artistServiceId, this.props.currentArtistDisplayName); }}
            />
        );
    }

    renderDeleteInfoButton(id, deleteMethod) {
        if (!this.props.editing) {
            return null;
        }

        return (
            <Button
                label="Delete"
                onClickHandler={() => { deleteMethod(id, this.props.currentArtistDisplayName); }}
            />
        );
    }

    renderServiceInfoRow(id, description, price, deleteMethod, key) {
        return (
            <div
                className="service-info-row"
                key={`${key}${id}`}
            >
                <div className="service-info-label">
                    <h6>{description}</h6>
                </div>
                <div className="service-info-detail">
                    <h6>${price}</h6>
                </div>
                <div>
                    {this.renderDeleteInfoButton(id, deleteMethod)}
                </div>
            </div>
        );
    }

    renderServiceConsultations() {
        if (this.props.serviceConsultations.length === 0) {
            return (
                <WarningBlock
                    message="You have no consultations configured for this service, so it won't be shown to clients!"
                />
            );
        }

        return this.props.serviceConsultations.map((serviceConsultation) => {
            return this.renderServiceInfoRow(
                serviceConsultation.artistServiceConsultationId,
                `${serviceConsultation.minuteLength} mins`,
                serviceConsultation.price,
                this.props.onDeleteServiceConsultation,
                'Consultation'
            );
        });
    }

    renderServiceAddons() {
        if (this.props.serviceAddons.length === 0) {
            return <h6 className="none-message-dark">None</h6>;
        }

        return this.props.serviceAddons.map((serviceAddon) => {
            return this.renderServiceInfoRow(
                serviceAddon.artistServiceAddonId,
                serviceAddon.artistServiceAddonDescription,
                serviceAddon.price,
                this.props.onDeleteServiceAddon,
                'Addon'
            );
        });
    }

    renderAddInfoButton(addMethod) {
        if (!this.props.editing) {
            return null;
        }

        return (
            <Button
                label="Add"
                onClickHandler={addMethod}
            />
        );
    }

    renderRequestAppointmentButton() {
        if (this.props.ownsArtistPortfolio) {
            return null;
        }

        return (
            <Button
                label="Request Appointment"
                onClickHandler={() => {
                    this.props.onRequestAppointment(
                        this.props.currentArtistPortfolioId,
                        this.props.currentArtistDisplayName,
                        this.props.makeoverTypeId,
                        this.props.makeoverTypeDescription,
                        this.props.service.serviceTypeId,
                        this.props.service.serviceTypeDescription,
                        this.props.service.basePrice,
                        this.props.service.artistServiceId
                    );
                }}
            />
        );
    }

    render() {
        return (
            <div
                className="service"
                key={`Service${this.props.service.artistMakeoverOfferedId}${this.props.service.artistServiceId}`}
            >
                <div className="service-title">
                    <h3>{this.props.service.serviceTypeDescription}</h3>
                    {this.renderRemoveButton()}
                </div>
                <div>
                    <h5>Consultations</h5>
                </div>
                <div className="service-info">
                    {this.renderServiceConsultations()}
                </div>
                <div className="service-add-button-container">
                    {this.renderAddInfoButton(() => { this.props.onAddServiceConsultation(this.props.service.artistServiceId); })}
                </div>
                <div>
                    <h5>Addons</h5>
                </div>
                <div className="service-info">
                    {this.renderServiceAddons()}
                </div>
                <div className="service-add-button-container">
                    {this.renderAddInfoButton(() => { this.props.onAddServiceAddon(this.props.service.artistServiceId); })}
                </div>
                <div className="service-add-button-container">
                    {this.renderRequestAppointmentButton()}
                </div>
            </div>
        );
    }
}

Service.propTypes = {
    service: PropTypes.shape({
        artistServiceId: PropTypes.number,
        artistMakeoverOfferedId: PropTypes.number,
        serviceTypeId: PropTypes.number,
        serviceTypeDescription: PropTypes.string,
        basePrice: PropTypes.number
    }).isRequired,
    serviceAddons: PropTypes.arrayOf(PropTypes.object),
    serviceConsultations: PropTypes.arrayOf(PropTypes.object),
    editing: PropTypes.bool,
    onDeleteService: PropTypes.func,
    onAddServiceAddon: PropTypes.func,
    onDeleteServiceAddon: PropTypes.func,
    onAddServiceConsultation: PropTypes.func,
    onDeleteServiceConsultation: PropTypes.func,
    onRequestAppointment: PropTypes.func,
    currentArtistDisplayName: PropTypes.string.isRequired,
    currentArtistPortfolioId: PropTypes.number.isRequired,
    makeoverTypeId: PropTypes.number.isRequired,
    makeoverTypeDescription: PropTypes.string.isRequired,
    ownsArtistPortfolio: PropTypes.bool
};

Service.defaultProps = {
    serviceAddons: [],
    serviceConsultations: [],
    editing: false,
    onDeleteService: () => {},
    onAddServiceAddon: () => {},
    onDeleteServiceAddon: () => {},
    onAddServiceConsultation: () => {},
    onDeleteServiceConsultation: () => {},
    onRequestAppointment: () => {},
    ownsArtistPortfolio: false
};

export default Service;
