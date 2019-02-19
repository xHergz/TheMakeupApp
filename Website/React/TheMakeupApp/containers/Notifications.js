import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import setCurrentPage from '../actions/SiteActions';
import PAGES from '../constants/Pages';

class Notifications extends React.Component {
    componentWillMount() {
        this.props.setCurrentPage(PAGES.NOTIFICATIONS.KEY);
    }

    render() {
        return (
            <div>
                <h1>Notifications</h1>
            </div>
        );
    }
}

Notifications.propTypes = {
    setCurrentPage: PropTypes.func.isRequired
};

export default withRouter(connect(
    null,
    {
        setCurrentPage
    }
)(Notifications));
