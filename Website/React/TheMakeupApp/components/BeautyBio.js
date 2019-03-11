import React from 'react';
import PropTypes from 'prop-types';

import CreateBeautyBio from './CreateBeautyBio';
import DisplayBeautyBio from './DisplayBeautyBio';
import EditBeautyBio from './EditBeautyBio';

import '../../../Css/Account.css';

const BeautyBio = (props) => {
    if (props.currentClientProfile == null && props.ownsClientProfile) {
        return (
            <CreateBeautyBio
                currentSession={props.currentSession}
                fetchingCreateClientProfile={props.fetchingCreateClientProfile}
                onCreateClientProfile={props.onCreateClientProfile}
                eyeColours={props.eyeColours}
                hairColours={props.hairColours}
                skinTones={props.skinTones}
            />
        );
    }

    if (props.editingClientProfile) {
        return (
            <EditBeautyBio
                currentSession={props.currentSession}
                currentClientProfile={props.currentClientProfile}
                fetchingUpdateClientProfile={props.fetchingUpdateClientProfile}
                onCancelEditClientProfile={props.onCancelEditClientProfile}
                onUpdateClientProfile={props.onUpdateClientProfile}
                eyeColours={props.eyeColours}
                hairColours={props.hairColours}
                skinTones={props.skinTones}
            />
        );
    }

    return (
        <DisplayBeautyBio
            currentClientProfile={props.currentClientProfile}
            onEditClientProfile={props.onEditClientProfile}
            ownsClientProfile={props.ownsClientProfile}
        />
    );
};

BeautyBio.propTypes = {
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
    eyeColours: PropTypes.arrayOf(PropTypes.object),
    hairColours: PropTypes.arrayOf(PropTypes.object),
    skinTones: PropTypes.arrayOf(PropTypes.object),
    fetchingCreateClientProfile: PropTypes.bool,
    fetchingUpdateClientProfile: PropTypes.bool,
    editingClientProfile: PropTypes.bool,
    onCancelEditClientProfile: PropTypes.func,
    onCreateClientProfile: PropTypes.func,
    onEditClientProfile: PropTypes.func,
    onUpdateClientProfile: PropTypes.func,
    ownsClientProfile: PropTypes.bool
};

BeautyBio.defaultProps = {
    currentClientProfile: null,
    eyeColours: [],
    hairColours: [],
    skinTones: [],
    fetchingCreateClientProfile: false,
    fetchingUpdateClientProfile: false,
    editingClientProfile: false,
    onCancelEditClientProfile: () => {},
    onCreateClientProfile: () => {},
    onEditClientProfile: () => {},
    onUpdateClientProfile: () => {},
    ownsClientProfile: false
};

export default BeautyBio;
