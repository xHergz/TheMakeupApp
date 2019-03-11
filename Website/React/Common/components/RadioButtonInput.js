import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Input.css';

class RadioButtonInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: props.defaultValue
        };
        this.onInputChanged = this.onInputChanged.bind(this);
        this.getValue = this.getValue.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.renderRadioButton = this.renderRadioButton.bind(this);
    }

    onInputChanged(event) {
        const inputValue = event.target.value;
        this.changeValue(inputValue);
    }

    getValue() {
        return this.state.currentValue;
    }

    changeValue(value) {
        this.setState({
            currentValue: value
        }, this.props.onValueChanged);
    }

    isEmpty() {
        return this.state.currentValue === null;
    }

    renderRadioButton(item) {
        const value = item[this.props.valueKey];
        const label = item[this.props.labelKey];
        return (
            <div className="radio-button-input" key={value}>
                <input
                    type="radio"
                    onChange={this.onInputChanged}
                    value={value}
                    defaultChecked={this.state.currentValue == value}
                />
                <h6>{label}</h6>
            </div>
        );
    }

    render() {
        return (
            <div className="input-container">
                <h3>{this.props.label}</h3>
                {this.props.options.map((option) => { return this.renderRadioButton(option); })}
            </div>
        );
    }
}

RadioButtonInput.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onValueChanged: PropTypes.func
};

RadioButtonInput.defaultProps = {
    label: '',
    options: [],
    labelKey: '',
    valueKey: '',
    defaultValue: null,
    onValueChanged: () => {}
};

export default RadioButtonInput;
