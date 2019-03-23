import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import '../../../Css/Schedule.css';

class ArtistCard extends React.Component {
    getClientName() {
        if (this.props.clientProfileId === this.props.appointment.clientProfileId) {
            return 'You';
        }
        return this.props.appointment.clientProfileDisplayName;
    }

    getArtistName() {
        if (this.props.artistPortfolioId === this.props.appointment.artistPortfolioId) {
            return 'You';
        }
        return this.props.appointment.artistPortfolioDisplayName;
    }

    render() {
        return (
            <div
                key={this.props.appointment.makeoverAppointmentId}
                className="appointment-card"
            >
                <a href={`/appointment/${this.props.appointment.makeoverAppointmentId}`}>
                    <div className="appointment-card-info">
                        <h3>{moment(this.props.appointment.appointmentDate, 'YYYY-MM-DD HH:mm:ss').format('MMM Do, YYYY @ LT')}</h3>
                        <h5>Appointment #{this.props.appointment.makeoverAppointmentId}</h5>
                        <h6>{`${this.getClientName()} scheduled an appointment with ${this.getArtistName()} for a ${this.props.appointment.makeoverTypeDescription} ${this.props.appointment.serviceTypeDescription}`}</h6>
                    </div>
                </a>
            </div>
        );
    }
}

ArtistCard.propTypes = {
    clientProfileId: PropTypes.number.isRequired,
    artistPortfolioId: PropTypes.number.isRequired,
    appointment: PropTypes.shape({
        makeoverAppointmentId: PropTypes.number,
        clientProfileId: PropTypes.number,
        clientProfileDisplayName: PropTypes.string,
        artistPortfolioId: PropTypes.number,
        artistPortfolioDisplayName: PropTypes.string,
        serviceTypeId: PropTypes.number,
        serviceTypeDescription: PropTypes.string,
        makeoverTypeId: PropTypes.number,
        makeoverTypeDescription: PropTypes.string,
        appointmentDate: PropTypes.string
    }).isRequired
};

export default ArtistCard;
