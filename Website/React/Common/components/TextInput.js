import React from 'react';
import PropTypes from 'prop-types';

import isNullOrWhiteSpace from '../helpers/stringUtilities';

import '../styles/Input.css'

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true,
            currentValue: props.defaultValue,
            errorMessage: ''
        };
        this.renderInputLabel = this.renderInputLabel.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.updateValidation = this.updateValidation.bind(this);
        this.getValue = this.getValue.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    renderInputLabel() {
        const requiredMark = this.props.isRequired ? '*' : '';
        return `${this.props.label}${requiredMark}:`;
    }

    renderInput() {
        const inputClass = this.state.isValid ? 'input-input' : 'input-input invalid-input';
        const inputType = this.props.maskInput ? 'password' : 'text';
        return(
            <input 
                className={inputClass}
                type={inputType}
                onChange={this.onInputChanged}
                value={this.state.currentValue}
            />
        ); 
    }

    onInputChanged(event) {
        const inputValue = event.target.value;
        this.updateValidation(inputValue);
    }

    updateValidation(value = this.state.currentValue) {
        const validation = this.props.onValidate(value);
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
        else if (!validation.isValid) {
            this.setState({
                isValid: false,
                errorMessage: validation.message,
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

    //
    // FUNCTION		: isValid
    // DESCRIPTION	:
    //		This function determines if the input is valid
    // PARAMETERS	:
    //		None/Void
    // RETURNS		:
    //		bool    : true if valid, false if not
    //
    isValid() {
        if (this.props.isRequired && isNullOrWhiteSpace(this.state.currentValue)){
            return false;
        }
        return this.state.isValid;
    }

    render() {
        return(
            <div className="input-container">
                <h4>{this.renderInputLabel()}</h4>
                {this.renderInput()}
                <div className="input-error">
                    <h6>{this.state.errorMessage}</h6>
                </div>
            </div>
        );
    }
}

TextInput.propTypes = {
    label: PropTypes.string,
    maskInput: PropTypes.bool,
    isRequired: PropTypes.bool,
    onValidate: PropTypes.func,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

TextInput.defaultProps = {
    label: '',
    maskInput: false,
    isRequired: false,
    onValidate: (value) => { return { isValid: true }; },
    defaultValue: ''
}

export default TextInput;