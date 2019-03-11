import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const InstantSearchHome = props =>

<div className="instantsearchhome">
    <div>
      <h1 itemProp="headline">Webrtc Video Room</h1>
      <p>Please enter a room name.</p>
      <input type="text" name="room" value={ props.roomId } onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/>
      <Link className="primary-button" to={ '/r/' + props.roomId }>Join</Link>

    </div>
  </div>;

  InstantSearchHome.propTypes = {
    handleChange: PropTypes.func.isRequired,
    defaultRoomId: PropTypes.string.isRequired,
    roomId: PropTypes.string.isRequired,
    rooms: PropTypes.array.isRequired

  };

  const mapStateToProps = store => ({rooms: store.rooms});

  export default connect(mapStateToProps)(InstantSearchHome);
