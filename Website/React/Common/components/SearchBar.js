import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

import '../styles/SearchBar.css'

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: ""
        }
    }

    searchChanged(e){
        this.props.searchChanged(e.target.value);
    }

    render() {
        return(
            <div className="search-bar">
                <div className="search-bar-label">
                    <div className="search-icon">
                        <FontAwesomeIcon icon={faSearch} size="sm" />
                    </div>
                    <h4>{this.props.label}</h4>
                </div>
                <input className="search-input" onChange={this.searchChanged.bind(this)} name={this.props.name} />
            </div>
        );
    }
}

SearchBar.propTypes = {
    searchChanged: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string
};

SearchBar.defaultProps = {
    label: 'Search:'
};

export default SearchBar;