import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import setCurrentPage from '../actions/SiteActions';
import { GetPortfolioPageKey } from '../constants/UrlInfo';

class ArtistPortfolio extends React.Component {
    componentWillMount() {
        this.props.setCurrentPage(GetPortfolioPageKey(this.props.match.params.displayName));
    }

    render() {
        return (
            <div>
                <h1>Artist Portfolio: {this.props.match.params.displayName}</h1>
            </div>
        );
    }
}

ArtistPortfolio.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            displayName: PropTypes.string.isRequired
        })
    }).isRequired
};

export default withRouter(connect(
    null,
    {
        setCurrentPage
    }
)(ArtistPortfolio));
