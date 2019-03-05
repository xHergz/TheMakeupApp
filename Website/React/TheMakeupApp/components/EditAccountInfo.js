import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import Loader from '../../Common/components/Loader';
import TextInput from '../../Common/components/TextInput';
import {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validatePassword,
    validateUsername
} from '../../Common/helpers/validationUtilities';

import '../../../Css/Account.css';

class EditAccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canUpdate: false
        };
        this.accountInputValidityChanged = this.accountInputValidityChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.updateAccountInfo = this.updateAccountInfo.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.renderUpdateButton = this.renderUpdateButton.bind(this);

        this.emailInput = React.createRef();
        this.newPasswordInput = React.createRef();
        this.confirmNewPasswordInput = React.createRef();
        this.displayNameInput = React.createRef();
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
    }

    accountInputValidityChanged() {
        if (this.emailInput.current.isEmpty() && this.newPasswordInput.current.isEmpty() && this.confirmNewPasswordInput.current.isEmpty()
            && this.displayNameInput.current.isEmpty() && this.firstNameInput.current.isEmpty() && this.lastNameInput.current.isEmpty()) {
            this.setState({
                canUpdate: false
            });
        }
        else if (!this.emailInput.current.isValid() || !this.newPasswordInput.current.isValid() || !this.confirmNewPasswordInput.current.isValid()
            || !this.displayNameInput.current.isValid() || !this.firstNameInput.current.isValid() || !this.lastNameInput.current.isValid()) {
            this.setState({
                canUpdate: false
            });
        }
        else {
            this.setState({
                canUpdate: true
            });
        }
    }

    passwordChanged() {
        this.confirmNewPasswordInput.current.updateValidation();
    }

    updateAccountInfo() {
        if (this.state.canUpdate) {
            this.props.onUpdateUser(this.props.currentUser.userId, this.emailInput.current.getValue(), this.newPasswordInput.current.getValue(),
                this.confirmNewPasswordInput.current.getValue(), this.displayNameInput.current.getValue(), this.firstNameInput.current.getValue(),
                this.lastNameInput.current.getValue());
        }
    }

    confirmPassword(value) {
        return validateConfirmPassword(value, this.newPasswordInput.current.getValue());
    }

    renderUpdateButton() {
        if (this.props.fetchingUpdateUser) {
            return <Loader />;
        }
        return (
            <Button
                label="Save"
                onClickHandler={this.updateAccountInfo}
                disabled={!this.state.canUpdate}
            />
        );
    }

    render() {
        console.log('Fetching Update: ', this.props.fetchingUpdateUser);
        return (
            <div className="account-info">
                <div className="account-info-actions">
                    <div className="account-info-action">
                        <Button
                            label="Cancel"
                            onClickHandler={this.props.onCancelEditUser}
                        />
                    </div>
                    <div className="account-info-action-spacer" />
                    <div className="account-info-action">
                        {this.renderUpdateButton()}
                    </div>
                </div>
                <div className="account-info-display">
                    <TextInput
                        ref={this.emailInput}
                        label="Email"
                        onValidate={validateEmail}
                        placeholderText={this.props.currentUser.email}
                        onValidityChanged={this.accountInputValidityChanged}
                    />
                    <TextInput
                        ref={this.newPasswordInput}
                        label="New Password"
                        maskInput
                        onValidate={validatePassword}
                        onValidityChanged={this.accountInputValidityChanged}
                        onValueChanged={this.passwordChanged}
                    />
                    <TextInput
                        ref={this.confirmNewPasswordInput}
                        label="Confirm New Password"
                        maskInput
                        onValidate={this.confirmPassword}
                        onValidityChanged={this.accountInputValidityChanged}
                    />
                    <TextInput
                        ref={this.displayNameInput}
                        label="Display Name"
                        onValidate={validateUsername}
                        placeholderText={this.props.currentUser.displayName}
                        onValidityChanged={this.accountInputValidityChanged}
                    />
                    <TextInput
                        ref={this.firstNameInput}
                        label="First Name"
                        onValidate={validateName}
                        placeholderText={this.props.currentUser.firstName}
                        onValidityChanged={this.accountInputValidityChanged}
                    />
                    <TextInput
                        ref={this.lastNameInput}
                        label="Last Name"
                        onValidate={validateName}
                        placeholderText={this.props.currentUser.lastName}
                        onValidityChanged={this.accountInputValidityChanged}
                    />
                </div>
            </div>
        );
    }
}

EditAccountInfo.propTypes = {
    currentUser: PropTypes.shape({
        userId: PropTypes.number,
        email: PropTypes.string,
        displayName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
    fetchingUpdateUser: PropTypes.bool,
    onCancelEditUser: PropTypes.func,
    onUpdateUser: PropTypes.func
};

EditAccountInfo.defaultProps = {
    currentUser: null,
    fetchingUpdateUser: false,
    onCancelEditUser: () => {},
    onUpdateUser: () => {}
};

export default EditAccountInfo;
