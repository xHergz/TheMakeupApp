import React from 'react';
import PropTypes from 'prop-types';

import DisplayUserCustomizableProperties from './DisplayUserCustomizableProperties';
import EditUserCustomizableProperties from './EditUserCustomizableProperties';

const ProductPreferences = (props) => {
    if (!props.ownsClientProfile && !props.currentSession.isArtist) {
        return null;
    }

    if (props.editingClientProductPreferences) {
        return (
            <EditUserCustomizableProperties
                currentSession={props.currentSession}
                label="Edit Preferences"
                dropdownLabel="Product Preference"
                textboxLabel="Custom Product Preference"
                userIdentifierKey="clientProfileId"
                propertyIdentifierKey="productPreferenceId"
                propertyDescriptionKey="productPreferenceDescription"
                userIdentifier={props.clientProfileId}
                userProperties={props.clientProductPreferences}
                properties={props.productPreferences}
                fetchingAddProperty={props.fetchingAddClientProductPreference}
                fetchingRemoveProperty={props.fetchingRemoveClientProductPreference}
                fetchingAddCustomProperty={props.fetchingAddCustomProductPreference}
                onAddProperty={props.onAddClientProductPreference}
                onAddCustomProperty={props.onAddCustomProductPreference}
                onDisableEditing={props.onDisableClientProductPreferenceEditing}
                onRemoveProperty={props.onRemoveClientProductPreference}
            />
        );
    }

    return (
        <DisplayUserCustomizableProperties
            label="Product Preferences"
            properties={props.clientProductPreferences}
            descriptionKey="productPreferenceDescription"
            onEnableEditing={props.onEnableClientProductPreferenceEditing}
            ownsProperties={props.ownsClientProfile}
        />
    );
};

ProductPreferences.propTypes = {
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired
    }).isRequired,
    clientProfileId: PropTypes.number.isRequired,
    clientProductPreferences: PropTypes.arrayOf(PropTypes.object),
    productPreferences: PropTypes.arrayOf(PropTypes.object),
    fetchingAddClientProductPreference: PropTypes.bool,
    fetchingRemoveClientProductPreference: PropTypes.bool,
    fetchingAddCustomProductPreference: PropTypes.bool,
    editingClientProductPreferences: PropTypes.bool,
    onAddClientProductPreference: PropTypes.func,
    onAddCustomProductPreference: PropTypes.func,
    onDisableClientProductPreferenceEditing: PropTypes.func,
    onEnableClientProductPreferenceEditing: PropTypes.func,
    onRemoveClientProductPreference: PropTypes.func,
    ownsClientProfile: PropTypes.bool
};

ProductPreferences.defaultProps = {
    clientProductPreferences: [],
    productPreferences: [],
    fetchingAddClientProductPreference: false,
    fetchingRemoveClientProductPreference: false,
    fetchingAddCustomProductPreference: false,
    editingClientProductPreferences: false,
    onAddClientProductPreference: () => { },
    onAddCustomProductPreference: () => { },
    onDisableClientProductPreferenceEditing: () => { },
    onEnableClientProductPreferenceEditing: () => { },
    onRemoveClientProductPreference: () => { },
    ownsClientProfile: false
};

export default ProductPreferences;
