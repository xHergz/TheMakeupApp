
import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Tabs.css';

class TabContainer extends React.Component {
    render() {
        return (
            <div className="tab-container">
                {this.props.children}
            </div>
        );
    }
}

TabContainer.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.element
    ).isRequired
};

export default TabContainer;
