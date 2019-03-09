import PropTypes from 'prop-types';
import React from 'react';
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
import {
    addClientHeadshot,
    disableClientHeadshotEditing,
    enableClientHeadshotEditing,
    getClientHeadshots,
    removeClientHeadshot
} from '../actions/ClientHeadshotActions';
import {
    addClientProductPreference,
    addCustomProductPreference,
    disableClientProductPreferenceEditing,
    enableClientProductPreferenceEditing,
    getClientProductPreferences,
    getProductPreferences,
    removeClientProductPreference
} from '../actions/ClientProductPreferenceActions';
import {
    createClientProfile,
    disableClientProfileEditing,
    enableClientProfileEditing,
    getClientProfile,
    getEyeColours,
    getHairColours,
    getSkinTones,
    updateClientProfile
} from '../actions/ClientProfileActions';
import {
    addClientReview,
    disableClientReviewEditing,
    enableClientReviewEditing,
    getClientReviews,
    removeClientReview,
    updateClientReview
} from '../actions/ClientReviewsActions';
import setCurrentPage from '../actions/SiteActions';
import AllergiesAndSensitivities from '../components/AllergiesAndSensitivities';
import BeautyBio from '../components/BeautyBio';
import Headshots from '../components/Headshots';
import { GetProfilePageKey } from '../constants/UrlInfo';

class ClientProfile extends React.Component {
    constructor(props) {
        super(props);
        this.currentSessionOwnsClientProfile = this.currentSessionOwnsClientProfile.bind(this);
    }

    componentWillMount() {
        const displayName = this.props.match.params.displayName;
        this.props.setCurrentPage(GetProfilePageKey(displayName));
        this.props.getClientProfile(displayName);
        this.props.getEyeColours();
        this.props.getHairColours();
        this.props.getSkinTones();
        if (this.currentSessionOwnsClientProfile() || this.props.currentSession.isArtist) {
            this.props.getClientHeadshots(displayName);
            this.props.getClientAllergiesAndSensitivities(displayName);
            this.props.getAllergiesAndSensitivities(displayName);
        }
    }

    currentSessionOwnsClientProfile() {
        return this.props.match.params.displayName === this.props.currentSession.displayName;
    }

    isFetchingData() {
        return (
            this.props.fetchingClientProfile
            || this.props.fetchingEyeColours
            || this.props.fetchingHairColours
            || this.props.fetchingSkinTones
            || this.props.fetchingClientHeadshots
            || this.props.fetchingClientAllergiesAndSensitivities
            || this.props.fetchingAllergiesAndSensitivities
        );
    }

