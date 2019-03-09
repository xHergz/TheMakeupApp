import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Common/components/Button';
import FormInfoDisplay from './FormInfoDisplay';
import FormInfoRow from './FormInfoRow';

import '../../../Css/UserCustomizableProperties.css';

class DisplayUserCustomizableProperties extends React.Component {
    constructor(props) {
        super(props);
        this.renderUserCustomizableProperty = this.renderUserCustomizableProperty.bind(this);
        this.renderEditButton = this.renderEditButton.bind(this);
        this.renderUserCustomizableProperties = this.renderUserCustomizableProperties.bind(this);
    }

    renderUserCustomizableProperty(userCustomizableProperty) {
        return (
            <FormInfoRow
                value={userCustomizableProperty[this.props.descriptionKey]}
            />
        );
    }

    renderEditButton() {
        if (!this.props.ownsProperties) {
            return null;
        }

        return (
            <Button
                label="Edit"
                onClickHandler={this.props.onEnableEditing}
            />
        );
    }

    renderUserCustomizableProperties() {
        if (this.props.properties === null) {
            return <h4>- None -</h4>;
        }

        return (
            this.props.properties.map(
                (property) => {
                    return this.renderUserCustomizableProperty(property);
                }
            )
        );
    }

    render() {
        return (
            <div>
                <div className="form-info-actions">
                    <div className="form-info-action">
                        <h1>{this.props.label}</h1>
                    </div>
                    <div className="form-info-action-spacer" />
                    <div className="form-info-action">
                        {this.renderEditButton()}
                    </div>
                </div>
                <FormInfoDisplay>
                    {this.renderUserCustomizableProperties()}
                </FormInfoDisplay>
            </div>
        );
    }
}

DisplayUserCustomizableProperties.propTypes = {
    label: PropTypes.string,
    properties: PropTypes.arrayOf(PropTypes.object),
    descriptionKey: PropTypes.string,
    onEnableEditing: PropTypes.func,
    ownsProperties: PropTypes.bool
};

DisplayUserCustomizableProperties.defaultProps = {
    label: '',
    properties: [],
    descriptionKey: '',
    onEnableEditing: () => {},
    ownsProperties: false
};

export default DisplayUserCustomizableProperties;
