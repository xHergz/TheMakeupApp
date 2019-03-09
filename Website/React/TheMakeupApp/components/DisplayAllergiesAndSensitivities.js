import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import FormInfoDisplay from './FormInfoDisplay';
import FormInfoRow from './FormInfoRow';

import '../../../Css/AllergiesAndSensitivities.css';

class DisplayAllergiesAndSensitivities extends React.Component {
    constructor(props) {
        super(props);
        this.renderEditButton = this.renderEditButton.bind(this);
        this.renderClientAllergiesAndSensitivities = this.renderClientAllergiesAndSensitivities.bind(this);
    }

    static renderClientAllergySensitivity(clientAllergySensitivity) {
        return (
            <FormInfoRow
                value={clientAllergySensitivity.allergySensitivityDescription}
            />
        );
    }

    renderEditButton() {
        if (!this.props.ownsClientProfile) {
            return null;
        }

        return (
            <Button
                label="Edit"
                onClickHandler={this.props.onEnableClientAllergySensitivityEditing}
            />
        );
    }

    renderClientAllergiesAndSensitivities() {
        if (this.props.clientAllergiesAndSensitivities === null) {
            return <h4>- None -</h4>;
        }

        return (
            this.props.clientAllergiesAndSensitivities.map(
                (clientAllergySensitivity) => {
                    return DisplayAllergiesAndSensitivities.renderClientAllergySensitivity(clientAllergySensitivity);
                }
            )
        );
    }

    render() {
        return (
            <div>
                <div className="form-info-actions">
                    <div className="form-info-action">
                        <h1>Allergies &amp; Sensitivities</h1>
                    </div>
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        {this.renderEditButton()}
                    </div>
                </div>
                <FormInfoDisplay>
                    {this.renderClientAllergiesAndSensitivities()}
                </FormInfoDisplay>
            </div>
        );
    }
}

DisplayAllergiesAndSensitivities.propTypes = {
    clientAllergiesAndSensitivities: PropTypes.arrayOf(PropTypes.object),
    onEnableClientAllergySensitivityEditing: PropTypes.func,
    ownsClientProfile: PropTypes.bool
};

DisplayAllergiesAndSensitivities.defaultProps = {
    clientAllergiesAndSensitivities: [],
    onEnableClientAllergySensitivityEditing: () => {},
    ownsClientProfile: false
};

export default DisplayAllergiesAndSensitivities;
