
import React from 'react';
import PropTypes from 'prop-types';

class TabHeaderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: props.isInitialTab
        };
        this.changeToThisTab = this.changeToThisTab.bind(this);
        this.tabChanged = this.tabChanged.bind(this);
        this.getClass = this.getClass.bind(this);
    }

    componentDidMount() {
        addEventListener('changeTab', this.tabChanged, false);
    }

    changeToThisTab() {
        const changeTabEvent = new CustomEvent('changeTab', {detail: this.props.tabKey});
        dispatchEvent(changeTabEvent);
    }

    tabChanged(e) {
        this.setState({isActive: e.detail === this.props.tabKey});
    }

    getClass() {
        if (this.state.isActive) {
            return 'active-tab-header-item';
        }

        return 'inactive-tab-header-item';
    }

    render() {
        return (
            <div className={this.getClass()} onClick={this.changeToThisTab}>
                <h3>{this.props.tabLabel}</h3>
            </div>
        );
    }
}

TabHeaderItem.propTypes = {
    tabLabel: PropTypes.string,
    tabKey: PropTypes.string,
    isInitialTab: PropTypes.bool
};

TabHeaderItem.defaultProps = {
    isInitialTab: false
};

export default TabHeaderItem;
