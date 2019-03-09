import React from 'react';
import PropTypes from 'prop-types';

import '../../../Css/FormInfo.css';

const FormInfoRow = (props) => {
    return (
        <div className="form-info-row">
            <div>
                <h4>{props.value}</h4>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    );
};

FormInfoRow.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.element
    ),
    value: PropTypes.string
};

FormInfoRow.defaultProps = {
    children: null,
    value: ''
};

export default FormInfoRow;
