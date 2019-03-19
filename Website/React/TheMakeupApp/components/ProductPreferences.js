import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import {
    addClientProductPreference,
    addCustomProductPreference,
    disableClientProductPreferenceEditing,
    enableClientProductPreferenceEditing,
    getClientProductPreferences,
    getProductPreferences,
    removeClientProductPreference
} from '../actions/ClientProductPreferenceActions';
import DisplayUserCustomizableProperties from './DisplayUserCustomizableProperties';
import EditUserCustomizableProperties from './EditUserCustomizableProperties';

class ProductPreferences extends React.Component {
    componentDidMount() {
        if ((this.props.ownsClientProfile || this.props.currentSession.isArtist) && this.props.currentClientProfile !== null) {
            this.props.getClientProductPreferences(this.props.clientDisplayName);
            if (this.props.ownsClientProfile) {
                this.props.getProductPreferences(this.props.clientDisplayName);
            }
        }
    }

    render() {
        if (this.props.fetchingClientProductPreferences || this.props.fetchingProductPreferences) {
            return <Loader />;
        }

        if (this.props.currentClientProfile === null || (!this.props.ownsClientProfile && !this.props.currentSession.isArtist)) {
            return null;
        }

        if (this.props.editingClientProductPreferences) {
            return (
                <EditUserCustomizableProperties
                    currentSession={this.props.currentSession}
                    label="Edit Preferences"
                    dropdownLabel="Product Preference"
                    textboxLabel="Custom Product Preference"
                    userIdentifierKey="clientProfileId"
                    propertyIdentifierKey="productPreferenceId"
                    propertyDescriptionKey="productPreferenceDescription"
                    userIdentifier={this.props.currentClientProfile.clientProfileId}
                    userProperties={this.props.clientProductPreferences}
                    properties={this.props.productPreferences}
                    fetchingAddProperty={this.props.fetchingAddClientProductPreference}
                    fetchingRemoveProperty={this.props.fetchingRemoveClientProductPreference}
                    fetchingAddCustomProperty={this.props.fetchingAddCustomProductPreference}
                    onAddProperty={this.props.addClientProductPreference}
                    onAddCustomProperty={this.props.addCustomProductPreference}
                    onDisableEditing={this.props.disableClientProductPreferenceEditing}
                    onRemoveProperty={this.props.removeClientProductPreference}
                />
            );
        }

        return (
            <DisplayUserCustomizableProperties
                label="Product Preferences"
                properties={this.props.clientProductPreferences}
                descriptionKey="productPreferenceDescription"
                onEnableEditing={this.props.enableClientProductPreferenceEditing}
                ownsProperties={this.props.ownsClientProfile}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        clientProductPreferences: state.clientProductPreferenceReducer.clientProductPreferences,
        productPreferences: state.clientProductPreferenceReducer.productPreferences,
        fetchingClientProductPreferences: state.clientProductPreferenceReducer.fetchingClientProductPreferences,
        fetchingProductPreferences: state.clientProductPreferenceReducer.fetchingProductPreferences,
        fetchingAddClientProductPreference: state.clientProductPreferenceReducer.fetchingAddClientProductPreference,
        fetchingRemoveClientProductPreference: state.clientProductPreferenceReducer.fetchingRemoveClientProductPreference,
        fetchingAddCustomProductPreference: state.clientProductPreferenceReducer.fetchingAddCustomProductPreference,
        editingClientProductPreferences: state.clientProductPreferenceReducer.editingClientProductPreferences
    };
}

ProductPreferences.propTypes = {
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
    clientProductPreferences: PropTypes.arrayOf(PropTypes.object).isRequired,
    productPreferences: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingClientProductPreferences: PropTypes.bool.isRequired,
    fetchingProductPreferences: PropTypes.bool.isRequired,
    fetchingAddClientProductPreference: PropTypes.bool.isRequired,
    fetchingRemoveClientProductPreference: PropTypes.bool.isRequired,
    fetchingAddCustomProductPreference: PropTypes.bool.isRequired,
    editingClientProductPreferences: PropTypes.bool.isRequired,
    addClientProductPreference: PropTypes.func.isRequired,
    addCustomProductPreference: PropTypes.func.isRequired,
    disableClientProductPreferenceEditing: PropTypes.func.isRequired,
    enableClientProductPreferenceEditing: PropTypes.func.isRequired,
    getClientProductPreferences: PropTypes.func.isRequired,
    getProductPreferences: PropTypes.func.isRequired,
    removeClientProductPreference: PropTypes.func.isRequired,
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

ProductPreferences.defaultProps = {
    clientDisplayName: null,
    currentClientProfile: null,
    ownsClientProfile: false
};

export default withRouter(connect(
    mapStateToProps,
    {
        addClientProductPreference,
        addCustomProductPreference,
        disableClientProductPreferenceEditing,
        enableClientProductPreferenceEditing,
        getClientProductPreferences,
        getProductPreferences,
        removeClientProductPreference
    }
)(ProductPreferences));
