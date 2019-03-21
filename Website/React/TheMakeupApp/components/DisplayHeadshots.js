import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import FormInfoDisplay from './FormInfoDisplay';

import '../../../Css/Headshots.css';

class DisplayHeadshots extends React.Component {
    static renderHeadshot(headshot) {
        const defaultUrl = '/images/defaultProfilePic.png';
        const urlToUse = headshot.imageUrl === null ? defaultUrl : headshot.imageUrl;
        return (
            <div
                className="headshot-container"
                key={`${headshot.clientHeadshotId}${headshot.clientProfileId}${headshot.headshotTypeId}`}
            >
                <h4>{headshot.headshotTypeDescription}</h4>
                <img
                    className="headshot-image"
                    src={urlToUse}
                    alt={urlToUse}
                />
            </div>
        );
    }

    renderEditButton() {
        if (!this.props.ownsClientProfile) {
            return null;
        }

        return (
            <Button
                label="Edit"
                onClickHandler={this.props.onEnableClientHeadshotEditing}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="form-info-actions">
                    <div className="form-info-action" />
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        {this.renderEditButton()}
                    </div>
                </div>
                <FormInfoDisplay>
                    <h3 className="section-title">Headshots</h3>
                    <div className="headshots-container">
                        {this.props.clientHeadshots.map((headshot) => { return DisplayHeadshots.renderHeadshot(headshot); })}
                    </div>
                </FormInfoDisplay>
            </div>
        );
    }
}

DisplayHeadshots.propTypes = {
    clientHeadshots: PropTypes.arrayOf(PropTypes.object),
    onEnableClientHeadshotEditing: PropTypes.func,
    ownsClientProfile: PropTypes.bool
};

DisplayHeadshots.defaultProps = {
    clientHeadshots: [],
    onEnableClientHeadshotEditing: () => {},
    ownsClientProfile: false
};

export default DisplayHeadshots;
