import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import FormInfoDisplay from './FormInfoDisplay';

import '../../../Css/Portfolio.css';

class DisplayPortfolioBase extends React.Component {
    renderEditButton() {
        if (!this.props.ownsArtistPortfolio) {
            return null;
        }
        return (
            <Button
                label="Edit"
                onClickHandler={this.props.onEditArtistPortfolio}
            />
        );
    }

    render() {
        if (this.props.currentArtistPortfolio === null) {
            return (
                <h1>No Artist Portfolio</h1>
            );
        }

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
                    <h3 className="section-title">Artist Portfolio</h3>
                    <div className="artist-portfolio-display">
                        <img
                            className="profile-picture"
                            src={this.props.currentArtistPortfolio.profilePictureUrl}
                            alt="Profile Pic"
                        />
                        <div className="artist-portfolio-biography">
                            <h3>Biography:</h3>
                            <div className="biography-content">
                                {this.props.currentArtistPortfolio.biography}
                            </div>
                        </div>
                    </div>
                </FormInfoDisplay>
            </div>
        );
    }
}

DisplayPortfolioBase.propTypes = {
    currentArtistPortfolio: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string
    }),
    onEditArtistPortfolio: PropTypes.func,
    ownsArtistPortfolio: PropTypes.bool
};

DisplayPortfolioBase.defaultProps = {
    currentArtistPortfolio: null,
    onEditArtistPortfolio: () => {},
    ownsArtistPortfolio: false
};

export default DisplayPortfolioBase;
