import React from 'react';
import PropTypes from 'prop-types';

import DisplayUserCustomizableProperties from './DisplayUserCustomizableProperties';
import EditUserCustomizableProperties from './EditUserCustomizableProperties';

const AllergiesAndSensitivities = (props) => {
    if (!props.ownsClientProfile && !props.currentSession.isArtist) {
        return null;
    }

    if (props.editingClientAllergiesAndSensitivities) {
        return (
            <EditUserCustomizableProperties
                currentSession={props.currentSession}
                label="Edit Allergies &amp; Sensitivities"
                dropdownLabel="Allergy/Sensitivity"
                textboxLabel="Custom Allergy Sensitivity"
                userIdentifierKey="clientProfileId"
                propertyIdentifierKey="allergySensitivityId"
                propertyDescriptionKey="allergySensitivityDescription"
                userIdentifier={props.clientProfileId}
                userProperties={props.clientAllergiesAndSensitivities}
                properties={props.allergiesAndSensitivities}
                fetchingAddProperty={props.fetchingAddClientAllergySensitivity}
                fetchingRemoveProperty={props.fetchingRemoveClientAllergySensitivity}
                fetchingAddCustomProperty={props.fetchingAddCustomAllergySensitivity}
                onAddProperty={props.onAddClientAllergySensitivity}
                onAddCustomProperty={props.onAddCustomAllergySensitivity}
                onDisableEditing={props.onDisableClientAllergySensitivityEditing}
                onRemoveProperty={props.onRemoveClientAllergySensitivity}
            />
        );
    }

    return (
        <DisplayUserCustomizableProperties
            label="Allergies &amp; Sensitivities"
            properties={props.clientAllergiesAndSensitivities}
            descriptionKey="allergySensitivityDescription"
            onEnableEditing={props.onEnableClientAllergySensitivityEditing}
            ownsProperties={props.ownsClientProfile}
        />
    );
};

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
    clientAllergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object),
    allergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object),
    fetchingAddClientAllergySensitivity: PropTypes.bool,
    fetchingRemoveClientAllergySensitivity: PropTypes.bool,
    fetchingAddCustomAllergySensitivity: PropTypes.bool,
    editingClientAllergiesAndSensitivities: PropTypes.bool,
    onAddClientAllergySensitivity: PropTypes.func,
    onAddCustomAllergySensitivity: PropTypes.func,
    onDisableClientAllergySensitivityEditing: PropTypes.func,
    onEnableClientAllergySensitivityEditing: PropTypes.func,
    onRemoveClientAllergySensitivity: PropTypes.func,
    ownsClientProfile: PropTypes.bool
};

AllergiesAndSensitivities.defaultProps = {
    clientAllergiesAndSensitivities: [],
    allergiesAndSensitivities: [],
    fetchingAddClientAllergySensitivity: false,
    fetchingRemoveClientAllergySensitivity: false,
    fetchingAddCustomAllergySensitivity: false,
    editingClientAllergiesAndSensitivities: false,
    onAddClientAllergySensitivity: () => {},
    onAddCustomAllergySensitivity: () => {},
    onDisableClientAllergySensitivityEditing: () => {},
    onEnableClientAllergySensitivityEditing: () => {},
    onRemoveClientAllergySensitivity: () => {},
    ownsClientProfile: false
};

export default AllergiesAndSensitivities;
