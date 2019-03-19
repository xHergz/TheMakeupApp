import faHandPointRight from '@fortawesome/fontawesome-free-solid/faHandPointRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import '../../../Css/Notifications.css';

class InfoBlock extends React.Component {
    render() {
        return (
            <div className="info-block">
                <FontAwesomeIcon icon={faHandPointRight} size="2x" />
                <h6>{this.props.message}</h6>
            </div>
        );
    }
}

InfoBlock.propTypes = {
    message: PropTypes.string.isRequired
};

export default InfoBlock;
