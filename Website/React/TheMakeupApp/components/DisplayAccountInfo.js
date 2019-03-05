import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import Loader from '../../Common/components/Loader';

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
                <div className="account-info-display">
                    <div className="account-info-block">
                        <h3>Email:</h3>
                        <div>
                            <h4>{this.props.currentUser.email}</h4>
                        </div>
                    </div>
                    <div className="account-info-block">
                        <h3>Display Name:</h3>
                        <div>
                            <h4>{this.props.currentUser.displayName}</h4>
                        </div>
                    </div>
                    <div className="account-info-block">
                        <h3>First Name:</h3>
                        <div>
                            <h4>{this.props.currentUser.firstName}</h4>
                        </div>
                    </div>
                    <div className="account-info-block">
                        <h3>Last Name:</h3>
                        <div>
                            <h4>{this.props.currentUser.lastName}</h4>
                        </div>
                    </div>
                </div>
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
