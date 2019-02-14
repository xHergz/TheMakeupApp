import React from 'react';
import PropTypes from 'prop-types';

import isNullOrWhiteSpace from '../helpers/stringUtilities';

import '../styles/Input.css'

class DropdownInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: props.defaultValue,
            isValid: true,
            errorMessage: ''
        };
        this.renderOption = this.renderOption.bind(this);
        this.renderInputLabel = this.renderInputLabel.bind(this);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.isValid = this.isValid.bind(this);
        this.updateValidation = this.updateValidation.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    renderOption(option) {
        const value = option[this.props.valueKey];
        return (
            <option key={value} value={value}>
                {option[this.props.labelKey]}
            </option>
        )
    }

    renderInputLabel() {
        const requiredMark = this.props.isRequired ? '*' : '';
        return `${this.props.label}${requiredMark}:`;
    }

    onSelectionChanged(event) {
        const newValue = event.target.value;
        this.updateValidation(newValue);        
        this.props.onChangeHandler(newValue);
    }

    isValid() {
        return this.state.isValid;
    }

    updateValidation(value = this.state.currentValue) {
        if (isNullOrWhiteSpace(value) && this.props.isRequired) {
            this.setState({
                isValid: false,
                errorMessage: 'Input is Required',
                currentValue: value
            })
        }
        else if (isNullOrWhiteSpace(value) && !this.props.isRequired) {
            this.setState({
                isValid: true,
                errorMessage: '',
                currentValue: value
            })
        }
        else {
            this.setState({
                isValid: true,
                errorMessage: '',
                currentValue: value
            })
        }
    }

    getValue() {
        return this.state.currentValue;
    }

    render() {
        let defaultOption = null;
        if (this.props.startsEmpty) {
            defaultOption = <option value="" default hidden />;
        }
        const selectClass = this.state.isValid ? 'input-input valid-input' : 'input-input invalid-input';
        return(
            <div className="input-container">
                <h5>{this.renderInputLabel()}</h5>
                <select
                    className={selectClass}
                    onChange={this.onSelectionChanged}
                    defaultValue={this.props.defaultValue}
                >
                    {defaultOption}
                    {this.props.options.map(option => this.renderOption(option))}
                </select>
                <div className="input-error">
                    <h6>{this.state.errorMessage}</h6>
                </div>
            </div>
        );
    }
}

DropdownInput.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueKey: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func,
    startsEmpty: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    isRequired: PropTypes.bool
};

DropdownInput.defaultProps = {
    onChangeHandler: () => {},
    startsEmpty: false,
    defaultValue: '',
    isRequired: false
}

export default DropdownInput;