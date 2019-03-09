import React from 'react';
import PropTypes from 'prop-types';

import DisplayHeadshots from './DisplayHeadshots';
import EditHeadshots from './EditHeadshots';

import '../../../Css/Headshots.css';

const Headshots = (props) => {
    if (!props.ownsClientProfile && !props.currentSession.isArtist) {
        return null;
    }

    if (props.editingClientHeadshots) {
        return (
            <EditHeadshots
                currentSession={props.currentSession}
                clientHeadshots={props.clientHeadshots}
                fetchingAddClientHeadshot={props.fetchingAddClientHeadshot}
                fetchingRemoveClientHeadshot={props.fetchingRemoveClientHeadshot}
                onAddClientHeadshot={props.onAddClientHeadshot}
                onDisableClientHeadshotEditing={props.onDisableClientHeadshotEditing}
                onRemoveClientHeadshot={props.onRemoveClientHeadshot}
            />
        );
    }

    return (
        <DisplayHeadshots
            clientHeadshots={props.clientHeadshots}
            onEnableClientHeadshotEditing={props.onEnableClientHeadshotEditing}
            ownsClientProfile={props.ownsClientProfile}
        />
    );
};

Headshots.propTypes = {
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired
    }).isRequired,
    clientHeadshots: PropTypes.arrayOf(PropTypes.object),
    fetchingAddClientHeadshot: PropTypes.bool,
    fetchingRemoveClientHeadshot: PropTypes.bool,
    editingClientHeadshots: PropTypes.bool,
    onAddClientHeadshot: PropTypes.func,
    onDisableClientHeadshotEditing: PropTypes.func,
    onEnableClientHeadshotEditing: PropTypes.func,
    onRemoveClientHeadshot: PropTypes.func,
    ownsClientProfile: PropTypes.bool
};

Headshots.defaultProps = {
    clientHeadshots: [],
    fetchingAddClientHeadshot: false,
    fetchingRemoveClientHeadshot: false,
    editingClientHeadshots: false,
    onAddClientHeadshot: () => {},
    onDisableClientHeadshotEditing: () => {},
    onEnableClientHeadshotEditing: () => {},
    onRemoveClientHeadshot: () => {},
    ownsClientProfile: false
};

export default Headshots;
