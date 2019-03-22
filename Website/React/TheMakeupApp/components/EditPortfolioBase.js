import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import ImageInput from '../../Common/components/ImageInput';
import Loader from '../../Common/components/Loader';
import TextArea from '../../Common/components/TextArea';
import { validateBiography } from '../../Common/helpers/validationUtilities';
import FormInfoDisplay from './FormInfoDisplay';

import '../../../Css/Portfolio.css';

class EditPortfolioBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canUpdate: false
        };
        this.portfolioBaseInputValidityChanged = this.portfolioBaseInputValidityChanged.bind(this);
        this.updateArtistPortfolio = this.updateArtistPortfolio.bind(this);
        this.renderUpdateButton = this.renderUpdateButton.bind(this);
        this.profilePictureInput = React.createRef();
        this.biographyInput = React.createRef();
    }

    portfolioBaseInputValidityChanged() {
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

    updateArtistPortfolio() {
        if (this.state.canUpdate) {
            this.props.onUpdateArtistPortfolio(this.props.currentArtistPortfolio.artistPortfolioId, this.profilePictureInput.current.getValue(),
                this.biographyInput.current.getValue(), this.props.currentSession.displayName);
        }
    }

    renderUpdateButton() {
        if (this.props.fetchingUpdateArtistPortfolio) {
            return <Loader />;
        }
        return (
            <Button
                label="Update"
                onClickHandler={this.updateArtistPortfolio}
                disabled={!this.state.canUpdate}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="form-info-actions">
                    <div className="form-info-action">
                        <Button
                            label="Cancel"
                            onClickHandler={this.props.onCancelEditArtistPortfolio}
                        />
                    </div>
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        {this.renderUpdateButton()}
                    </div>
                </div>
                <FormInfoDisplay>
                    <h3 className="section-title">Edit Your Artist Portfolio</h3>
                    <div className="artist-portfolio-display">
                        <ImageInput
                            ref={this.profilePictureInput}
                            label="Select a Profile Picture"
                            placeholderImageUrl={this.props.currentArtistPortfolio.profilePictureUrl}
                            onValueChanged={this.portfolioBaseInputValidityChanged}
                        />
                        <div className="artist-portfolio-biography">
                            <TextArea
                                ref={this.biographyInput}
                                label="Biography"
                                rows={6}
                                onValidate={validateBiography}
                                onValidityChanged={this.portfolioBaseInputValidityChanged}
                                placeholderText={this.props.currentArtistPortfolio.biography}
                            />
                        </div>
                    </div>
                </FormInfoDisplay>
            </div>
        );
    }
}

EditPortfolioBase.propTypes = {
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
    currentArtistPortfolio: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string
    }),
    fetchingUpdateArtistPortfolio: PropTypes.bool,
    onCancelEditArtistPortfolio: PropTypes.func,
    onUpdateArtistPortfolio: PropTypes.func
};

EditPortfolioBase.defaultProps = {
    currentArtistPortfolio: null,
    fetchingUpdateArtistPortfolio: false,
    onCancelEditArtistPortfolio: () => {},
    onUpdateArtistPortfolio: () => {}
};

export default EditPortfolioBase;
