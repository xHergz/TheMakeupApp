import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    setConsultationBridge,
    setConsultationUser
} from '../actions/ConsultationActions';

class MediaBridge extends React.Component {
    static handleError(e) {
        console.error(e);
    }

    constructor(props) {
        super(props);
        this.onRemoteHangup = this.onRemoteHangup.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.sendData = this.sendData.bind(this);
        this.setupDataHandlers = this.setupDataHandlers.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.sendDescription = this.sendDescription.bind(this);
        this.hangup = this.hangup.bind(this);
        this.init = this.init.bind(this);
        this.setDescription = this.setDescription.bind(this);
    }

    componentWillMount() {
        // chrome polyfill for connection between the local device and a remote peer
        window.RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;
        this.props.setMedia(this);
    }

    componentDidMount() {
        this.props.getUserMedia.then((stream) => {
            this.localVideo.srcObject = stream;
            this.localStream = stream;
        });
        this.props.socket.on('message', this.onMessage);
        this.props.socket.on('hangup', this.onRemoteHangup);
    }

    componentWillUnmount() {
        this.props.setMedia(null);
        if (this.localStream !== undefined) {
            this.localStream.getVideoTracks()[0].stop();
        }
        this.props.socket.emit('leave');
    }

    onRemoteHangup() {
        this.props.setConsultationBridge('host-hangup');
        this.props.setConsultationUser('host');
    }

    onMessage(message) {
        if (message.type === 'offer') {
            // set remote description and answer
            this.pc.setRemoteDescription(new RTCSessionDescription(message));
            this.pc.createAnswer()
                .then(this.setDescription)
                .then(this.sendDescription)
                .catch(MediaBridge.handleError); // An error occurred, so handle the failure to connect
        }
        else if (message.type === 'answer') {
            // set remote description
            this.pc.setRemoteDescription(new RTCSessionDescription(message));
        }
        else if (message.type === 'candidate') {
            // add ice candidate
            this.pc.addIceCandidate(
                new RTCIceCandidate({
                    sdpMLineIndex: message.mlineindex,
                    candidate: message.candidate
                })
            );
        }
    }

    setupDataHandlers() {
        this.dc.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            console.log(`received message over data channel: ${msg}`);
        };
        this.dc.onclose = () => {
            this.remoteStream.getVideoTracks()[0].stop();
        };
    }

    setDescription(offer) {
        this.pc.setLocalDescription(offer);
    }

    sendData(msg) {
        this.dc.send(JSON.stringify(msg));
    }

    // send the offer to a server to be forwarded to the other peer
    sendDescription() {
        this.props.socket.send(this.pc.localDescription);
    }

    hangup() {
        this.props.setConsultationBridge('guest-hangup');
        this.props.setConsultationUser('guest');
        this.pc.close();
        this.props.socket.emit('leave');
    }

    init() {
        // wait for local media to be ready
        const attachMediaIfReady = () => {
            this.dc = this.pc.createDataChannel('chat');
            this.setupDataHandlers();
            this.pc.createOffer()
                .then(this.setDescription)
                .then(this.sendDescription)
                .catch(MediaBridge.handleError); // An error occurred, so handle the failure to connect
        };
        // set up the peer connection
        // this is one of Google's public STUN servers
        // make sure your offer/answer role does not change. If user A does a SLD
        // with type=offer initially, it must do that during  the whole session
        this.pc = new RTCPeerConnection({
            iceServers: [
                {
                    url: 'stun:stun.l.google.com:19302'
                }
            ]
        });
        // when our browser gets a candidate, send it to the peer
        this.pc.onicecandidate = (e) => {
            if (e.candidate) {
                this.props.socket.send({
                    type: 'candidate',
                    mlineindex: e.candidate.sdpMLineIndex,
                    candidate: e.candidate.candidate
                });
            }
        };
        // when the other side added a media stream, show it on screen
        this.pc.onaddstream = (e) => {
            this.remoteStream = e.stream;
            this.remoteVideo.srcObject = this.remoteStream;
        };
        this.pc.ondatachannel = (e) => {
            // data channel
            this.dc = e.channel;
            this.setupDataHandlers();
            this.sendData({
                peerMediaStream: {
                    video: this.localStream.getVideoTracks()[0].enabled
                }
            });
        };
        // attach local media to the peer connection
        this.localStream.getTracks().forEach((track) => { this.pc.addTrack(track, this.localStream); });
        // call if we were the last to connect (to increase
        // chances that everything is set up properly at both ends)
        if (this.props.user === 'host') {
            this.props.getUserMedia.then(attachMediaIfReady);
        }
    }

    render() {
        return (
            <div className={`media-bridge ${this.props.bridge}`}>
                <video className="local-video" ref={(ref) => this.localVideo = ref} autoPlay muted />
                <video className="remote-video" ref={(ref) => this.remoteVideo = ref} autoPlay />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.consultationReducer.user,
        bridge: state.consultationReducer.bridge
    };
}

MediaBridge.propTypes = {
    socket: PropTypes.object.isRequired,
    getUserMedia: PropTypes.object.isRequired,
    setMedia: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
    bridge: PropTypes.string.isRequired,
    setConsultationBridge: PropTypes.func.isRequired,
    setConsultationUser: PropTypes.func.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        setConsultationBridge,
        setConsultationUser
    }
)(MediaBridge));
