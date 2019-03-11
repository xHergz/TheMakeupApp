import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import DropdownInput from '../../Common/components/DropdownInput';
import ImageInput from '../../Common/components/ImageInput';
import Loader from '../../Common/components/Loader';
import TextArea from '../../Common/components/TextArea';
import { validateBiography } from '../../Common/helpers/validationUtilities';
import FormInfoDisplay from './FormInfoDisplay';

import '../../../Css/BeautyBio.css';

class EditBeautyBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canUpdate: false
        };
        this.beautyBioInputValidityChanged = this.beautyBioInputValidityChanged.bind(this);
        this.updateClientProfile = this.updateClientProfile.bind(this);
        this.renderUpdateButton = this.renderUpdateButton.bind(this);
        this.profilePictureInput = React.createRef();
        this.biographyInput = React.createRef();
        this.eyeColourInput = React.createRef();
        this.hairColourInput = React.createRef();
        this.skinToneInput = React.createRef();
    }

    beautyBioInputValidityChanged() {
        if (!this.biographyInput.current.isValid()) {
            this.setState({
                canUpdate: false
            });
        }
        else {
            this.setState({
                canUpdate: true
            });
        }
    }

    updateClientProfile() {
        if (this.state.canUpdate) {
            this.props.onUpdateClientProfile(this.props.currentClientProfile.clientProfileId, this.profilePictureInput.current.getValue(),
                this.biographyInput.current.getValue(), this.eyeColourInput.current.getValue(), this.hairColourInput.current.getValue(),
                this.skinToneInput.current.getValue(), this.props.currentSession.displayName);
        }
    }

    renderUpdateButton() {
        if (this.props.fetchingUpdateClientProfile) {
            return <Loader />;
        }
        return (
            <Button
                label="Update"
                onClickHandler={this.updateClientProfile}
                disabled={!this.state.canUpdate}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="account-info-actions">
                    <div className="account-info-action">
                        <Button
                            label="Cancel"
                            onClickHandler={this.props.onCancelEditClientProfile}
                        />
                    </div>
                    <div className="account-info-action-spacer" />
                    <div className="account-info-action">
                        {this.renderUpdateButton()}
                    </div>
                </div>
                <FormInfoDisplay>
                    <ImageInput
                        ref={this.profilePictureInput}
                        label="Select a Profile Picture"
                        placeholderImageUrl={this.props.currentClientProfile.profilePictureUrl}
                        onValueChanged={this.beautyBioInputValidityChanged}
                    />
                    <TextArea
                        ref={this.biographyInput}
                        label="Biography"
                        onValidate={validateBiography}
                        onValidityChanged={this.beautyBioInputValidityChanged}
                        placeholderText={this.props.currentClientProfile.biography}
                    />
                    <DropdownInput
                        ref={this.eyeColourInput}
                        label="Eye Colour"
                        options={this.props.eyeColours}
                        valueKey="eyeColourId"
                        labelKey="eyeColourDescription"
                        defaultValue={this.props.currentClientProfile.eyeColourId}
                        onValueChanged={this.beautyBioInputValidityChanged}
                    />
                    <DropdownInput
                        ref={this.hairColourInput}
                        label="Hair Colour"
                        options={this.props.hairColours}
                        valueKey="hairColourId"
                        labelKey="hairColourDescription"
                        defaultValue={this.props.currentClientProfile.hairColourId}
                        onValueChanged={this.beautyBioInputValidityChanged}
                    />
                    <DropdownInput
                        ref={this.skinToneInput}
                        label="Skin Tone"
                        options={this.props.skinTones}
                        valueKey="skinToneId"
                        labelKey="skinToneDescription"
                        defaultValue={this.props.currentClientProfile.skinToneId}
                        onValueChanged={this.beautyBioInputValidityChanged}
                    />
                </FormInfoDisplay>
            </div>
        );
    }
}

EditBeautyBio.propTypes = {
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
    fetchingUpdateClientProfile: PropTypes.bool,
    onCancelEditClientProfile: PropTypes.func,
    onUpdateClientProfile: PropTypes.func,
    eyeColours: PropTypes.arrayOf(PropTypes.object),
    hairColours: PropTypes.arrayOf(PropTypes.object),
    skinTones: PropTypes.arrayOf(PropTypes.object)
};

EditBeautyBio.defaultProps = {
    currentClientProfile: null,
    fetchingUpdateClientProfile: false,
    onCancelEditClientProfile: () => {},
    onUpdateClientProfile: () => {},
    eyeColours: [],
    hairColours: [],
    skinTones: []
};

export default EditBeautyBio;
