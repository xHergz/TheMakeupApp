import React from 'react';
import PropTypes from 'prop-types';

import DisplayAccountInfo from './DisplayAccountInfo';
import EditAccountInfo from './EditAccountInfo';

import '../../../Css/Account.css';

const AccountInfo = (props) => {
    if (props.editingUser) {
        return (
            <div className="account-info-container">
                <EditAccountInfo
                    currentUser={props.currentUser}
                    fetchingUpdateUser={props.fetchingUpdateUser}
                    onCancelEditUser={props.onCancelEditUser}
                    onUpdateUser={props.onUpdateUser}
                />
            </div>
        );
    }

    return (
        <div className="account-info-container">
            <DisplayAccountInfo
                currentUser={props.currentUser}
                fetchingDeactivateUser={props.fetchingDeactivateUser}
                onDeactivateUser={props.onDeactivateUser}
                onEditUser={props.onEditUser}
            />
        </div>
    );
};

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
