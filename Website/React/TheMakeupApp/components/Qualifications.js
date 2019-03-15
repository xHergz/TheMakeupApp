import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '../../Common/components/Button';
import Loader from '../../Common/components/Loader';
import Modal from '../../Common/components/Modal';
import TextInput from '../../Common/components/TextInput';
import {
    validateDescription,
    validateNumber
} from '../../Common/helpers/validationUtilities';
import {
    addArtistQualification,
    deleteArtistQualification,
    disableArtistQualificationEditing,
    enableArtistQualificationEditing,
    getArtistQualifications
} from '../actions/ArtistQualificationActions';

import '../../../Css/Qualifications.css';

class Qualifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canAddQualification: false
        };
        this.addQualificationInputChanged = this.addQualificationInputChanged.bind(this);
        this.addQualification = this.addQualification.bind(this);
        this.renderDeleteQualificationButton = this.renderDeleteQualificationButton.bind(this);
        this.renderQualification = this.renderQualification.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
        this.renderEditButton = this.renderEditButton.bind(this);
        this.renderSubmitQualificationButton = this.renderSubmitQualificationButton.bind(this);
        this.descriptionInput = React.createRef();
        this.yearInput = React.createRef();
        this.addQualificationModal = React.createRef();
    }

    componentDidMount() {
        if (this.props.currentArtistPortfolio !== null) {
            this.props.getArtistQualifications(this.props.artistDisplayName);
        }
    }

    addQualificationInputChanged() {
        if (this.descriptionInput.current.isEmpty() || !this.descriptionInput.current.isValid()
            || this.yearInput.current.isEmpty() || !this.yearInput.current.isValid()) {
            this.setState({
                canAddQualification: false
            });
        }
        else {
            this.setState({
                canAddQualification: true
            });
        }
    }

    addQualification() {
        this.props.addArtistQualification(this.props.currentArtistPortfolio.artistPortfolioId, this.yearInput.current.getValue(),
            this.descriptionInput.current.getValue(), this.props.artistDisplayName);
    }

    renderDeleteQualificationButton(qualificationId) {
        if (!this.props.editingArtistQualifications) {
            return null;
        }

        if (this.props.fetchingDeleteArtistQualification) {
            return <Loader />;
        }

        return (
            <Button
                label="Delete"
                onClickHandler={() => { this.props.deleteArtistQualification(qualificationId, this.props.artistDisplayName); }}
            />
        );
    }

    renderQualification(qualification) {
        return (
            <div
                className="artist-qualification"
                key={qualification.artistQualificationId}
            >
                <div className="artist-qualification-description">
                    <h6>{qualification.qualificationDescription}</h6>
                </div>
                <div className="artist-qualification-year-obtained">
                    <h6>{qualification.yearObtained}</h6>
                </div>
                <div>
                    {this.renderDeleteQualificationButton(qualification.artistQualificationId)}
                </div>
            </div>
        );
    }

    renderAddButton() {
        if (!this.props.editingArtistQualifications) {
            return null;
        }

        return (
            <div className="add-qualification-button">
                <Button
                    label="Add Qualification"
                    onClickHandler={() => { this.addQualificationModal.current.openModal(); }}
                />
            </div>
        );
    }

    renderEditButton() {
        if (!this.props.ownsArtistPortfolio) {
            return null;
        }

        if (this.props.editingArtistQualifications) {
            return (
                <Button
                    label="Done"
                    onClickHandler={this.props.disableArtistQualificationEditing}
                />
            );
        }

        return (
            <Button
                label="Edit"
                onClickHandler={this.props.enableArtistQualificationEditing}
            />
        );
    }

    renderSubmitQualificationButton() {
        if (this.props.fetchingAddArtistQualification) {
            return <Loader />;
        }

        return (
            <div className="add-qualification-button">
                <Button
                    label="Submit Qualification"
                    onClickHandler={this.addQualification}
                    disabled={!this.state.canAddQualification}
                />
            </div>
        );
    }

    render() {
        if (this.props.fetchingArtistQualifications) {
            return <Loader />;
        }

        if (this.props.currentArtistPortfolio === null) {
            return null;
        }

        return (
            <div className="qualification-container">
                <div className="form-info-actions">
                    <div className="form-info-action">
                        <h1>Qualifications</h1>
                    </div>
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        {this.renderEditButton()}
                    </div>
                </div>
                <div className="artist-qualifications">
                    {this.props.artistQualifications.map((qualification) => { return this.renderQualification(qualification); })}
                </div>
                {this.renderAddButton()}
                <Modal
                    ref={this.addQualificationModal}
                >
                    <div className="add-artist-portfolio-qualification">
                        <TextInput
                            ref={this.descriptionInput}
                            label="Description"
                            onValidate={validateDescription}
                            onValidityChanged={this.addQualificationInputChanged}
                        />
                        <TextInput
                            ref={this.yearInput}
                            label="Year Obtained"
                            onValidate={validateNumber}
                            onValidityChanged={this.addQualificationInputChanged}
                        />
                        {this.renderSubmitQualificationButton()}
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        artistQualifications: state.artistQualificationReducer.artistQualifications,
        fetchingArtistQualifications: state.artistQualificationReducer.fetchingArtistQualifications,
        fetchingAddArtistQualification: state.artistQualificationReducer.fetchingAddArtistQualification,
        fetchingDeleteArtistQualification: state.artistQualificationReducer.fetchingDeleteArtistQualification,
        editingArtistQualifications: state.artistQualificationReducer.editingArtistQualifications
    };
}

Qualifications.propTypes = {
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
    artistQualifications: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingArtistQualifications: PropTypes.bool.isRequired,
    fetchingAddArtistQualification: PropTypes.bool.isRequired,
    fetchingDeleteArtistQualification: PropTypes.bool.isRequired,
    editingArtistQualifications: PropTypes.bool.isRequired,
    addArtistQualification: PropTypes.func.isRequired,
    deleteArtistQualification: PropTypes.func.isRequired,
    disableArtistQualificationEditing: PropTypes.func.isRequired,
    enableArtistQualificationEditing: PropTypes.func.isRequired,
    getArtistQualifications: PropTypes.func.isRequired,
    artistDisplayName: PropTypes.string.isRequired,
    currentArtistPortfolio: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string
    }),
    ownsArtistPortfolio: PropTypes.bool
};

Qualifications.defaultProps = {
    currentArtistPortfolio: null,
    ownsArtistPortfolio: false
};

export default withRouter(connect(
    mapStateToProps,
    {
        addArtistQualification,
        deleteArtistQualification,
        disableArtistQualificationEditing,
        enableArtistQualificationEditing,
        getArtistQualifications
    }
)(Qualifications));
