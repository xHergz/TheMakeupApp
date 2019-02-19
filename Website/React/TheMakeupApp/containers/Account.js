import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import setCurrentPage from '../actions/SiteActions';
import { GetAccountPageKey } from '../constants/UrlInfo';

class Account extends React.Component {
    componentWillMount() {
        this.props.setCurrentPage(GetAccountPageKey(this.props.match.params.displayName));
    }

    render() {
        return (
            <div>
                <h1>Account: {this.props.match.params.displayName}</h1>
            </div>
        );
    }
}

Account.propTypes = {
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
)(Account));
