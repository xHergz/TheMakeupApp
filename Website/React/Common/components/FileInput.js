import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import '../styles/Input.css';

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: '',
            currentFileName: null
        };
        this.getValue = this.getValue.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.fileLoaded = this.fileLoaded.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.fileInput = React.createRef();
    }

    getValue() {
        return this.state.currentValue;
    }

    loadFile() {
        const file = this.fileInput.current.files[0];
        const reader = new FileReader();
        let fileName = '';
        if (file !== null) {
            fileName = file.name;
        }

        reader.addEventListener('load', () => { this.fileLoaded(reader, fileName); }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    fileLoaded(reader, fileName) {
        this.setState({
            currentValue: reader.result,
            currentFileName: fileName
        });
        this.props.onValueChanged();
    }

    selectFile() {
        this.fileInput.current.click();
    }

    render() {
        const selectedLabel = (this.state.currentValue === null) ? 'None' : this.state.currentFileName;
        return (
            <div className="input-container">
                <h3>File Selected: {selectedLabel}</h3>
                <input
                    ref={this.fileInput}
                    className="input-input"
                    type="file"
                    onChange={this.loadFile}
                    hidden
                />
                <Button
                    label={this.props.label}
                    onClickHandler={this.selectFile}
                />
            </div>
        );
    }
}

FileInput.propTypes = {
    label: PropTypes.string,
    onValueChanged: PropTypes.func
};

FileInput.defaultProps = {
    label: 'Select Image',
    onValueChanged: () => {}
};

export default FileInput;
