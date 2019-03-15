import React, { Component } from 'react';
import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'
import { connect } from 'react-redux'
import store from '../store/configureStore'
import io from 'socket.io-client'

class ChatRoomPage extends React.Component {

  constructor(props) {
    super(props);
    this.getUserMedia = navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).catch(e => alert('getUserMedia() error: ' + e.name))
    this.socket = io.connect('https://localhost:8080');
    // works up to getting stream for audio / video... does not add a chat room to the state
  }

/*  componentDidMount() {
    this.props.addRoom();
  }
*/
  render() {
      return (
          <div>
          /*
          <div>
        <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia} />
        <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />
      </div>*/
              <h1>AppointmentSetup</h1>
          </div>
      );
  }
}

/*const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
const mapDispatchToProps = (dispatch, ownProps) => (
    {
      addRoom: () => store.dispatch({ type: 'ADD_ROOM', room: ownProps.match.params.room })
    }
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
*/
export default ChatRoomPage;
