import React from 'react';
import PropTypes from 'prop-types';

import '../../../Css/FormInfo.css';

const FormInfoDisplay = (props) => {
    return (
        <div className="form-info-display">
            {props.children}
        </div>
    );
};

FormInfoDisplay.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.element
    ).isRequired
};

export default FormInfoDisplay;
