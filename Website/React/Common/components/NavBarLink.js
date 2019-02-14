import React from 'react';
import PropTypes from 'prop-types';

import '../styles/NavBarLink.css';

class NavBarLink extends React.Component {
    static getClassName(isActive) {
        if (isActive) {
            return 'active-nav-bar-link';
        }

        return 'inactive-nav-bar-link';
    }

    render() {
        return (
            <div className={NavBarLink.getClassName(this.props.isActive)}>
                <a
                    href={this.props.linkTo}
                    className="plain-link"
                >
                    <h6>{this.props.label}</h6>
                </a>
            </div>
        );
    }
}

NavBarLink.propTypes = {
    linkTo: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool
};

NavBarLink.defaultProps = {
    isActive: false
};

export default NavBarLink;
