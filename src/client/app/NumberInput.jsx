import React from 'react'

class NumberInput extends React.Component {
    onChangeHandler (event) {
        this.props.getter(event.target.value || null);
    }

    render(){
        return <input onChange={this.onChangeHandler.bind(this)} type="number" id="replyNumber" min="18" max="45" />
    }
}

export default NumberInput;
