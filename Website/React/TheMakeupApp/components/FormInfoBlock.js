import React from 'react';
import PropTypes from 'prop-types';

import '../../../Css/FormInfo.css';

class FormInfoBlock extends React.Component {
    renderLabel() {
        if (this.props.label === null) {
            return null;
        }
        return <h3>{this.props.label}</h3>;
    }

    render() {
        return (
            <div className="form-info-block">
                {this.renderLabel()}
                <div>
                    <h4>{this.props.value}</h4>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

FormInfoBlock.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.element
    ),
    label: PropTypes.string,
    value: PropTypes.string.isRequired
};

FormInfoBlock.defaultProps = {
    children: null,
    label: null
};

export default FormInfoBlock;
