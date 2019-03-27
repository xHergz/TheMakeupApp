import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getConsultation } from '../actions/ConsultationActions';
import ChatRoomPage from './ChatRoomPage';
import Loader from '../../Common/components/Loader';


class Consultation extends React.Component {
    componentDidMount() {
        // Get consultation information from api with consultation id
        this.props.getConsultation(this.props.match.params.consultationId);
    }

    render() {
        // If the call is still fetching, render loader
        if (this.props.fetchingConsultation) {
            return <Loader />;
        }

        // If the consultation information is null display Not found
        if (this.props.currentConsultation === null) {
            return <h4>You can not join this consultation.</h4>;
        }

        return (
            <div className="page-container">
                <h1 className="page-title">Consultation Room: {this.props.match.params.consultationId}</h1>
                <ChatRoomPage
                    roomId={this.props.currentConsultation.roomId}
                    displayName={this.props.currentSession.displayName}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        fetchingConsultation: state.consultationReducer.fetchingConsultation,
        currentConsultation: state.consultationReducer.currentConsultation
    };
}

Consultation.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            consultationId: PropTypes.string.isRequired
        })
    }).isRequired,
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.number.isRequired,
        isClient: PropTypes.number.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number,
        isArtistOnline: PropTypes.number
    }).isRequired,
    getConsultation: PropTypes.func.isRequired,
    fetchingConsultation: PropTypes.bool.isRequired,
    currentConsultation: PropTypes.shape({
        consultationId: PropTypes.number,
        roomId: PropTypes.string,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number,
        dateCreate: PropTypes.string
    }).isRequired
};


export default withRouter(connect(
    mapStateToProps,
    {
        getConsultation
    }
)(Consultation));
