import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import DropdownInput from '../../Common/components/DropdownInput';
import Loader from '../../Common/components/Loader';
import TextInput from '../../Common/components/TextInput';
import { validateDescription } from '../../Common/helpers/validationUtilities';
import FormInfoDisplay from './FormInfoDisplay';
import FormInfoRow from './FormInfoRow';

import '../../../Css/UserCustomizableProperties.css';

class EditUserCustomizableProperties extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmitCustomInput: false
        };
        this.customInputValidityChanged = this.customInputValidityChanged.bind(this);
        this.renderRemoveButton = this.renderRemoveButton.bind(this);
        this.renderUserCustomizableProperty = this.renderUserCustomizableProperty.bind(this);
        this.renderAddUserPropertyButton = this.renderAddUserPropertyButton.bind(this);
        this.renderAddCustomUserPropertyButton = this.renderAddCustomUserPropertyButton.bind(this);
        this.renderUserCustomizableProperties = this.renderUserCustomizableProperties.bind(this);
        this.propertyInput = React.createRef();
        this.customPropertyInpt = React.createRef();
    }

    customInputValidityChanged() {
        this.setState({
            canSubmitCustomInput: this.customPropertyInpt.current.isValid()
        });
    }

    renderRemoveButton(userIdentifier, propertyIdentifier) {
        if (this.props.fetchingRemoveProperty) {
            return <Loader />;
        }

        return (
            <Button
                label="Remove"
                onClickHandler={
                    () => {
                        this.props.onRemoveProperty(
                            userIdentifier,
                            propertyIdentifier,
                            this.props.currentSession.displayName
                        );
                    }
                }
            />
        );
    }

    renderUserCustomizableProperty(property) {
        return (
            <FormInfoRow
                value={property[this.props.propertyDescriptionKey]}
            >
                {this.renderRemoveButton(property[this.props.userIdentifierKey], property[this.props.propertyIdentifierKey])}
            </FormInfoRow>
        );
    }

    renderAddUserPropertyButton() {
        if (this.props.fetchingAddProperty) {
            return <Loader />;
        }

        return (
            <Button
                label="Add"
                onClickHandler={
                    () => {
                        this.props.onAddProperty(
                            this.props.userIdentifier,
                            this.propertyInput.current.getValue(),
                            this.props.currentSession.displayName
                        );
                    }
                }
            />
        );
    }

    renderAddCustomUserPropertyButton() {
        if (this.props.fetchingAddCustomProperty) {
            return <Loader />;
        }

        return (
            <Button
                label="Add"
                onClickHandler={
                    () => {
                        this.props.onAddCustomProperty(
                            this.props.userIdentifier,
                            this.customPropertyInpt.current.getValue(),
                            this.props.currentSession.displayName
                        );
                    }
                }
                disabled={!this.state.canSubmitCustomInput}
            />
        );
    }

    renderUserCustomizableProperties() {
        if (this.props.userProperties === null) {
            return <h4>- None -</h4>;
        }

        return (
            this.props.userProperties.map(
                (property) => {
                    return this.renderUserCustomizableProperty(property);
                }
            )
        );
    }

    render() {
        return (
            <div>
                <div className="form-info-actions">
                    <div className="form-info-action">
                        <h1>{this.props.label}</h1>
                    </div>
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        <Button
                            label="Done"
                            onClickHandler={this.props.onDisableEditing}
                            disabled={
                                this.props.fetchingAddProperty
                                || this.props.fetchingAddCustomProperty
                                || this.props.fetchingRemoveProperty
                            }
                        />
                    </div>
                </div>
                <FormInfoDisplay>
                    {this.renderUserCustomizableProperties()}
                    <div className="add-user-customizable-property">
                        <DropdownInput
                            ref={this.propertyInput}
                            label={this.props.dropdownLabel}
                            options={this.props.properties}
                            valueKey={this.props.propertyIdentifierKey}
                            labelKey={this.props.propertyDescriptionKey}
                        />
                        {this.renderAddUserPropertyButton()}
                    </div>
                    <div className="add-custom-user-customizable-property">
                        <TextInput
                            ref={this.customPropertyInpt}
                            label={this.props.textboxLabel}
                            onValidate={validateDescription}
                            onValidityChanged={this.customInputValidityChanged}
                        />
                        {this.renderAddCustomUserPropertyButton()}
                    </div>
                </FormInfoDisplay>
            </div>
        );
    }
}

EditUserCustomizableProperties.propTypes = {
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.number.isRequired,
        isClient: PropTypes.number.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired,
    label: PropTypes.string,
    dropdownLabel: PropTypes.string,
    textboxLabel: PropTypes.string,
    userIdentifierKey: PropTypes.string,
    propertyIdentifierKey: PropTypes.string,
    propertyDescriptionKey: PropTypes.string,
    userIdentifier: PropTypes.number.isRequired,
    userProperties: PropTypes.arrayOf(PropTypes.object),
    properties: PropTypes.arrayOf(PropTypes.object),
    fetchingAddProperty: PropTypes.bool,
    fetchingRemoveProperty: PropTypes.bool,
    fetchingAddCustomProperty: PropTypes.bool,
    onAddProperty: PropTypes.func,
    onAddCustomProperty: PropTypes.func,
    onDisableEditing: PropTypes.func,
    onRemoveProperty: PropTypes.func
};

EditUserCustomizableProperties.defaultProps = {
    label: '',
    dropdownLabel: '',
    textboxLabel: '',
    userIdentifierKey: '',
    propertyIdentifierKey: '',
    propertyDescriptionKey: '',
    userProperties: [],
    properties: [],
    fetchingAddProperty: false,
    fetchingRemoveProperty: false,
    fetchingAddCustomProperty: false,
    onAddProperty: () => {},
    onAddCustomProperty: () => {},
    onDisableEditing: () => {},
    onRemoveProperty: () => {}
};

export default EditUserCustomizableProperties;
