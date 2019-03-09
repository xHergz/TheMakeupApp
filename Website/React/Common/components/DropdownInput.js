import React from 'react';
import PropTypes from 'prop-types';

import isNullOrWhiteSpace from '../helpers/stringUtilities';

import '../styles/Input.css';

class DropdownInput extends React.Component {
    constructor(props) {
        super(props);
        let firstValue = (props.options[0] === undefined) ? null : props.options[0][props.valueKey];
        if (props.defaultValue !== null) {
            firstValue = props.defaultValue;
        }
        this.state = {
            currentValue: props.startsEmpty ? null : firstValue,
            isValid: true,
            errorMessage: ''
        };
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.getValue = this.getValue.bind(this);
        this.updateValidation = this.updateValidation.bind(this);
        this.changeValidity = this.changeValidity.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.isValid = this.isValid.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.renderOption = this.renderOption.bind(this);
        this.renderInputLabel = this.renderInputLabel.bind(this);
    }

    onSelectionChanged(event) {
        const newValue = event.target.value;
        this.updateValidation(newValue);
    }

    getValue() {
        return this.state.currentValue;
    }

    updateValidation(value = this.state.currentValue) {
        if (isNullOrWhiteSpace(value) && this.props.isRequired) {
            this.changeValidity(false);
            this.changeValue(value);
            this.setState({
                errorMessage: 'Input is Required'
            });
        }
        else if (isNullOrWhiteSpace(value) && !this.props.isRequired) {
            this.changeValidity(true);
            this.changeValue(value);
            this.setState({
                errorMessage: ''
            });
        }
        else {
            this.changeValidity(true);
            this.changeValue(value);
            this.setState({
                errorMessage: ''
            });
        }
    }

    changeValidity(valid) {
        this.setState({
            isValid: valid
        }, this.props.onValidityChanged);
    }

    changeValue(value) {
        this.setState({
            currentValue: value
        }, this.props.onValueChanged);
    }

    isValid() {
        return this.state.isValid;
    }

    isEmpty() {
        return isNullOrWhiteSpace(this.state.currentValue);
    }

    renderOption(option) {
        const value = option[this.props.valueKey];
        return (
            <option key={value} value={value}>
                {option[this.props.labelKey]}
            </option>
        );
    }

    renderInputLabel() {
        const requiredMark = this.props.isRequired ? '*' : '';
        return `${this.props.label}${requiredMark}:`;
    }

    render() {
        let defaultOption = null;
        if (this.props.startsEmpty) {
            defaultOption = <option value="" default hidden />;
        }
        const selectClass = this.state.isValid ? 'input-input valid-input' : 'input-input invalid-input';
        return (
            <div className="input-container">
                <h3>{this.renderInputLabel()}</h3>
                <select
                    className={selectClass}
                    onChange={this.onSelectionChanged}
                    defaultValue={this.props.defaultValue}
                >
                    {defaultOption}
                    {this.props.options.map((option) => { return this.renderOption(option); })}
                </select>
                <div className="input-error">
                    <h6>{this.state.errorMessage}</h6>
                </div>
            </div>
        );
    }
}

DropdownInput.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueKey: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    startsEmpty: PropTypes.bool,
    onValidityChanged: PropTypes.func,
    onValueChanged: PropTypes.func
};

DropdownInput.defaultProps = {
    label: '',
    isRequired: false,
    defaultValue: null,
    startsEmpty: false,
    onValidityChanged: () => {},
    onValueChanged: () => {}
};

export default DropdownInput;
