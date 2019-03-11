import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';

import setCurrentPage from '../actions/SiteActions';
import {
    cancelUserEditing,
    deactivateUser,
    enableUserEditing,
    getUserInfo,
    updateUser
} from '../actions/UserActions';
import AccountInfo from '../components/AccountInfo';
import { GetAccountPageKey } from '../constants/UrlInfo';

class Account extends React.Component {
    componentWillMount() {
        this.props.setCurrentPage(GetAccountPageKey(this.props.currentSession.displayName));
        this.props.getUserInfo(this.props.currentSession.displayName);
    }

    render() {
        if (this.props.fetchingUserInfo) {
            return <Loader />;
        }

        return (
            <AccountInfo
                currentUser={this.props.currentUser}
                editingUser={this.props.editingUser}
                fetchingDeactivateUser={this.props.fetchingDeactivateUser}
                fetchingUpdateUser={this.props.fetchingUpdateUser}
                onCancelEditUser={this.props.cancelUserEditing}
                onDeactivateUser={this.props.deactivateUser}
                onEditUser={this.props.enableUserEditing}
                onUpdateUser={this.props.updateUser}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        editingUser: state.userReducer.editingUser,
        fetchingDeactivateUser: state.userReducer.fetchingDeactivateUser,
        fetchingUpdateUser: state.userReducer.fetchingUpdateUser,
        fetchingUserInfo: state.userReducer.fetchingUserInfo,
        currentUser: state.userReducer.currentUser
    };
}

Account.propTypes = {
    cancelUserEditing: PropTypes.func.isRequired,
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired,
        isClient: PropTypes.bool.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired,
    deactivateUser: PropTypes.func.isRequired,
    enableUserEditing: PropTypes.func.isRequired,
    editingUser: PropTypes.bool,
    fetchingDeactivateUser: PropTypes.bool.isRequired,
    fetchingUpdateUser: PropTypes.bool.isRequired,
    fetchingUserInfo: PropTypes.bool.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    currentUser: PropTypes.shape({
        userId: PropTypes.number,
        email: PropTypes.string,
        displayName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    })
};

Account.defaultProps = {
    editingUser: false,
    currentUser: null
};

export default withRouter(connect(
    mapStateToProps,
    {
        cancelUserEditing,
        deactivateUser,
        enableUserEditing,
        getUserInfo,
        setCurrentPage,
        updateUser
    }
)(Account));
