import React from 'react';
import PropTypes from 'prop-types';

class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: props.isInitialTab
        };
        this.tabChanged = this.tabChanged.bind(this);
    }

    componentDidMount() {
        addEventListener('changeTab', this.tabChanged, false);
    }

    tabChanged(e) {
        this.setState({isActive: e.detail === this.props.tabKey});
    }

    render() {
        if (!this.state.isActive) {
            return null;
        }

        return (
            <div className="tab-content">
                {this.props.children}
            </div>
        );
    }
}

TabContent.propTypes = {
    tabKey: PropTypes.string,
    isInitialTab: PropTypes.bool
};

TabContent.defaultProps = {
    isInitialTab: false
};

export default TabContent;
