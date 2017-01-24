import React from 'react';

class TextInput extends React.Component {

    onChangeHandler (event) {
        !!event.target.value.replace(/\s/g, '').length ? this.props.getter(event.target.value) : this.props.getter(null);

    }

    render () {
        return <input placeholder={this.props.placeholder} onChange={this.onChangeHandler.bind(this)} type="text" value={this.props.value} className="form-control" />;
    }
}

export default TextInput;