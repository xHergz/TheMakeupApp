
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faFullHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import faEmptyHeart from '@fortawesome/fontawesome-free-regular/faHeart';

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRating: props.rating
        };
        this.renderRating = this.renderRating.bind(this);
        this.renderFullHeart = this.renderFullHeart.bind(this);
        this.renderEmptyHeart = this.renderEmptyHeart.bind(this);
        this.setRating = this.setRating.bind(this);
    }

    setRating(newRating) {
        this.setState({
            currentRating: newRating
        });
    }

    getValue() {
        return this.state.currentRating;
    }

    renderFullHeart(position) {
        if (!this.props.isStatic) {
            return (
                <div className="rating-heart clickable" onClick={() => { this.setRating(position); }}>
                    <FontAwesomeIcon icon={faFullHeart} size="lg" />
                </div>
            );
        }
        return (
            <div className="rating-heart">
                <FontAwesomeIcon icon={faFullHeart} size="lg" />
            </div>
        );
    }

    renderEmptyHeart(position) {
        if (!this.props.isStatic) {
            return (
                <div className="rating-heart clickable" onClick={() => { this.setRating(position); }}>
                    <FontAwesomeIcon icon={faEmptyHeart} size="lg" />
                </div>
            );
        }
        return (
            <div className="rating-heart">
                <FontAwesomeIcon icon={faEmptyHeart} size="lg" />
            </div>
        );
    }

    renderRating(rating) {
        return (
            <div className="rating">
                {rating >= 1 ? this.renderFullHeart(1) : this.renderEmptyHeart(1)}
                {rating >= 2 ? this.renderFullHeart(2) : this.renderEmptyHeart(2)}
                {rating >= 3 ? this.renderFullHeart(3) : this.renderEmptyHeart(3)}
                {rating >= 4 ? this.renderFullHeart(4) : this.renderEmptyHeart(4)}
                {rating >= 5 ? this.renderFullHeart(5) : this.renderEmptyHeart(5)}
            </div>
        );
    }

    render() {
        return this.renderRating(this.state.currentRating);
    }
}

Rating.propTypes = {
    rating: PropTypes.number,
    isStatic: PropTypes.bool
};

Rating.defaultProps = {
    rating: 0,
    isStatic: false
};

export default Rating;
