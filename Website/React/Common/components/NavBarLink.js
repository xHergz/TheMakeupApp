import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

    renderIcon() {
        if (this.props.icon === null) {
            return null;
        }
        return (
            <FontAwesomeIcon icon={this.props.icon} size="md" />
        );
    }

    render() {
        return (
            <div className={NavBarLink.getClassName(this.props.isActive)}>
                <a
                    href={this.props.linkTo}
                    className="plain-link"
                >
                    {this.renderIcon()}
                    <h5>
                        {this.props.label}
                        {this.props.children}
                    </h5>
                </a>
            </div>
        );
    }
}

NavBarLink.propTypes = {
    children: PropTypes.arrayOf(
        PropTypes.element
    ),
    linkTo: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    icon: PropTypes.instanceOf(IconDefinition)
};

NavBarLink.defaultProps = {
    children: null,
    isActive: false,
    icon: null
};

export default NavBarLink;
