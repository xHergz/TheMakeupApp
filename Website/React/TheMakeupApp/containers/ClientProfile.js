import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import setCurrentPage from '../actions/SiteActions';
import { GetProfilePageKey } from '../constants/UrlInfo';

class ClientProfile extends React.Component {
    componentWillMount() {
        this.props.setCurrentPage(GetProfilePageKey(this.props.match.params.displayName));
    }

    render() {
        return (
            <div>
                <h1>ClientProfile: {this.props.match.params.displayName}</h1>
            </div>
        );
    }
}

ClientProfile.propTypes = {
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
)(ClientProfile));
