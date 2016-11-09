import React from 'react';

class SelectOption extends React.Component {
    onChangeHandler (event) {
        event.target.value !== "Gender" ? this.props.getter(event.target.value) : this.props.getter(null);
    }

    render() {
        return <select className="form-control" onChange={this.onChangeHandler.bind(this)}>
                    <option data-hidden="true">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
    }
}

export default SelectOption;

