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

//commented out
/*  componentDidMount() {
    this.props.addRoom();
  }
*/
//stops here
  render() {
    console.log(this.socket);
    console.log(this.getUserMedia);
    console.log(this.media);

      return (
        <div>
        <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia} />
        <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />

              <h1>AppointmentSetup</h1>
          </div>
      );
  }
}

//commented out

const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
const mapDispatchToProps = (dispatch, ownProps) => (
    {
      addRoom: () => store.dispatch({ type: 'ADD_ROOM', room: ownProps.match.params.room })
    }
  );
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);

//stops here
//export default ChatRoomPage;
