import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import '../styles/Input.css';

class ImageInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: '',
            errorMessage: ''
        };
        this.getValue = this.getValue.bind(this);
        this.previewImage = this.previewImage.bind(this);
        this.imageLoader = this.imageLoaded.bind(this);
        this.getInitialImage = this.getInitialImage.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.imagePreview = React.createRef();
        this.imageInput = React.createRef();
    }

    getValue() {
        return this.state.currentValue;
    }

    getInitialImage() {
        if (this.props.defaultImageUrl === null) {
            return this.props.placeholderImageUrl;
        }
        return this.props.defaultImageUrl;
    }

    previewImage() {
        const file = this.imageInput.current.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => { this.imageLoaded(reader); }, false);

        if (file.size > this.props.maxSizeKb * 1000) {
            this.setState({
                errorMessage: `File too large. (Max size: ${this.props.maxSizeKb}kb)`
            });
            return;
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    imageLoaded(reader) {
        this.imagePreview.current.src = reader.result;
        this.setState({
            currentValue: reader.result,
            errorMessage: ''
        });
        this.props.onValueChanged();
    }

    selectImage() {
        this.imageInput.current.click();
    }

    render() {
        return (
            <div className="input-container">
                <img
                    ref={this.imagePreview}
                    src={this.getInitialImage()}
                    alt="Preview"
                    className="image-input-preview"
                />
                <input
                    ref={this.imageInput}
                    className="input-input"
                    type="file"
                    onChange={this.previewImage}
                    hidden
                />
                <Button
                    label={this.props.label}
                    onClickHandler={this.selectImage}
                />
                <div className="input-error">
                    <h6>{this.state.errorMessage}</h6>
                </div>
            </div>
        );
    }
}

ImageInput.propTypes = {
    label: PropTypes.string,
    defaultImageUrl: PropTypes.string,
    placeholderImageUrl: PropTypes.string,
    onValueChanged: PropTypes.func,
    maxSizeKb: PropTypes.number
};

ImageInput.defaultProps = {
    label: 'Select Image',
    defaultImageUrl: null,
    placeholderImageUrl: '',
    onValueChanged: () => {},
    maxSizeKb: 512
};

export default ImageInput;
