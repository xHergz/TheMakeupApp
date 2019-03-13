import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';

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
                <div className="artist-portfolio-actions">
                    <div className="artist-portfolio-action">
                        <h1>Artist Portfolio</h1>
                    </div>
                    <div className="artist-portfolio-action-spacer" />
                    <div className="artist-portfolio-action">
                        {this.renderEditButton()}
                    </div>
                </div>
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
