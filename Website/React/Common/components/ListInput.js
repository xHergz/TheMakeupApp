import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import DropdownInput from './DropdownInput';
import TextInput from './TextInput';

import '../styles/ListInput.css';

class ListInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentList: [],
            canAdd: !(this.props.listOptions === null),
            currentId: 0
        };
        this.getValues = this.getValues.bind(this);
        this.addItemToList = this.addItemToList.bind(this);
        this.removeItemFromList = this.removeItemFromList.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.renderListRow = this.renderListRow.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.listInput = React.createRef();
    }

    getValues() {
        return this.state.currentList.map((item) => { return item.value; });
    }

    addItemToList(value) {
        this.setState((prevState) => {
            const selectedOption = this.props.listOptions.find((option) => { return option[this.props.listIdKey] === Number(value); });
            const newItem = {
                id: prevState.currentId,
                value,
                label: selectedOption === null ? null : selectedOption[this.props.listDescriptionKey]
            };
            const newList = [
                ...prevState.currentList
            ];
            newList.push(newItem);
            return {
                currentList: newList,
                currentId: prevState.currentId + 1
            };
        });
        this.props.onListChanged();
    }

    removeItemFromList(id) {
        console.log('Removing id: ', id);
        this.setState((prevState) => {
            const newList = [
                ...prevState.currentList
            ];
            const removalIndex = newList.findIndex((item) => { return item.id === id; });
            console.log('Removal Index: ', removalIndex);
            newList.splice(removalIndex, 1);
            return {
                currentList: newList
            };
        });
        this.props.onListChanged();
    }

    inputChanged() {
        if (this.listInput.current.isEmpty()) {
            this.setState({
                canAdd: false
            });
        }
        else {
            this.setState({
                canAdd: true
            });
        }
    }

    renderListRow(item) {
        return (
            <div className="list-input-row">
                <h6>{item.label}</h6>
                <div
                    className="remove-list-input-row"
                    onClick={() => { this.removeItemFromList(item.id); }}
                >
                    <h2>&times;</h2>
                </div>
            </div>
        );
    }

    renderList() {
        if (this.state.currentList.length === 0) {
            return <h4 className="none-message">None</h4>;
        }

        return this.state.currentList.map((item) => { return this.renderListRow(item); });
    }

    renderInput() {
        if (this.props.listOptions === null) {
            return (
                <TextInput
                    ref={this.listInput}
                    label={this.props.inputLabel}
                    onValueChanged={this.inputChanged}
                />
            );
        }

        return (
            <DropdownInput
                ref={this.listInput}
                options={this.props.listOptions}
                valueKey={this.props.listIdKey}
                labelKey={this.props.listDescriptionKey}
                label={this.props.inputLabel}
                onValueChanged={this.inputChanged}
            />
        );
    }

    render() {
        return (
            <div className="list-input">
                <h3>{this.props.listLabel}</h3>
                {this.renderList()}
                {this.renderInput()}
                <Button
                    label="Add"
                    onClickHandler={() => { this.addItemToList(this.listInput.current.getValue()); }}
                    disabled={!this.state.canAdd}
                />
            </div>
        );
    }
}

ListInput.propTypes = {
    listLabel: PropTypes.string,
    inputLabel: PropTypes.string,
    listOptions: PropTypes.arrayOf(PropTypes.object),
    listIdKey: PropTypes.string,
    listDescriptionKey: PropTypes.string,
    onListChanged: PropTypes.func
};

ListInput.defaultProps = {
    listLabel: '',
    inputLabel: '',
    listOptions: null,
    listIdKey: '',
    listDescriptionKey: '',
    onListChanged: () => {}
};

export default ListInput;
