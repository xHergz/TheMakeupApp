import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import ImageInput from '../../Common/components/ImageInput';
import Loader from '../../Common/components/Loader';
import TextArea from '../../Common/components/TextArea';
import { validateBiography } from '../../Common/helpers/validationUtilities';

import '../../../Css/Portfolio.css';

class CreatePortfolioBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canCreate: false
        };
        this.portfolioBaseInputValidityChanged = this.portfolioBaseInputValidityChanged.bind(this);
        this.createArtistPortfolio = this.createArtistPortfolio.bind(this);
        this.renderCreateButton = this.renderCreateButton.bind(this);
        this.profilePictureInput = React.createRef();
        this.biographyInput = React.createRef();
    }

    portfolioBaseInputValidityChanged() {
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

    createArtistPortfolio() {
        if (this.state.canCreate) {
            this.props.onCreateArtistPortfolio(this.props.currentSession.userId, this.profilePictureInput.current.getValue(),
                this.biographyInput.current.getValue(), this.props.currentSession.displayName);
        }
    }

    renderCreateButton() {
        if (this.props.fetchingCreateArtistPortfolio) {
            return <Loader />;
        }

        return (
            <Button
                label="Create"
                disabled={!this.state.canCreate}
                onClickHandler={this.createArtistPortfolio}
            />
        );
    }

    render() {
        return (
            <div>
                <h1>Create Your Artist Portfolio</h1>
                <div className="artist-portfolio-display">
                    <ImageInput
                        ref={this.profilePictureInput}
                        label="Select a Profile Picture"
                        placeholderImageUrl="/images/defaultProfilePic.png"
                        onValueChanged={this.portfolioBaseInputValidityChanged}
                    />
                    <TextArea
                        ref={this.biographyInput}
                        label="Biography"
                        onValidate={validateBiography}
                        onValidityChanged={this.portfolioBaseInputValidityChanged}
                    />
                </div>
                <div className="artist-portfolio-action">
                    {this.renderCreateButton()}
                </div>
            </div>
        );
    }
}

CreatePortfolioBase.propTypes = {
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
    fetchingCreateArtistPortfolio: PropTypes.bool,
    onCreateArtistPortfolio: PropTypes.func
};

CreatePortfolioBase.defaultProps = {
    fetchingCreateArtistPortfolio: false,
    onCreateArtistPortfolio: () => {}
};

export default CreatePortfolioBase;
