import PropTypes from 'prop-types';
import React from 'react';

import '../../../Css/Services.css';
import Button from '../../Common/components/Button';

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.renderRemoveButton = this.renderRemoveButton.bind(this);
        this.renderDeleteInfoButton = this.renderDeleteInfoButton.bind(this);
        this.renderServiceInfoRow = this.renderServiceInfoRow.bind(this);
        this.renderAddInfoButton = this.renderAddInfoButton.bind(this);
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

    renderServiceInfoRow(id, description, price, deleteMethod) {
        return (
            <div className="service-info-row" key={id}>
                <div className="service-info-label">
                    <h6>{description}</h6>
                </div>
                <div>
                    <h6>${price}</h6>
                </div>
                <div>
                    {this.renderDeleteInfoButton(id, deleteMethod)}
                </div>
            </div>
        );
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

    render() {
        return (
            <div className="service" key={this.props.service.artistServiceId}>
                <div className="service-title">
                    <h3>{this.props.service.serviceTypeDescription}</h3>
                    {this.renderRemoveButton()}
                </div>
                <div>
                    <h5>Consultations</h5>
                </div>
                <div className="service-info">
                    {this.props.serviceConsultations.map((serviceConsultation) => {
                        return this.renderServiceInfoRow(
                            serviceConsultation.artistServiceConsultationId,
                            `${serviceConsultation.minuteLength} mins`,
                            serviceConsultation.price,
                            this.props.onDeleteServiceConsultation
                        );
                    })}
                </div>
                <div className="service-add-button-container">
                    {this.renderAddInfoButton(() => { this.props.onAddServiceConsultation(this.props.service.artistServiceId); })}
                </div>
                <div>
                    <h5>Addons</h5>
                </div>
                <div className="service-info">
                    {this.props.serviceAddons.map((serviceAddon) => {
                        return this.renderServiceInfoRow(
                            serviceAddon.artistServiceAddonId,
                            serviceAddon.artistServiceAddonDescription,
                            serviceAddon.price,
                            this.props.onDeleteServiceAddon
                        );
                    })}
                </div>
                <div className="service-add-button-container">
                    {this.renderAddInfoButton(() => { this.props.onAddServiceAddon(this.props.service.artistServiceId); })}
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
        price: PropTypes.number
    }).isRequired,
    serviceAddons: PropTypes.arrayOf(PropTypes.object),
    serviceConsultations: PropTypes.arrayOf(PropTypes.object),
    editing: PropTypes.bool,
    onDeleteService: PropTypes.func,
    onAddServiceAddon: PropTypes.func,
    onDeleteServiceAddon: PropTypes.func,
    onAddServiceConsultation: PropTypes.func,
    onDeleteServiceConsultation: PropTypes.func,
    currentArtistDisplayName: PropTypes.string.isRequired,
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
    ownsArtistPortfolio: false
};

export default Service;