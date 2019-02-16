import React from 'react';

import PAGES from '../constants/Pages';

import '../../../Css/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileNavigationOpen: false
        };
        this.toggleMobileNavigation = this.toggleMobileNavigation.bind(this);
        this.renderHamburger = this.renderHamburger.bind(this);
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

    renderNavigation() {
        if (!this.state.mobileNavigationOpen) {
            return (
                <div className="desktop-navigation">
                    {'Desktop Nav'}
                </div>
            );
        }

        return (
            <div>
                <div className="mobile-navigation">
                    {'Mobile Nav'}
                </div>
                <div className="desktop-navigation">
                    {'Desktop Nav'}
                </div>
            </div>
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
                {this.renderNavigation()}
            </div>
        );
    }
}

export default Header;
