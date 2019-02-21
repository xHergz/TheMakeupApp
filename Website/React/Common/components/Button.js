import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Button.css';

class Button extends React.Component {
    render() {
        return (
            <button
                className={this.props.disabled ? "disabled-button" : "enabled-button"}
                onClick={this.props.onClickHandler}
                disabled={this.props.disabled}
            >
                {this.props.label}
            </button>
        );
    }
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

Button.defaultProps = {
    disabled: false
};

export default Button;
