import React from 'react';
import PropTypes from 'prop-types';

import DisplayAllergiesAndSensitivities from './DisplayAllergiesAndSensitivities';
import EditAllergiesAndSensitivities from './EditAllergiesAndSensitivities';

import '../../../Css/AllergiesAndSensitivities.css';

const AllergiesAndSensitivities = (props) => {
    if (!props.ownsClientProfile && !props.currentSession.isArtist) {
        return null;
    }

    if (props.editingClientAllergiesAndSensitivities) {
        return (
            <EditAllergiesAndSensitivities
                currentSession={props.currentSession}
                clientProfileId={props.clientProfileId}
                clientAllergiesAndSensitivities={props.clientAllergiesAndSensitivities}
                allergiesAndSensitivities={props.allergiesAndSensitivities}
                fetchingAddClientAllergySensitivity={props.fetchingAddClientAllergySensitivity}
                fetchingAddCustomAllergySensitivity={props.fetchingAddCustomAllergySensitivity}
                fetchingRemoveClientAllergySensitivity={props.fetchingRemoveClientAllergySensitivity}
                onAddClientAllergySensitivity={props.onAddClientAllergySensitivity}
                onAddCustomAllergySensitivity={props.onAddCustomAllergySensitivity}
                onDisableClientAllergySensitivityEditing={props.onDisableClientAllergySensitivityEditing}
                onRemoveClientAllergySensitivity={props.onRemoveClientAllergySensitivity}
            />
        );
    }

    return (
        <DisplayAllergiesAndSensitivities
            clientAllergiesAndSensitivities={props.clientAllergiesAndSensitivities}
            onEnableClientAllergySensitivityEditing={props.onEnableClientAllergySensitivityEditing}
            ownsClientProfile={props.ownsClientProfile}
        />
    );
};

AllergiesAndSensitivities.propTypes = {
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired
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
