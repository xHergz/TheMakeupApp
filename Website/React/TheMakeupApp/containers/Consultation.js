import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client'

import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'

class Consultation extends React.Component {
    componentDidMount() {
        // Get consultation information from api with consultation id
    }

    render() {
        // If the call is still fetching, render loader

        // If the consultation information is null display Not found
        
        return (
            <div>
                <h1>Consultation Room: {this.props.match.params.consultationId}</h1>
            </div>
        );
    }
}

Consultation.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            consultationId: PropTypes.string.isRequired
        })
    }).isRequired
};

export default Consultation;
