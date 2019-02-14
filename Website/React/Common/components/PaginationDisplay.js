import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import '../styles/PaginationDisplay.css'

export function calculateTotalPages(numberOfItems, itemsPerPage) {
    if (itemsPerPage < 1) {
        throw `Invalid items per page: ${itemsPerPage}. Must be greater than 0.`;
    }
    const remainder = numberOfItems % itemsPerPage;
    const division = numberOfItems / itemsPerPage;
    if (remainder > 0) {
        return division + 1;
    }
    return division;
}

class PaginationDisplay extends React.Component {
    static calculateTotalPages(numberOfItems, itemsPerPage) {
        if (itemsPerPage < 1) {
            throw `Invalid items per page: ${itemsPerPage}. Must be greater than 0.`;
        }
        const remainder = numberOfItems % itemsPerPage;
        const division = Math.floor(numberOfItems / itemsPerPage);
        if (remainder > 0) {
            return division + 1;
        }
        return division;
    }

    render() {
        const totalPages = PaginationDisplay.calculateTotalPages(this.props.numberOfItems, this.props.itemsPerPage);
        return (
            <div className="pagination-display">
                <div className="prev-button" >
                    <Button
                        label="< Previous"
                        onClickHandler={this.props.onPrevPageClick}
                        disabled={this.props.currentPage === 1}
                    />
                </div>
                <div className="page-display" > 
                    <h3>Page {this.props.currentPage} of {totalPages}</h3>
                </div>
                <div className="prev-button" >
                    <Button
                        label="Next >"
                        onClickHandler={this.props.onNextPageClick}
                        disabled={this.props.currentPage === totalPages}
                    />
                </div>
            </div>
        );
    }
}

PaginationDisplay.propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    numberOfItems: PropTypes.number.isRequired,
    onNextPageClick: PropTypes.func.isRequired,
    onPrevPageClick: PropTypes.func.isRequired
}

export default PaginationDisplay;
