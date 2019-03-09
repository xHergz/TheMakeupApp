import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import DropdownInput from '../../Common/components/DropdownInput';
import Loader from '../../Common/components/Loader';
import TextInput from '../../Common/components/TextInput';
import { validateDescription } from '../../Common/helpers/validationUtilities';
import FormInfoDisplay from './FormInfoDisplay';
import FormInfoRow from './FormInfoRow';

import '../../../Css/AllergiesAndSensitivities.css';

class EditAllergiesAndSensitivities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmitCustomInput: false
        };
        this.customInputValidityChanged = this.customInputValidityChanged.bind(this);
        this.renderRemoveButton = this.renderRemoveButton.bind(this);
        this.renderClientAllergySensitivity = this.renderClientAllergySensitivity.bind(this);
        this.renderAddClientAllergySensitivityButton = this.renderAddClientAllergySensitivityButton.bind(this);
        this.renderClientAllergiesAndSensitivities = this.renderClientAllergiesAndSensitivities.bind(this);
        this.allergySensitivityInput = React.createRef();
        this.customAllergySensitivityInput = React.createRef();
    }

    customInputValidityChanged() {
        this.setState({
            canSubmitCustomInput: this.customAllergySensitivityInput.current.isValid()
        });
    }

    renderRemoveButton(clientProfileId, allergySensitivityId) {
        if (this.props.fetchingRemoveClientAllergySensitivity) {
            return <Loader />;
        }

        return (
            <Button
                label="Remove"
                onClickHandler={
                    () => {
                        this.props.onRemoveClientAllergySensitivity(
                            clientProfileId,
                            allergySensitivityId,
                            this.props.currentSession.displayName
                        );
                    }
                }
            />
        );
    }

    renderClientAllergySensitivity(clientAllergySensitivity) {
        return (
            <FormInfoRow
                value={clientAllergySensitivity.allergySensitivityDescription}
            >
                {this.renderRemoveButton(clientAllergySensitivity.clientProfileId, clientAllergySensitivity.allergySensitivityId)}
            </FormInfoRow>
        );
    }

    renderAddClientAllergySensitivityButton() {
        if (this.props.fetchingAddClientAllergySensitivity) {
            return <Loader />;
        }

        return (
            <Button
                label="Add"
                onClickHandler={
                    () => {
                        this.props.onAddClientAllergySensitivity(
                            this.props.clientProfileId,
                            this.allergySensitivityInput.current.getValue(),
                            this.props.currentSession.displayName
                        );
                    }
                }
            />
        );
    }

    renderAddCustomAllergySensitivityButton() {
        if (this.props.fetchingAddCustomAllergySensitivity) {
            return <Loader />;
        }

        return (
            <Button
                label="Add"
                onClickHandler={
                    () => {
                        this.props.onAddCustomAllergySensitivity(
                            this.props.clientProfileId,
                            this.customAllergySensitivityInput.current.getValue(),
                            this.props.currentSession.displayName
                        );
                    }
                }
                disabled={!this.state.canSubmitCustomInput}
            />
        );
    }

    renderClientAllergiesAndSensitivities() {
        if (this.props.clientAllergiesAndSensitivities === null) {
            return <h4>- None -</h4>;
        }

        return (
            this.props.clientAllergiesAndSensitivities.map(
                (clientAllergySensitivity) => {
                    return this.renderClientAllergySensitivity(clientAllergySensitivity);
                }
            )
        );
    }

    render() {
        return (
            <div>
                <div className="form-info-actions">
                    <div className="form-info-action">
                        <h1>Edit Allergies &amp; Sensitivities</h1>
                    </div>
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        <Button
                            label="Done"
                            onClickHandler={this.props.onDisableClientAllergySensitivityEditing}
                            disabled={
                                this.props.fetchingAddClientAllergySensitivity
                                || this.props.fetchingAddCustomAllergySensitivity
                                || this.props.fetchingRemoveClientAllergySensitivity
                            }
                        />
                    </div>
                </div>
                <FormInfoDisplay>
                    {this.renderClientAllergiesAndSensitivities()}
                    <div className="add-client-allergy-sensitivity">
                        <DropdownInput
                            ref={this.allergySensitivityInput}
                            label="Allergy/Sensitivity"
                            options={this.props.allergiesAndSensitivities}
                            valueKey="allergySensitivityId"
                            labelKey="allergySensitivityDescription"
                        />
                        {this.renderAddClientAllergySensitivityButton()}
                    </div>
                    <div className="add-custom-allergy-sensitivity">
                        <TextInput
                            ref={this.customAllergySensitivityInput}
                            label="Custom Allergy/Sensitivity"
                            onValidate={validateDescription}
                            onValidityChanged={this.customInputValidityChanged}
                        />
                        {this.renderAddCustomAllergySensitivityButton()}
                    </div>
                </FormInfoDisplay>
            </div>
        );
    }
}

EditAllergiesAndSensitivities.propTypes = {
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired
    }).isRequired,
    clientProfileId: PropTypes.number.isRequired,
    clientAllergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object),
    allergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object),
    fetchingAddClientAllergySensitivity: PropTypes.bool,
    fetchingRemoveClientAllergySensitivity: PropTypes.bool,
    fetchingAddCustomAllergySensitivity: PropTypes.bool,
    onAddClientAllergySensitivity: PropTypes.func,
    onAddCustomAllergySensitivity: PropTypes.func,
    onDisableClientAllergySensitivityEditing: PropTypes.func,
    onEnableClientAllergySensitivityEditing: PropTypes.func,
    onRemoveClientAllergySensitivity: PropTypes.func
};

EditAllergiesAndSensitivities.defaultProps = {
    clientAllergiesAndSensitivities: [],
    allergiesAndSensitivities: [],
    fetchingAddClientAllergySensitivity: false,
    fetchingRemoveClientAllergySensitivity: false,
    fetchingAddCustomAllergySensitivity: false,
    onAddClientAllergySensitivity: () => {},
    onAddCustomAllergySensitivity: () => {},
    onDisableClientAllergySensitivityEditing: () => {},
    onEnableClientAllergySensitivityEditing: () => {},
    onRemoveClientAllergySensitivity: () => {}
};

export default EditAllergiesAndSensitivities;
