
import React from 'react';

class TabHeader extends React.Component {
    render() {
        return (
            <div className="tab-header">
                {this.props.children}
            </div>
        );
    }
}

export default TabHeader;
