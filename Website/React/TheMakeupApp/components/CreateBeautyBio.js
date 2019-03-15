import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import DropdownInput from '../../Common/components/DropdownInput';
import ImageInput from '../../Common/components/ImageInput';
import Loader from '../../Common/components/Loader';
import TextArea from '../../Common/components/TextArea';
import { validateBiography } from '../../Common/helpers/validationUtilities';

import '../../../Css/BeautyBio.css';

class CreateBeautyBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canCreate: false
        };
        this.beautyBioInputValidityChanged = this.beautyBioInputValidityChanged.bind(this);
        this.createClientProfile = this.createClientProfile.bind(this);
        this.renderCreateButton = this.renderCreateButton.bind(this);
        this.profilePictureInput = React.createRef();
        this.biographyInput = React.createRef();
        this.eyeColourInput = React.createRef();
        this.hairColourInput = React.createRef();
        this.skinToneInput = React.createRef();
    }

    beautyBioInputValidityChanged() {
        if (this.profilePictureInput.current.getValue() === null && this.biographyInput.current.isEmpty()) {
            this.setState({
                canCreate: false
            });
        }
        else if (!this.biographyInput.current.isValid() || this.biographyInput.current.isEmpty()
            || this.profilePictureInput.current.getValue() === null) {
            this.setState({
                canCreate: false
            });
        }
        else {
            this.setState({
                canCreate: true
            });
        }
    }

    createClientProfile() {
        if (this.state.canCreate) {
            this.props.onCreateClientProfile(this.props.currentSession.userId, this.profilePictureInput.current.getValue(),
                this.biographyInput.current.getValue(), this.eyeColourInput.current.getValue(), this.hairColourInput.current.getValue(),
                this.skinToneInput.current.getValue(), this.props.currentSession.displayName);
        }
    }

    renderCreateButton() {
        if (this.props.fetchingCreateClientProfile) {
            return <Loader />;
        }

        return (
            <Button
                label="Create"
                disabled={!this.state.canCreate}
                onClickHandler={this.createClientProfile}
            />
        );
    }

    render() {
        return (
            <div>
                <h1>Create Your Beauty Bio</h1>
                <div className="client-profile-display">
                    <ImageInput
                        ref={this.profilePictureInput}
                        label="Select a Profile Picture"
                        placeholderImageUrl="/images/defaultProfilePic.png"
                        onValueChanged={this.beautyBioInputValidityChanged}
                    />
                    <TextArea
                        ref={this.biographyInput}
                        label="Biography"
                        onValidate={validateBiography}
                        onValidityChanged={this.beautyBioInputValidityChanged}
                    />
                    <DropdownInput
                        ref={this.eyeColourInput}
                        label="Eye Colour"
                        options={this.props.eyeColours}
                        valueKey="eyeColourId"
                        labelKey="eyeColourDescription"
                    />
                    <DropdownInput
                        ref={this.hairColourInput}
                        label="Hair Colour"
                        options={this.props.hairColours}
                        valueKey="hairColourId"
                        labelKey="hairColourDescription"
                    />
                    <DropdownInput
                        ref={this.skinToneInput}
                        label="Skin Tone"
                        options={this.props.skinTones}
                        valueKey="skinToneId"
                        labelKey="skinToneDescription"
                    />
                </div>
                <div className="client-profile-action">
                    {this.renderCreateButton()}
                </div>
            </div>
        );
    }
}

CreateBeautyBio.propTypes = {
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
    fetchingCreateClientProfile: PropTypes.bool,
    onCreateClientProfile: PropTypes.func,
    eyeColours: PropTypes.arrayOf(PropTypes.object),
    hairColours: PropTypes.arrayOf(PropTypes.object),
    skinTones: PropTypes.arrayOf(PropTypes.object)
};

CreateBeautyBio.defaultProps = {
    fetchingCreateClientProfile: false,
    onCreateClientProfile: () => {},
    eyeColours: [],
    hairColours: [],
    skinTones: []
};

export default CreateBeautyBio;
