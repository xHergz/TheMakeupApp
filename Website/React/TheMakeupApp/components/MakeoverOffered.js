import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../Common/components/Button';
import Service from './Service';

import '../../../Css/Services.css';

class MakeoverOffered extends React.Component {
    constructor(props) {
        super(props);
        this.renderRemoveButton = this.renderRemoveButton.bind(this);
        this.renderAddServiceButton = this.renderAddServiceButton.bind(this);
        this.renderService = this.renderService.bind(this);
    }

    renderRemoveButton() {
        if (!this.props.editing) {
            return null;
        }

        return (
            <Button
                label="Delete"
                onClickHandler={() => { this.props.onDeleteMakeover(this.props.makeoverOffered.artistMakeoverOfferedId, this.props.currentArtistDisplayName); }}
            />
        );
    }

    renderAddServiceButton() {
        if (!this.props.editing) {
            return null;
        }

        return (
            <Button
                label="Add Service"
                onClickHandler={() => { this.props.onAddService(this.props.makeoverOffered.artistMakeoverOfferedId); }}
            />
        );
    }

    renderService(service) {
        return (
            <Service
                service={service}
                serviceAddons={this.props.makeoverServiceAddons.filter((addon) => { return addon.artistServiceId === service.artistServiceId; })}
                serviceConsultations={this.props.makeoverServiceConsultations.filter((consultation) => { return consultation.artistServiceId === service.artistServiceId; })}
                editing={this.props.editing}
                onDeleteService={this.props.onDeleteService}
                onAddServiceAddon={this.props.onAddServiceAddon}
                onDeleteServiceAddon={this.props.onDeleteServiceAddon}
                onAddServiceConsultation={this.props.onAddServiceConsultation}
                onDeleteServiceConsultation={this.props.onDeleteServiceConsultation}
                onRequestAppointment={this.props.onRequestAppointment}
                currentArtistDisplayName={this.props.currentArtistDisplayName}
                currentArtistPortfolioId={this.props.currentArtistPortfolioId}
                makeoverTypeId={this.props.makeoverOffered.makeoverTypeId}
                makeoverTypeDescription={this.props.makeoverOffered.makeoverTypeDescription}
                ownsArtistPortfolio={this.props.ownsArtistPortfolio}
            />
        );
    }

    render() {
        return (
            <div
                className="makeover-offered"
                key={this.props.makeoverOffered.artistMakeoverOfferedId}
            >
                <div className="makeover-offered-title">
                    <h3>{this.props.makeoverOffered.makeoverTypeDescription}</h3>
                    {this.renderRemoveButton()}
                </div>
                <div>
                    {this.props.makeoverServices.map((service) => { return this.renderService(service); })}
                </div>
                <div className="service-add-button-container">
                    {this.renderAddServiceButton()}
                </div>
            </div>
        );
    }
}

MakeoverOffered.propTypes = {
    makeoverOffered: PropTypes.shape({
        artistMakeoverOfferedId: PropTypes.number,
        artistPortfolioId: PropTypes.number,
        makeoverTypeId: PropTypes.number,
        makeoverTypeDescription: PropTypes.string
    }).isRequired,
    makeoverServices: PropTypes.arrayOf(PropTypes.object),
    makeoverServiceAddons: PropTypes.arrayOf(PropTypes.object),
    makeoverServiceConsultations: PropTypes.arrayOf(PropTypes.object),
    editing: PropTypes.bool,
    onDeleteMakeover: PropTypes.func,
    onAddService: PropTypes.func,
    onDeleteService: PropTypes.func,
    onAddServiceAddon: PropTypes.func,
    onDeleteServiceAddon: PropTypes.func,
    onAddServiceConsultation: PropTypes.func,
    onDeleteServiceConsultation: PropTypes.func,
    onRequestAppointment: PropTypes.func,
    currentArtistDisplayName: PropTypes.string.isRequired,
    currentArtistPortfolioId: PropTypes.number.isRequired,
    ownsArtistPortfolio: PropTypes.bool
};

MakeoverOffered.defaultProps = {
    makeoverServices: [],
    makeoverServiceAddons: [],
    makeoverServiceConsultations: [],
    editing: false,
    onDeleteMakeover: () => {},
    onAddService: () => {},
    onDeleteService: () => {},
    onAddServiceAddon: () => {},
    onDeleteServiceAddon: () => {},
    onAddServiceConsultation: () => {},
    onDeleteServiceConsultation: () => {},
    onRequestAppointment: () => {},
    ownsArtistPortfolio: false
};

export default MakeoverOffered;
