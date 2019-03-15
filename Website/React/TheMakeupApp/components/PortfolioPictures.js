import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ConfirmModal from '../../Common/components/ConfirmModal';
import Loader from '../../Common/components/Loader';
import Modal from '../../Common/components/Modal';
import {
    addArtistPortfolioPicture,
    deleteArtistPortfolioPicture,
    disableArtistPortfolioPictureEditing,
    enableArtistPortfolioPictureEditing,
    getArtistPortfolioPictures
} from '../actions/ArtistPortfolioPictureActions';

import '../../../Css/PortfolioPictures.css';
import Button from '../../Common/components/Button';
import ImageInput from '../../Common/components/ImageInput';

class PortfolioPictures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canAddPicture: false,
            viewedImage: {
                artistPortfolioPictureId: 0,
                imagePath: '',
                dateAdded: ''
            }
        };
        this.addPortfolioPictureChanged = this.addPortfolioPictureChanged.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
        this.renderPicture = this.renderPicture.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
        this.addPictureInput = React.createRef();
        this.addPictureModal = React.createRef();
        this.viewPictureModal = React.createRef();
    }

    componentDidMount() {
        if (this.props.currentArtistPortfolio !== null) {
            this.props.getArtistPortfolioPictures(this.props.artistDisplayName);
        }
    }

    addPortfolioPictureChanged() {
        if (this.addPictureInput.current.getValue() === null) {
            this.setState({
                canAddPicture: false
            });
        }
        else {
            this.setState({
                canAddPicture: true
            });
        }
    }

    uploadPicture() {
        this.props.addArtistPortfolioPicture(this.props.currentArtistPortfolio.artistPortfolioId, this.addPictureInput.current.getValue(),
            1, this.props.artistDisplayName);
    }

    viewImage(picture) {
        this.setState({
            viewedImage: picture
        });
        this.viewPictureModal.current.openModal();
    }

    renderPicture(picture) {
        return (
            <div
                className="portfolio-picture"
                key={picture.artistPortfolioPictureId}
                onClick={() => { this.viewImage(picture); }}
            >
                <img
                    src={picture.imagePath}
                    alt={picture.imagePath}
                />
            </div>
        );
    }

    renderAddButton() {
        if (!this.props.ownsArtistPortfolio) {
            return null;
        }
        return (
            <div className="add-portfolio-picture-button">
                <Button
                    label="+"
                    onClickHandler={() => { this.addPictureModal.current.openModal(); }}
                />
            </div>
        );
    }

    renderRemoveButton(pictureId) {
        if (!this.props.ownsArtistPortfolio) {
            return null;
        }
        return (
            <Button
                label="Delete Picture"
                onClickHandler={() => { this.props.deleteArtistPortfolioPicture(pictureId, this.props.artistDisplayName); }}
            />
        );
    }

    render() {
        if (this.props.fetchingArtistPortfolioPictures) {
            return <Loader />;
        }

        if (this.props.currentArtistPortfolio === null) {
            return null;
        }

        return (
            <div className="artist-portfolio-pictures">
                {this.props.artistPortfolioPictures.map((picture) => { return this.renderPicture(picture); })}
                {this.renderAddButton()}
                <Modal
                    ref={this.addPictureModal}
                >
                    <div className="add-artist-portfolio-picture">
                        <ImageInput
                            ref={this.addPictureInput}
                            label="Select a Portfolio Picture"
                            placeholderImageUrl="/images/defaultProfilePic.png"
                            onValueChanged={this.addPortfolioPictureChanged}
                        />
                        <Button
                            label="Upload Portfolio Picture"
                            onClickHandler={this.uploadPicture}
                            disabled={!this.state.canAddPicture}
                        />
                    </div>
                </Modal>
                <Modal
                    ref={this.viewPictureModal}
                >
                    <div className="view-artist-portfolio-image">
                        <img
                            src={this.state.viewedImage.imagePath}
                            alt={this.state.viewedImage.imagePath}
                        />
                        <h6>Date Posted: {this.state.viewedImage.dateAdded}</h6>
                        {this.renderRemoveButton(this.state.viewedImage.artistPortfolioPictureId)}
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        artistPortfolioPictures: state.artistPortfolioPictureReducer.artistPortfolioPictures,
        fetchingArtistPortfolioPictures: state.artistPortfolioPictureReducer.fetchingArtistPortfolioPictures,
        fetchingAddArtistPortfolioPicture: state.artistPortfolioPictureReducer.fetchingAddArtistPortfolioPicture,
        fetchingDeleteArtistPortfolioPicture: state.artistPortfolioPictureReducer.fetchingDeleteArtistPortfolioPicture,
        editingArtistPortfolioPictures: state.artistPortfolioPictureReducer.editingArtistPortfolioPictures
    };
}

PortfolioPictures.propTypes = {
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
    artistPortfolioPictures: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistPortfolioPictures: PropTypes.bool.isRequired,
    fetchingAddArtistPortfolioPicture: PropTypes.bool.isRequired,
    fetchingDeleteArtistPortfolioPicture: PropTypes.bool.isRequired,
    editingArtistPortfolioPictures: PropTypes.bool.isRequired,
    addArtistPortfolioPicture: PropTypes.func.isRequired,
    deleteArtistPortfolioPicture: PropTypes.func.isRequired,
    disableArtistPortfolioPictureEditing: PropTypes.func.isRequired,
    enableArtistPortfolioPictureEditing: PropTypes.func.isRequired,
    getArtistPortfolioPictures: PropTypes.func.isRequired,
    artistDisplayName: PropTypes.string.isRequired,
    currentArtistPortfolio: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string
    }),
    ownsArtistPortfolio: PropTypes.bool
};

PortfolioPictures.defaultProps = {
    currentArtistPortfolio: null,
    ownsArtistPortfolio: false
};

export default withRouter(connect(
    mapStateToProps,
    {
        addArtistPortfolioPicture,
        deleteArtistPortfolioPicture,
        disableArtistPortfolioPictureEditing,
        enableArtistPortfolioPictureEditing,
        getArtistPortfolioPictures
    }
)(PortfolioPictures));
