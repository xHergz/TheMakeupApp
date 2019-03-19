import PropTypes from 'prop-types';
import React from 'react';

import Rating from './Rating';

import '../../../Css/BrowseArtists.css';

class ArtistCard extends React.Component {
    render() {
        return (
            <div
                key={this.props.artist.artistPortfolioId}
                className="artist-card"
            >
                <a href={`/portfolio/${this.props.artist.displayName}`}>
                    <div className="artist-card-image-container">
                        <img
                            className="artist-card-image"
                            src={this.props.artist.profilePictureUrl}
                            alt={this.props.artist.profilePictureUrl}
                        />
                    </div>
                    <div className="artist-card-info">
                        <h3>{this.props.artist.displayName}</h3>
                        <Rating
                            rating={this.props.artist.rating}
                            isStatic
                        />
                        <span>{this.props.artist.biography}</span>
                    </div>
                </a>
            </div>
        );
    }
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        displayName: PropTypes.string,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string,
        rating: PropTypes.number
    }).isRequired
};

export default ArtistCard;
