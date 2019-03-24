import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    setConsultationUser,
    setConsultationAudio,
    setConsultationVideo,
    setConsultationBridge
} from '../actions/ConsultationActions';
import Communication from '../components/Communication';
import MediaContainer from './MediaContainer';

class CommunicationContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sid: '',
            message: '',
            audio: true,
            video: true
        };
        this.handleInvitation = this.handleInvitation.bind(this);
        this.handleHangup = this.handleHangup.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.toggleVideo = this.toggleVideo.bind(this);
        this.toggleAudio = this.toggleAudio.bind(this);
        this.send = this.send.bind(this);
        this.hideAuth = this.hideAuth.bind(this);
        this.full = this.full.bind(this);
    }

    componentDidMount() {
        const socket = this.props.socket;
        this.setState({
            video: this.props.video,
            audio: this.props.audio
        });
        socket.on('create', () => {
            this.props.setConsultationBridge('create');
            this.props.setConsultationUser('host');
        });
        socket.on('full', this.full);
        socket.on('bridge', () => { this.props.media.init(); });
        socket.on('join', () => {
            this.props.setConsultationBridge('join');
            this.props.setConsultationUser('guest');
        });
        socket.on('approve', ({
            message,
            sid
        }) => {
            this.props.setConsultationBridge('approve');
            this.setState({
                message,
                sid
            });
        });
        socket.emit('find');
        this.props.getUserMedia.then((stream) => {
            this.localStream = stream;
            this.localStream.getVideoTracks()[0].enabled = this.state.video;
            this.localStream.getAudioTracks()[0].enabled = this.state.audio;
        });
    }

    hideAuth() {
        this.props.setConsultationBridge('connecting');
    }

    full() {
        this.props.setConsultationBridge('full');
    }

    handleInput(e) {
        this.setState({
            message: e.target.value
        });
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

    render() {
        return (
            <Communication
                {...this.state}
                toggleVideo={this.toggleVideo}
                toggleAudio={this.toggleAudio}
                send={this.send}
                handleHangup={this.handleHangup}
                handleInput={this.handleInput}
                handleInvitation={this.handleInvitation}
            />
        );
    }
}
function mapStateToProps(state) {
    return {
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
    media: PropTypes.instanceOf(MediaContainer).isRequired,
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
