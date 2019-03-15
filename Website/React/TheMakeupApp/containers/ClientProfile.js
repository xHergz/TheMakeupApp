import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
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
import ProductPreferences from '../components/ProductPreferences';
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
        );
    }

    render() {
        if (this.isFetchingData()) {
            return <Loader />;
        }

        return (
            <div className="client-profile-container">
                <h1>{this.props.match.params.displayName}&#39;s Client Profile</h1>
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
                    clientDisplayName={this.props.match.params.displayName}
                    currentClientProfile={this.props.currentClientProfile}
                    ownsClientProfile={this.currentSessionOwnsClientProfile()}
                />
                <AllergiesAndSensitivities
                    clientDisplayName={this.props.match.params.displayName}
                    currentClientProfile={this.props.currentClientProfile}
                    ownsClientProfile={this.currentSessionOwnsClientProfile()}
                />
                <ProductPreferences
                    clientDisplayName={this.props.match.params.displayName}
                    currentClientProfile={this.props.currentClientProfile}
                    ownsClientProfile={this.currentSessionOwnsClientProfile()}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
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
        isArtist: PropTypes.number.isRequired,
        isClient: PropTypes.number.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired,
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
