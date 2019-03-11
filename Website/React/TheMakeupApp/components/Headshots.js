import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../Common/components/Loader';
import {
    addClientHeadshot,
    disableClientHeadshotEditing,
    enableClientHeadshotEditing,
    getClientHeadshots,
    removeClientHeadshot
} from '../actions/ClientHeadshotActions';
import DisplayHeadshots from './DisplayHeadshots';
import EditHeadshots from './EditHeadshots';

import '../../../Css/Headshots.css';

class Headshots extends React.Component {
    componentDidMount() {
        if ((this.props.ownsClientProfile || this.props.currentSession.isArtist) && this.props.currentClientProfile !== null) {
            this.props.getClientHeadshots(this.props.clientDisplayName);
        }
    }

    render() {
        if (this.props.fetchingClientHeadshots) {
            return <Loader />;
        }

        if (this.props.currentClientProfile === null || (!this.props.ownsClientProfile && !this.props.currentSession.isArtist)) {
            return null;
        }

        if (this.props.editingClientHeadshots) {
            return (
                <EditHeadshots
                    currentSession={this.props.currentSession}
                    clientHeadshots={this.props.clientHeadshots}
                    fetchingAddClientHeadshot={this.props.fetchingAddClientHeadshot}
                    fetchingRemoveClientHeadshot={this.props.fetchingRemoveClientHeadshot}
                    onAddClientHeadshot={this.props.addClientHeadshot}
                    onDisableClientHeadshotEditing={this.props.disableClientHeadshotEditing}
                    onRemoveClientHeadshot={this.props.removeClientHeadshot}
                />
            );
        }

        return (
            <DisplayHeadshots
                clientHeadshots={this.props.clientHeadshots}
                onEnableClientHeadshotEditing={this.props.enableClientHeadshotEditing}
                ownsClientProfile={this.props.ownsClientProfile}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        clientHeadshots: state.clientHeadshotReducer.clientHeadshots,
        fetchingClientHeadshots: state.clientHeadshotReducer.fetchingClientHeadshots,
        fetchingAddClientHeadshot: state.clientHeadshotReducer.fetchingAddClientHeadshot,
        fetchingRemoveClientHeadshot: state.clientHeadshotReducer.fetchingRemoveClientHeadshot,
        editingClientHeadshots: state.clientHeadshotReducer.editingClientHeadshots
    };
}

Headshots.propTypes = {
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired,
        isClient: PropTypes.bool.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired,
    clientHeadshots: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingClientHeadshots: PropTypes.bool.isRequired,
    fetchingAddClientHeadshot: PropTypes.bool.isRequired,
    fetchingRemoveClientHeadshot: PropTypes.bool.isRequired,
    editingClientHeadshots: PropTypes.bool.isRequired,
    addClientHeadshot: PropTypes.func.isRequired,
    disableClientHeadshotEditing: PropTypes.func.isRequired,
    enableClientHeadshotEditing: PropTypes.func.isRequired,
    getClientHeadshots: PropTypes.func.isRequired,
    removeClientHeadshot: PropTypes.func.isRequired,
    clientDisplayName: PropTypes.string.isRequired,
    currentClientProfile: PropTypes.shape({
        clientProfileId: PropTypes.number,
        profilePictureUrl: PropTypes.string,
        biography: PropTypes.string,
        eyeColourId: PropTypes.number,
        eyeColourDescription: PropTypes.string,
        hairColourId: PropTypes.number,
        hairColourDescription: PropTypes.string,
        skinToneId: PropTypes.number,
        skinToneDescription: PropTypes.string
    }),
    ownsClientProfile: PropTypes.bool
};

Headshots.defaultProps = {
    currentClientProfile: null,
    ownsClientProfile: false
};

export default withRouter(connect(
    mapStateToProps,
    {
        addClientHeadshot,
        disableClientHeadshotEditing,
        enableClientHeadshotEditing,
        getClientHeadshots,
        removeClientHeadshot
    }
)(Headshots));
