import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import '../../../Css/Notifications.css';

class WarningBlock extends React.Component {
    render() {
        return (
            <div className="warning-block">
                <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                <h6>{this.props.message}</h6>
            </div>
        );
    }
}

WarningBlock.propTypes = {
    message: PropTypes.string.isRequired
};

export default WarningBlock;
