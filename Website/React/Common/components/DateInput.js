import React from 'react';
import PropTypes from 'prop-types';

import isNullOrWhiteSpace from '../helpers/stringUtilities';

import '../styles/Input.css';

class DateInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true,
            currentValue: props.defaultValue,
            errorMessage: ''
        };
        this.onInputChanged = this.onInputChanged.bind(this);
        this.getValue = this.getValue.bind(this);
        this.updateValidation = this.updateValidation.bind(this);
        this.changeValidity = this.changeValidity.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.isValid = this.isValid.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.renderInputLabel = this.renderInputLabel.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    onInputChanged(event) {
        const inputValue = event.target.value;
        this.updateValidation(inputValue);
    }

    getValue() {
        return this.state.currentValue;
    }

    updateValidation(value = this.state.currentValue) {
        const validation = this.props.onValidate(value, this.props.isRequired);
        if (isNullOrWhiteSpace(value) && this.props.isRequired) {
            this.changeValidity(false);
            this.changeValue(value);
            this.setState({
                errorMessage: 'Input is Required'
            });
        }
        else if (!validation.isValid) {
            this.changeValidity(false);
            this.changeValue(value);
            this.setState({
                errorMessage: validation.message
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

    renderInputLabel() {
        const requiredMark = this.props.isRequired ? '*' : '';
        return `${this.props.label}${requiredMark}:`;
    }

    renderInput() {
        const inputClass = this.state.isValid ? 'input-input' : 'input-input invalid-input';
        return (
            <input
                className={inputClass}
                type="date"
                onChange={this.onInputChanged}
                value={this.state.currentValue}
            />
        );
    }

    render() {
        return (
            <div className="input-container">
                <h5>{this.renderInputLabel()}</h5>
                {this.renderInput()}
                <div className="input-error">
                    <h6>{this.state.errorMessage}</h6>
                </div>
            </div>
        );
    }
}

DateInput.propTypes = {
    label: PropTypes.string,
    isRequired: PropTypes.bool,
    onValidate: PropTypes.func,
    defaultValue: PropTypes.string,
    onValidityChanged: PropTypes.func,
    onValueChanged: PropTypes.func
};

DateInput.defaultProps = {
    label: '',
    isRequired: false,
    onValidate: () => {
        return {
            isValid: true
        };
    },
    defaultValue: '',
    onValidityChanged: () => {},
    onValueChanged: () => {}
};

export default DateInput;
