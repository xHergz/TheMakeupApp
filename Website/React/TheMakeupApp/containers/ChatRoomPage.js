import React, { Component } from 'react';
import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import store from '../store/configureStore'
import io from 'socket.io-client'
import { addConsultationRoom } from '../actions/ConsultationActions';
import PropTypes from 'prop-types';
class ChatRoomPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      media: null
    };
    this.getUserMedia = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).catch(e => alert('getUserMedia() error: ' + e.name))
    this.socket = io.connect('https://localhost:8080');
    // works up to getting stream for audio / video... does not add a chat room to the state
    this.setMedia = this.setMedia.bind(this);
    this.MediaContainer = React.createRef();
  }

  componentDidMount() {
    this.props.addConsultationRoom(this.props.roomID);
  }

  setMedia(media)
  {
    this.setState({media});
  }

//stops here
  render() {
    console.log(this.MediaContainer);

      return (
        <div>
        <MediaContainer ref = {this.MediaContainer} setMedia={this.setMedia} socket={this.socket} getUserMedia={this.getUserMedia} />
        <CommunicationContainer socket={this.socket} media={this.state.media} getUserMedia={this.getUserMedia} />

              <h1>AppointmentSetup</h1>
          </div>
      );
  }
}




ChatRoomPage.propTypes = {
  roomID: PropTypes.string.isRequired,
  addConsultationRoom : PropTypes.func.isRequired
};

export default withRouter(connect(null, {addConsultationRoom})(ChatRoomPage));
