import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import {
    addClientAllergySensitivity,
    addCustomAllergySensitivity,
    disableClientAllergySensitivityEditing,
    enableClientAllergySensitivityEditing,
    getAllergiesAndSensitivities,
    getClientAllergiesAndSensitivities,
    removeClientAllergySensitivity
} from '../actions/ClientAllergySensitivityActions';
import DisplayUserCustomizableProperties from './DisplayUserCustomizableProperties';
import EditUserCustomizableProperties from './EditUserCustomizableProperties';

class AllergiesAndSensitivities extends React.Component {
    componentDidMount() {
        if ((this.props.ownsClientProfile || this.props.currentSession.isArtist) && this.props.currentClientProfile !== null) {
            this.props.getClientAllergiesAndSensitivities(this.props.clientDisplayName);
            if (this.props.ownsClientProfile) {
                this.props.getAllergiesAndSensitivities(this.props.clientDisplayName);
            }
        }
    }

    render() {
        if (this.props.fetchingClientAllergiesAndSensitivities || this.props.fetchingAllergiesAndSensitivities) {
            return <Loader />;
        }

        if (this.props.currentClientProfile === null || (!this.props.ownsClientProfile && !this.props.currentSession.isArtist)) {
            return null;
        }

        if (this.props.editingClientAllergiesAndSensitivities) {
            return (
                <EditUserCustomizableProperties
                    currentSession={this.props.currentSession}
                    label="Edit Allergies &amp; Sensitivities"
                    dropdownLabel="Allergy/Sensitivity"
                    textboxLabel="Custom Allergy Sensitivity"
                    userIdentifierKey="clientProfileId"
                    propertyIdentifierKey="allergySensitivityId"
                    propertyDescriptionKey="allergySensitivityDescription"
                    userIdentifier={this.props.currentClientProfile.clientProfileId}
                    userProperties={this.props.clientAllergiesAndSensitivities}
                    properties={this.props.allergiesAndSensitivities}
                    fetchingAddProperty={this.props.fetchingAddClientAllergySensitivity}
                    fetchingRemoveProperty={this.props.fetchingRemoveClientAllergySensitivity}
                    fetchingAddCustomProperty={this.props.fetchingAddCustomAllergySensitivity}
                    onAddProperty={this.props.addClientAllergySensitivity}
                    onAddCustomProperty={this.props.addCustomAllergySensitivity}
                    onDisableEditing={this.props.disableClientAllergySensitivityEditing}
                    onRemoveProperty={this.props.removeClientAllergySensitivity}
                />
            );
        }

        return (
            <DisplayUserCustomizableProperties
                label="Allergies &amp; Sensitivities"
                properties={this.props.clientAllergiesAndSensitivities}
                descriptionKey="allergySensitivityDescription"
                onEnableEditing={this.props.enableClientAllergySensitivityEditing}
                ownsProperties={this.props.ownsClientProfile}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        clientAllergiesAndSensitivities: state.clientAllergySensitivityReducer.clientAllergiesAndSensitivities,
        allergiesAndSensitivities: state.clientAllergySensitivityReducer.allergiesAndSensitivities,
        fetchingClientAllergiesAndSensitivities: state.clientAllergySensitivityReducer.fetchingClientAllergiesAndSensitivities,
        fetchingAllergiesAndSensitivities: state.clientAllergySensitivityReducer.fetchingAllergiesAndSensitivities,
        fetchingAddClientAllergySensitivity: state.clientAllergySensitivityReducer.fetchingAddClientAllergySensitivity,
        fetchingRemoveClientAllergySensitivity: state.clientAllergySensitivityReducer.fetchingRemoveClientAllergySensitivity,
        fetchingAddCustomAllergySensitivity: state.clientAllergySensitivityReducer.fetchingAddCustomAllergySensitivity,
        editingClientAllergiesAndSensitivities: state.clientAllergySensitivityReducer.editingClientAllergiesAndSensitivities
    };
}

AllergiesAndSensitivities.propTypes = {
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired,
        isClient: PropTypes.bool.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired,
    clientProfileId: PropTypes.number.isRequired,
    clientAllergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object).isRequired,
    allergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingClientAllergiesAndSensitivities: PropTypes.bool.isRequired,
    fetchingAllergiesAndSensitivities: PropTypes.bool.isRequired,
    fetchingAddClientAllergySensitivity: PropTypes.bool.isRequired,
    fetchingRemoveClientAllergySensitivity: PropTypes.bool.isRequired,
    fetchingAddCustomAllergySensitivity: PropTypes.bool.isRequired,
    editingClientAllergiesAndSensitivities: PropTypes.bool.isRequired,
    addClientAllergySensitivity: PropTypes.func.isRequired,
    addCustomAllergySensitivity: PropTypes.func.isRequired,
    disableClientAllergySensitivityEditing: PropTypes.func.isRequired,
    enableClientAllergySensitivityEditing: PropTypes.func.isRequired,
    getAllergiesAndSensitivities: PropTypes.func.isRequired,
    getClientAllergiesAndSensitivities: PropTypes.func.isRequired,
    removeClientAllergySensitivity: PropTypes.func.isRequired,
    clientDisplayName: PropTypes.string,
    currentClientProfile: PropTypes.shape({
        clientProfileId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string,
        eyeColourId: PropTypes.number,
        eyeColourDescription: PropTypes.string,
        hairColourId: PropTypes.number,
        hairColourDescription: PropTypes.string,
        skinToneId: PropTypes.number,
        skinToneDescription: PropTypes.string
    }),
    ownsClientProfile: PropTypes.bool
};

AllergiesAndSensitivities.defaultProps = {
    clientDisplayName: null,
    currentClientProfile: null,
    ownsClientProfile: false
};

export default withRouter(connect(
    mapStateToProps,
    {
        addClientAllergySensitivity,
        addCustomAllergySensitivity,
        disableClientAllergySensitivityEditing,
        enableClientAllergySensitivityEditing,
        getAllergiesAndSensitivities,
        getClientAllergiesAndSensitivities,
        removeClientAllergySensitivity
    }
)(AllergiesAndSensitivities));
