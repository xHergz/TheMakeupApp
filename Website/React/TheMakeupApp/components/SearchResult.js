import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../Common/components/Button';
import Rating from './Rating';

import '../../../Css/Search.css';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.requestAppointment = this.requestAppointment.bind(this);
        this.renderDistanceLabel = this.renderDistanceLabel.bind(this);
    }

    requestAppointment() {
        this.props.onRequestAppointment(
            this.props.artistResult.artistPortfolioId,
            this.props.artistResult.displayName,
            this.props.artistResult.basePrice,
            this.props.artistResult.artistServiceId
        );
    }

    renderDistanceLabel() {
        const distance = this.props.artistResult.distance;
        if (distance < 5) {
            return <h6>{'< 5km away'}</h6>;
        }
        if (distance >= 5 && distance < 15) {
            return <h6>{'< 15km away'}</h6>;
        }
        if (distance >= 15 && distance < 25) {
            return <h6>{'< 25km away'}</h6>;
        }
        if (distance >= 25 && distance < 50) {
            return <h6>{'< 50km away'}</h6>;
        }
        return <h6>50+km away</h6>;
    }

    render() {
        return (
            <div
                key={this.props.artistResult.artistPortfolioId}
                className="search-result"
            >
                <div className="search-result-image-container">
                    <img
                        className="search-result-image"
                        src={this.props.artistResult.profilePictureUrl}
                        alt={this.props.artistResult.profilePictureUrl}
                    />
                </div>
                <div className="search-result-info">
                    <a href={`/portfolio/${this.props.artistResult.displayName}`}>
                        <h3>{this.props.artistResult.displayName}</h3>
                    </a>
                    <Rating
                        rating={this.props.artistResult.rating}
                        isStatic
                    />
                    {this.renderDistanceLabel()}
                </div>
                <div className="search-result-price">
                    <h3>${this.props.artistResult.basePrice}</h3>
                </div>
                <div className="search-result-actions">
                    <Button
                        label="Request Appointment"
                        onClickHandler={this.requestAppointment}
                    />
                </div>
            </div>
        );
    }
}

SearchResult.propTypes = {
    artistResult: PropTypes.shape({
        artistPortfolioId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        displayName: PropTypes.string,
        longitude: PropTypes.number,
        latitude: PropTypes.number,
        distance: PropTypes.number,
        rating: PropTypes.number,
        artistServiceId: PropTypes.number,
        basePrice: PropTypes.number
    }).isRequired,
    onRequestAppointment: PropTypes.func.isRequired
};

export default SearchResult;
