import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import ImageInput from '../../Common/components/ImageInput';
import Loader from '../../Common/components/Loader';
import FormInfoDisplay from './FormInfoDisplay';

import '../../../Css/Headshots.css';

class EditHeadshots extends React.Component {
    constructor(props) {
        super(props);
        this.renderHeadshot = this.renderHeadshot.bind(this);
        this.renderAddHeadshot = this.renderAddHeadshot.bind(this);
        this.renderRemoveHeadshot = this.renderRemoveHeadshot.bind(this);
    }

    renderHeadshot(headshot) {
        if (headshot.imageUrl === null) {
            return this.renderAddHeadshot(headshot);
        }
        return this.renderRemoveHeadshot(headshot);
    }

    renderUploadButton(inputRef, headshot) {
        if (this.props.fetchingAddClientHeadshot) {
            return <Loader />;
        }
        return (
            <Button
                label="Upload"
                onClickHandler={
                    () => {
                        this.props.onAddClientHeadshot(
                            headshot.clientProfileId,
                            inputRef.current.getValue(),
                            headshot.headshotTypeId,
                            this.props.currentSession.displayName
                        );
                    }
                }
            />
        );
    }

    renderAddHeadshot(headshot) {
        const inputRef = React.createRef();
        return (
            <div className="headshot-container">
                <h4>{headshot.headshotTypeDescription}</h4>
                <ImageInput
                    ref={inputRef}
                    label="Select a Picture"
                    placeholderImageUrl="/images/defaultProfilePic.png"
                />
                {this.renderUploadButton(inputRef, headshot)}
            </div>
        );
    }

    renderRemoveButton(clientHeadshotId) {
        if (this.props.fetchingRemoveClientHeadshot) {
            return <Loader />;
        }
        return (
            <Button
                label="Remove"
                onClickHandler={
                    () => {
                        this.props.onRemoveClientHeadshot(
                            clientHeadshotId,
                            this.props.currentSession.displayName);
                    }
                }
            />
        );
    }

    renderRemoveHeadshot(headshot) {
        return (
            <div className="headshot-container">
                <h4>{headshot.headshotTypeDescription}</h4>
                <img
                    className="headshot-image"
                    src={headshot.imageUrl}
                    alt={`${headshot.headshotTypeDescription} Client Headshot`}
                />
                {this.renderRemoveButton(headshot.clientHeadshotId)}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="form-info-actions">
                    <div className="form-info-action" />
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        <Button
                            label="Done"
                            onClickHandler={this.props.onDisableClientHeadshotEditing}
                            disabled={this.props.fetchingAddClientHeadshot || this.props.fetchingRemoveClientHeadshot}
                        />
                    </div>
                </div>
                <FormInfoDisplay>
                    <h3 className="section-title">Edit Headshots</h3>
                    <div className="headshots-container">
                        {this.props.clientHeadshots.map((headshot) => { return this.renderHeadshot(headshot); })}
                    </div>
                </FormInfoDisplay>
            </div>
        );
    }
}

EditHeadshots.propTypes = {
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
    clientHeadshots: PropTypes.arrayOf(PropTypes.object),
    fetchingAddClientHeadshot: PropTypes.bool,
    fetchingRemoveClientHeadshot: PropTypes.bool,
    onAddClientHeadshot: PropTypes.func,
    onDisableClientHeadshotEditing: PropTypes.func,
    onRemoveClientHeadshot: PropTypes.func
};

EditHeadshots.defaultProps = {
    clientHeadshots: [],
    fetchingAddClientHeadshot: false,
    fetchingRemoveClientHeadshot: false,
    onAddClientHeadshot: () => {},
    onDisableClientHeadshotEditing: () => {},
    onRemoveClientHeadshot: () => {}
};

export default EditHeadshots;
