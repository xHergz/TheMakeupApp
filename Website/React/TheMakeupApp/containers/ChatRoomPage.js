import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

import { addConsultationRoom } from '../actions/ConsultationActions';
import { WEB_RTC_SERVER_URL } from '../constants/ApiInfo';
import MediaContainer from './MediaContainer';
import CommunicationContainer from './CommunicationContainer';

class ChatRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            media: null
        };
        this.getUserMedia = navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).catch((e) => {
            console.error(`getUserMedia() error: ${e.name}`);
        });
        this.socket = io.connect(WEB_RTC_SERVER_URL);
        this.setMedia = this.setMedia.bind(this);
    }

    componentDidMount() {
        this.props.addConsultationRoom(this.props.roomId);
    }

    setMedia(media) {
        this.setState({
            media
        });
    }

    render() {
        return (
            <div id="consultation-chat-room">
                <MediaContainer setMedia={this.setMedia} socket={this.socket} getUserMedia={this.getUserMedia} />
                <CommunicationContainer socket={this.socket} media={this.state.media} getUserMedia={this.getUserMedia} displayName={this.props.displayName} />
            </div>
        );
    }
}

ChatRoomPage.propTypes = {
    roomId: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    addConsultationRoom: PropTypes.func.isRequired
};

export default withRouter(connect(
    null,
    {
        addConsultationRoom
    }
)(ChatRoomPage));
