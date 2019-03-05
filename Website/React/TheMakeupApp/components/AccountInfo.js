import React from 'react';
import PropTypes from 'prop-types';

import DisplayAccountInfo from './DisplayAccountInfo';
import EditAccountInfo from './EditAccountInfo';

import '../../../Css/Account.css';

class AccountInfo extends React.Component {
    render() {
        if (this.props.editingUser) {
            return (
                <div className="account-info-container">
                    <EditAccountInfo
                        currentUser={this.props.currentUser}
                        fetchingUpdateUser={this.props.fetchingUpdateUser}
                        onCancelEditUser={this.props.onCancelEditUser}
                        onUpdateUser={this.props.onUpdateUser}
                    />
                </div>
            );
        }

        return (
            <div className="account-info-container">
                <DisplayAccountInfo
                    currentUser={this.props.currentUser}
                    fetchingDeactivateUser={this.props.fetchingDeactivateUser}
                    onDeactivateUser={this.props.onDeactivateUser}
                    onEditUser={this.props.onEditUser}
                />
            </div>
        );
    }
}

AccountInfo.propTypes = {
    currentUser: PropTypes.shape({
        userId: PropTypes.number,
        email: PropTypes.string,
        displayName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
    editingUser: PropTypes.bool,
    fetchingDeactivateUser: PropTypes.bool,
    fetchingUpdateUser: PropTypes.bool,
    onCancelEditUser: PropTypes.func,
    onDeactivateUser: PropTypes.func,
    onEditUser: PropTypes.func,
    onUpdateUser: PropTypes.func
};

AccountInfo.defaultProps = {
    currentUser: null,
    editingUser: false,
    fetchingDeactivateUser: false,
    fetchingUpdateUser: false,
    onCancelEditUser: () => {},
    onDeactivateUser: () => {},
    onEditUser: () => {},
    onUpdateUser: () => {}
};

export default AccountInfo;
