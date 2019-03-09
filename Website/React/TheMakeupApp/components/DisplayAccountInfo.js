import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import Loader from '../../Common/components/Loader';

import FormInfoBlock from './FormInfoBlock';
import FormInfoDisplay from './FormInfoDisplay';

import '../../../Css/Account.css';

class DisplayAccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.renderDeactivateButton = this.renderDeactivateButton.bind(this);
    }

    renderDeactivateButton() {
        if (this.props.fetchingDeactivateUser) {
            return <Loader />;
        }
        return (
            <Button
                label="Deactivate Account"
                onClickHandler={() => { this.props.onDeactivateUser(this.props.currentUser.userId); }}
            />
        );
    }

    render() {
        if (this.props.currentUser === null) {
            return (
                <h1>No Account Info</h1>
            );
        }

        return (
            <div className="account-info">
                <div className="account-info-actions">
                    <div className="account-info-action" />
                    <div className="account-info-action-spacer" />
                    <div className="account-info-action">
                        <Button
                            label="Edit"
                            onClickHandler={this.props.onEditUser}
                        />
                    </div>
                </div>
                <FormInfoDisplay>
                    <FormInfoBlock
                        label="Email:"
                        value={this.props.currentUser.email}
                    />
                    <FormInfoBlock
                        label="Display Name:"
                        value={this.props.currentUser.displayName}
                    />
                    <FormInfoBlock
                        label="First Name:"
                        value={this.props.currentUser.firstName}
                    />
                    <FormInfoBlock
                        label="Last Name:"
                        value={this.props.currentUser.lastName}
                    />
                </FormInfoDisplay>
                <div className="account-info-action">
                    {this.renderDeactivateButton()}
                </div>
            </div>
        );
    }
}

DisplayAccountInfo.propTypes = {
    currentUser: PropTypes.shape({
        userId: PropTypes.number,
        email: PropTypes.string,
        displayName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
    fetchingDeactivateUser: PropTypes.bool,
    onDeactivateUser: PropTypes.func,
    onEditUser: PropTypes.func
};

DisplayAccountInfo.defaultProps = {
    currentUser: null,
    fetchingDeactivateUser: false,
    onDeactivateUser: () => {},
    onEditUser: () => {}
};

export default DisplayAccountInfo;