    render() {
        const clientProfileId = (this.props.currentClientProfile === null) ? null : this.props.currentClientProfile.clientProfileId;
        if (this.isFetchingData()) {
            return <Loader />;
        }

        return (
            <div className="client-profile-container">
                <h1>ClientProfile: {this.props.match.params.displayName}</h1>
                <BeautyBio
                    currentSession={this.props.currentSession}
                    currentClientProfile={this.props.currentClientProfile}
                    eyeColours={this.props.eyeColours}
                    hairColours={this.props.hairColours}
                    skinTones={this.props.skinTones}
                    fetchingCreateClientProfile={this.props.fetchingCreateClientProfile}
                    fetchingUpdateClientProfile={this.props.fetchingUpdateClientProfile}
                    editingClientProfile={this.props.editingClientProfile}
                    onCancelEditClientProfile={this.props.disableClientProfileEditing}
                    onCreateClientProfile={this.props.createClientProfile}
                    onEditClientProfile={this.props.enableClientProfileEditing}
                    onUpdateClientProfile={this.props.updateClientProfile}
                    ownsClientProfile={this.currentSessionOwnsClientProfile()}
                />
                <Headshots
                    currentSession={this.props.currentSession}
                    clientHeadshots={this.props.clientHeadshots}
                    fetchingAddClientHeadshot={this.props.fetchingAddClientHeadshot}
                    fetchingRemoveClientHeadshot={this.props.fetchingRemoveClientHeadshot}
                    editingClientHeadshots={this.props.editingClientHeadshots}
                    onAddClientHeadshot={this.props.addClientHeadshot}
                    onDisableClientHeadshotEditing={this.props.disableClientHeadshotEditing}
                    onEnableClientHeadshotEditing={this.props.enableClientHeadshotEditing}
                    onRemoveClientHeadshot={this.props.removeClientHeadshot}
                    ownsClientProfile={this.currentSessionOwnsClientProfile()}
                />
                <AllergiesAndSensitivities
                    currentSession={this.props.currentSession}
                    clientProfileId={clientProfileId}
                    clientAllergiesAndSensitivities={this.props.clientAllergiesAndSensitivities}
                    allergiesAndSensitivities={this.props.allergiesAndSensitivities}
                    fetchingAddClientAllergySensitivity={this.props.fetchingAddClientAllergySensitivity}
                    fetchingRemoveClientAllergySensitivity={this.props.fetchingRemoveClientAllergySensitivity}
                    fetchingAddCustomAllergySensitivity={this.props.fetchingAddCustomAllergySensitivity}
                    editingClientAllergiesAndSensitivities={this.props.editingClientAllergiesAndSensitivities}
                    onAddClientAllergySensitivity={this.props.addClientAllergySensitivity}
                    onAddCustomAllergySensitivity={this.props.addCustomAllergySensitivity}
                    onDisableClientAllergySensitivityEditing={this.props.disableClientAllergySensitivityEditing}
                    onEnableClientAllergySensitivityEditing={this.props.enableClientAllergySensitivityEditing}
                    onRemoveClientAllergySensitivity={this.props.removeClientAllergySensitivity}
                    ownsClientProfile={this.currentSessionOwnsClientProfile()}
                />
            </div>
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
        editingClientAllergiesAndSensitivities: state.clientAllergySensitivityReducer.editingClientAllergiesAndSensitivities,
        clientHeadshots: state.clientHeadshotReducer.clientHeadshots,
        fetchingClientHeadshots: state.clientHeadshotReducer.fetchingClientHeadshots,
        fetchingAddClientHeadshot: state.clientHeadshotReducer.fetchingAddClientHeadshot,
        fetchingRemoveClientHeadshot: state.clientHeadshotReducer.fetchingRemoveClientHeadshot,
        editingClientHeadshots: state.clientHeadshotReducer.editingClientHeadshots,
        clientProductPreferences: state.clientProductPreferenceReducer.clientProductPreferences,
        productPreferences: state.clientProductPreferenceReducer.productPreferences,
        fetchingClientProductPreferences: state.clientProductPreferenceReducer.fetchingClientProductPreferences,
        fetchingProductPreferences: state.clientProductPreferenceReducer.fetchingProductPreferences,
        fetchingAddClientProductPreference: state.clientProductPreferenceReducer.fetchingAddClientProductPreference,
        fetchingRemoveClientProductPreference: state.clientProductPreferenceReducer.fetchingRemoveClientProductPreference,
        fetchingAddCustomProductPreference: state.clientProductPreferenceReducer.fetchingAddCustomProductPreference,
        editingClientProductPreferences: state.clientProductPreferenceReducer.editingClientProductPreferences,
        currentClientProfile: state.clientProfileReducer.currentClientProfile,
        fetchingClientProfile: state.clientProfileReducer.fetchingClientProfile,
        fetchingCreateClientProfile: state.clientProfileReducer.fetchingCreateClientProfile,
        fetchingUpdateClientProfile: state.clientProfileReducer.fetchingUpdateClientProfile,
        editingClientProfile: state.clientProfileReducer.editingClientProfile,
        eyeColours: state.clientProfileReducer.eyeColours,
        hairColours: state.clientProfileReducer.hairColours,
        skinTones: state.clientProfileReducer.skinTones,
        fetchingEyeColours: state.clientProfileReducer.fetchingEyeColours,
        fetchingHairColours: state.clientProfileReducer.fetchingHairColours,
        fetchingSkinTones: state.clientProfileReducer.fetchingSkinTones,
        clientReviews: state.clientReviewReducer.clientReviews,
        fetchingClientReviews: state.clientReviewReducer.fetchingClientReviews,
        fetchingAddClientReview: state.clientReviewReducer.fetchingAddClientReview,
        fetchingUpdateClientReview: state.clientReviewReducer.fetchingUpdateClientReview,
        fetchingRemoveClientReview: state.clientReviewReducer.fetchingRemoveClientReview,
        editingClientReview: state.clientReviewReducer.editingClientReview,
        currentEditReviewId: state.clientReviewReducer.currentEditReviewId
    };
}

ClientProfile.propTypes = {
    addClientAllergySensitivity: PropTypes.func.isRequired,
    addCustomAllergySensitivity: PropTypes.func.isRequired,
    disableClientAllergySensitivityEditing: PropTypes.func.isRequired,
    enableClientAllergySensitivityEditing: PropTypes.func.isRequired,
    getAllergiesAndSensitivities: PropTypes.func.isRequired,
    getClientAllergiesAndSensitivities: PropTypes.func.isRequired,
    removeClientAllergySensitivity: PropTypes.func.isRequired,
    addClientHeadshot: PropTypes.func.isRequired,
    disableClientHeadshotEditing: PropTypes.func.isRequired,
    enableClientHeadshotEditing: PropTypes.func.isRequired,
    getClientHeadshots: PropTypes.func.isRequired,
    removeClientHeadshot: PropTypes.func.isRequired,
    addClientProductPreference: PropTypes.func.isRequired,
    addCustomProductPreference: PropTypes.func.isRequired,
    disableClientProductPreferenceEditing: PropTypes.func.isRequired,
    enableClientProductPreferenceEditing: PropTypes.func.isRequired,
    getClientProductPreferences: PropTypes.func.isRequired,
    getProductPreferences: PropTypes.func.isRequired,
    removeClientProductPreference: PropTypes.func.isRequired,
    createClientProfile: PropTypes.func.isRequired,
    disableClientProfileEditing: PropTypes.func.isRequired,
    enableClientProfileEditing: PropTypes.func.isRequired,
    getClientProfile: PropTypes.func.isRequired,
    getEyeColours: PropTypes.func.isRequired,
    getHairColours: PropTypes.func.isRequired,
    getSkinTones: PropTypes.func.isRequired,
    updateClientProfile: PropTypes.func.isRequired,
    addClientReview: PropTypes.func.isRequired,
    disableClientReviewEditing: PropTypes.func.isRequired,
    enableClientReviewEditing: PropTypes.func.isRequired,
    getClientReviews: PropTypes.func.isRequired,
    removeClientReview: PropTypes.func.isRequired,
    updateClientReview: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            displayName: PropTypes.string.isRequired
        })
    }).isRequired,
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired
    }).isRequired,
    clientAllergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object).isRequired,
    allergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingClientAllergiesAndSensitivities: PropTypes.bool.isRequired,
    fetchingAllergiesAndSensitivities: PropTypes.bool.isRequired,
    fetchingAddClientAllergySensitivity: PropTypes.bool.isRequired,
    fetchingRemoveClientAllergySensitivity: PropTypes.bool.isRequired,
    fetchingAddCustomAllergySensitivity: PropTypes.bool.isRequired,
    editingClientAllergiesAndSensitivities: PropTypes.bool.isRequired,
    clientHeadshots: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingClientHeadshots: PropTypes.bool.isRequired,
    fetchingAddClientHeadshot: PropTypes.bool.isRequired,
    fetchingRemoveClientHeadshot: PropTypes.bool.isRequired,
    editingClientHeadshots: PropTypes.bool.isRequired,
    clientProductPreferences: PropTypes.arrayOf(PropTypes.object).isRequired,
    productPreferences: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingClientProductPreferences: PropTypes.bool.isRequired,
    fetchingProductPreferences: PropTypes.bool.isRequired,
    fetchingAddClientProductPreference: PropTypes.bool.isRequired,
    fetchingRemoveClientProductPreference: PropTypes.bool.isRequired,
    fetchingAddCustomProductPreference: PropTypes.bool.isRequired,
    editingClientProductPreferences: PropTypes.bool.isRequired,
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
    fetchingClientProfile: PropTypes.bool.isRequired,
    fetchingCreateClientProfile: PropTypes.bool.isRequired,
    fetchingUpdateClientProfile: PropTypes.bool.isRequired,
    editingClientProfile: PropTypes.bool.isRequired,
    eyeColours: PropTypes.arrayOf(PropTypes.object).isRequired,
    hairColours: PropTypes.arrayOf(PropTypes.object).isRequired,
    skinTones: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingEyeColours: PropTypes.bool.isRequired,
    fetchingHairColours: PropTypes.bool.isRequired,
    fetchingSkinTones: PropTypes.bool.isRequired,
    clientReviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingClientReviews: PropTypes.bool.isRequired,
    fetchingAddClientReview: PropTypes.bool.isRequired,
    fetchingUpdateClientReview: PropTypes.bool.isRequired,
    fetchingRemoveClientReview: PropTypes.bool.isRequired,
    editingClientReview: PropTypes.bool.isRequired,
    currentEditReviewId: PropTypes.number
};

ClientProfile.defaultProps = {
    currentClientProfile: null,
    currentEditReviewId: null
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
        removeClientAllergySensitivity,
        addClientHeadshot,
        disableClientHeadshotEditing,
        enableClientHeadshotEditing,
        getClientHeadshots,
        removeClientHeadshot,
        addClientProductPreference,
        addCustomProductPreference,
        disableClientProductPreferenceEditing,
        enableClientProductPreferenceEditing,
        getClientProductPreferences,
        getProductPreferences,
        removeClientProductPreference,
        createClientProfile,
        disableClientProfileEditing,
        enableClientProfileEditing,
        getClientProfile,
        getEyeColours,
        getHairColours,
        getSkinTones,
        updateClientProfile,
        addClientReview,
        disableClientReviewEditing,
        enableClientReviewEditing,
        getClientReviews,
        removeClientReview,
        updateClientReview,
        setCurrentPage
    }
)(ClientProfile));
