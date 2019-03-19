import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import { getMakeoverAppointments } from '../actions/MakeoverAppointmentActions';
import setCurrentPage from '../actions/SiteActions';
import AppointmentCard from '../components/AppointmentCard';
import PAGES from '../constants/Pages';

import '../../../Css/Schedule.css';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.renderAppointmentCard = this.renderAppointmentCard.bind(this);
        this.renderAppointments = this.renderAppointments.bind(this);
    }

    componentDidMount() {
        this.props.setCurrentPage(PAGES.BROWSE_ARTISTS.KEY);
        this.props.getMakeoverAppointments(this.props.currentSession.clientProfileId, this.props.currentSession.artistPortfolioId);
    }

    renderAppointmentCard(appointment) {
        return (
            <AppointmentCard
                clientProfileId={this.props.currentSession.clientProfileId}
                artistPortfolioId={this.props.currentSession.artistPortfolioId}
                appointment={appointment}
            />
        );
    }

    renderAppointments() {
        if (this.props.makeoverAppointments.length === 0) {
            return <h4>- No appointments scheduled! -</h4>;
        }

        return this.props.makeoverAppointments.map((appointment) => { return this.renderAppointmentCard(appointment); });
    }

    render() {
        if (this.props.fetchingMakeoverAppointments) {
            return <Loader />;
        }

        return (
            <div className="page-container">
                <h1 className="page-title">Your Schedule</h1>
                <div className="scheduled-appointments-list">
                    {this.renderAppointments()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        makeoverAppointments: state.makeoverAppointmentReducer.makeoverAppointments,
        fetchingMakeoverAppointments: state.makeoverAppointmentReducer.fetchingMakeoverAppointments
    };
}

Schedule.propTypes = {
    getMakeoverAppointments: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
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
    makeoverAppointments: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingMakeoverAppointments: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        getMakeoverAppointments,
        setCurrentPage
    }
)(Schedule));
