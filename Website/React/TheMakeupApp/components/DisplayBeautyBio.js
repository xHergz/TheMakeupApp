import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import FormInfoBlock from './FormInfoBlock';
import FormInfoDisplay from './FormInfoDisplay';

import '../../../Css/BeautyBio.css';

class DisplayBeautyBio extends React.Component {
    renderEditButton() {
        if (!this.props.ownsClientProfile) {
            return null;
        }
        return (
            <Button
                label="Edit"
                onClickHandler={this.props.onEditClientProfile}
            />
        );
    }

    render() {
        if (this.props.currentClientProfile === null) {
            return (
                <h1>No Client Profile</h1>
            );
        }

        return (
            <div>
                <div className="account-info-actions">
                    <div className="account-info-action">
                        <h1>Beauty Bio</h1>
                    </div>
                    <div className="account-info-action-spacer" />
                    <div className="account-info-action">
                        {this.renderEditButton()}
                    </div>
                </div>
                <FormInfoDisplay>
                    <img
                        className="profile-picture"
                        src={this.props.currentClientProfile.profilePictureUrl}
                        alt="Profile Pic"
                    />
                    <FormInfoBlock
                        label="Biography:"
                        value={this.props.currentClientProfile.biography}
                    />
                    <FormInfoBlock
                        label="Eye Colour:"
                        value={this.props.currentClientProfile.eyeColourDescription}
                    />
                    <FormInfoBlock
                        label="Hair Colour:"
                        value={this.props.currentClientProfile.hairColourDescription}
                    />
                    <FormInfoBlock
                        label="Skin Tone:"
                        value={this.props.currentClientProfile.skinToneDescription}
                    />
                </FormInfoDisplay>
            </div>
        );
    }
}

DisplayBeautyBio.propTypes = {
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
    onEditClientProfile: PropTypes.func,
    ownsClientProfile: PropTypes.bool
};

DisplayBeautyBio.defaultProps = {
    currentClientProfile: null,
    onEditClientProfile: () => {},
    ownsClientProfile: false
};

export default DisplayBeautyBio;
