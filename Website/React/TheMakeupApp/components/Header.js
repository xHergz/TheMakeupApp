import faBell from '@fortawesome/fontawesome-free-solid/faBell';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
import faFolder from '@fortawesome/fontawesome-free-solid/faFolder';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import PropTypes from 'prop-types';
import React from 'react';

import NavBarLink from '../../Common/components/NavBarLink';
import PAGES from '../constants/Pages';
import {
    GetAccountUrl,
    GetPortfolioUrl,
    GetProfileUrl
} from '../constants/UrlInfo';

import '../../../Css/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNavigationOpen: false
        };
        this.toggleMobileNavigation = this.toggleMobileNavigation.bind(this);
        this.renderHamburger = this.renderHamburger.bind(this);
        this.renderNavigation = this.renderNavigation.bind(this);
        this.renderDesktopNavigation = this.renderDesktopNavigation.bind(this);
        this.renderMobileNavigation = this.renderMobileNavigation.bind(this);
    }

    toggleMobileNavigation() {
        const currentlyOpen = this.state.mobileNavigationOpen;
        this.setState({
            mobileNavigationOpen: !currentlyOpen
        });
    }

    renderHamburger() {
        if (this.state.mobileNavigationOpen) {
            return (
                <div
                    className="close-navigation"
                    onClick={this.toggleMobileNavigation}
                >
                    &times;
                </div>
            );
        }
        return (
            <div
                className="open-navigation"
                onClick={this.toggleMobileNavigation}
            >
                <div className="hamburger-line light-line" />
                <div className="hamburger-line medium-line" />
                <div className="hamburger-line dark-line" />
            </div>
        );
    }

    renderNavigation(navClass) {
        return (
            <div className={navClass}>
                <NavBarLink
                    linkTo={PAGES.HOME_PAGE.LINK}
                    label={PAGES.HOME_PAGE.LABEL}
                    isActive
                    icon={faHome}
                />
                <NavBarLink
                    linkTo={PAGES.NOTIFICATIONS.LINK}
                    label="My Notifications"
                    isActive={false}
                    icon={faBell}
                />
                <NavBarLink
                    linkTo={GetProfileUrl(this.props.displayName)}
                    label="My Profile"
                    isActive={false}
                    icon={faUser}
                />
                <NavBarLink
                    linkTo={GetPortfolioUrl(this.props.displayName)}
                    label="My Portfolio"
                    isActive={false}
                    icon={faFolder}
                />
                <NavBarLink
                    linkTo={GetAccountUrl(this.props.displayName)}
                    label="My Account"
                    isActive={false}
                    icon={faCog}
                />
                <NavBarLink
                    linkTo={PAGES.LOGOUT.LINK}
                    label={`${PAGES.LOGOUT.LABEL} ${this.props.displayName}`}
                    isActive={false}
                    icon={faSignOutAlt}
                />
            </div>
        );
    }

    renderDesktopNavigation() {
        return (
            this.renderNavigation('desktop-navigation')
        );
    }

    renderMobileNavigation() {
        if (!this.state.mobileNavigationOpen) {
            return null;
        }
        return (
            this.renderNavigation('mobile-navigation')
        );
    }

    render() {
        return (
            <div className="header">
                <div className="header-main">
                    <div className="site-title">
                        <h1>The Makeup App</h1>
                    </div>
                    {this.renderHamburger()}
                </div>
                {this.renderDesktopNavigation()}
                {this.renderMobileNavigation()}
            </div>
        );
    }
}

Header.propTypes = {
    displayName: PropTypes.string.isRequired
};

export default Header;
