import React from 'react';
import { PropTypes } from 'prop-types';
import Remarkable from 'remarkable-react';
import MediaContainer from './MediaContainer';
import Communication from '../components/Communication';
import store from '../store/configureStore';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  setConsultationUser,
  setConsultationAudio,
  setConsultationVideo,
  setConsultationBridge
} from '../actions/ConsultationActions';

class CommunicationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sid: '',
      message: '',
      audio: true,
      video: true
    };
    //bind all the classes to avoid state loss
    this.handleInvitation = this.handleInvitation.bind(this);
    this.handleHangup = this.handleHangup.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.send = this.send.bind(this);
    this.hideAuth = this.hideAuth.bind(this);
    this.full = this.full.bind(this);
  }

  hideAuth() {
    //this.props.media.setState({bridge: 'connecting'});
    this.props.setConsultationBridge('connecting');
  }
  full() {
    this.props.media.setState({bridge: 'full'});
    this.props.setConsultationBridge('full');
  }
  componentDidMount() {



    const socket = this.props.socket;
    console.log('props', this.props)
    this.setState({video: this.props.video, audio: this.props.audio});

    socket.on('create', () => {
      //this.props.media.setState({user: 'host', bridge: 'create'})
      console.log('Comm Container is creating');
      this.props.setConsultationBridge('create');
      this.props.setConsultationUser('host');
    });
      console.log(this.state);
    socket.on('full', this.full);
    socket.on('bridge', role => this.props.media.init());
    socket.on('join', () => {
       // this.props.media.setState({user: 'guest', bridge: 'join'})
       this.props.setConsultationBridge('join');
       this.props.setConsultationUser('guest');
    });
    socket.on('approve', ({ message, sid }) => {
      // this.props.media.setState({bridge: 'approve'});
      this.props.setConsultationBridge('approve');
      this.setState({ message, sid });
    });
    socket.emit('find');
    this.props.getUserMedia
      .then(stream => {
          this.localStream = stream;
          this.localStream.getVideoTracks()[0].enabled = this.state.video;
          this.localStream.getAudioTracks()[0].enabled = this.state.audio;
        });
  }
  handleInput(e) {
    console.log([e.target.dataset.ref], e.target.value);
    this.setState({message: e.target.value});
  }
  send(e) {
    e.preventDefault();
    this.props.socket.emit('auth', this.state);
    this.hideAuth();
  }
  handleInvitation(e) {
    e.preventDefault();
    this.props.socket.emit([e.target.dataset.ref], this.state.sid);
    this.hideAuth();
  }
  getContent(content) {
    return {__html: (new Remarkable()).render(content)};
  }
  toggleVideo() {
    const video = this.localStream.getVideoTracks()[0].enabled = !this.state.video;
    this.setState({video: video});
    this.props.setConsultationVideo(video);
  }
  toggleAudio() {
    const audio = this.localStream.getAudioTracks()[0].enabled = !this.state.audio;
    this.setState({audio: audio});
    this.props.setConsultationAudio(audio);
  }
  handleHangup() {
    this.props.media.hangup();
  }
  render(){

    return (
      <Communication

        {...this.state}
        toggleVideo={this.toggleVideo}
        toggleAudio={this.toggleAudio}
        getContent={this.getContent}
        send={this.send}
        handleHangup={this.handleHangup}
        handleInput={this.handleInput}
        handleInvitation={this.handleInvitation} />
    );
  }
}
function mapStateToProps (state) {
  return{
    video: state.consultationReducer.video,
    audio: state.consultationReducer.audio
  };
}

CommunicationContainer.propTypes = {
  socket: PropTypes.object.isRequired,
  getUserMedia: PropTypes.object.isRequired,
  audio: PropTypes.bool.isRequired,
  video: PropTypes.bool.isRequired,
  setConsultationVideo: PropTypes.func.isRequired,
  setConsultationAudio: PropTypes.func.isRequired,
  media: PropTypes.instanceOf(MediaContainer),
  setConsultationBridge: PropTypes.func.isRequired,
  setConsultationUser: PropTypes.func.isRequired
};

export default withRouter(connect(
  mapStateToProps,
  {
    setConsultationUser,
    setConsultationAudio,
    setConsultationVideo,
    setConsultationBridge
  }
)(CommunicationContainer));
