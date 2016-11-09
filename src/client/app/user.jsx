import React from 'react';
import classNames from 'classnames';
import TextInput from './TextInput.jsx';
import SelectOption from './SelectOption.jsx';
import NumberInput from './NumberInput.jsx';


class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = { editMode: false };
        // this.handleSave = () => {
        //     const user = {
        //         id: this.props.id,
        //         name: this.state.name,
        //         gender: this.state.gender,
        //         age: this.state.age
        //     };
        // }
    }

    getName(value) {
        this.setState({
            name: value
        });
    }

    getGender(value) {
        this.setState({
            gender: value
        })
    }

    getAge(number) {
        this.setState({
            age: number
        })
    }

    handleEdit() {
        this.setState({
            editMode: !this.state.editMode
        });
        /* !! ? */
        if(this.state.editMode){
            this.props.handleSave({
                id: this.props.id,
                name: this.state.name,
                gender: this.state.gender,
                age: this.state.age
            })
        }
    }


    render() {
        let editMode = this.state.editMode;
        var editBtnClass = classNames({
            'btn-edit': !editMode,
            'btn-save': editMode
        });

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{editMode ? <TextInput getter={this.getName.bind(this)} placeholder={this.props.name} className="form-control" /> : this.props.name}</td>
                <td>{editMode ? <SelectOption getter={this.getGender.bind(this)} value={this.state.gender} className="form-control" /> : this.props.gender}</td>
                <td>{editMode ? <NumberInput getter={this.getAge.bind(this)} value={this.state.age} className="form-control" /> : this.props.age}</td>
                <td><button className={editBtnClass} onClick={this.handleEdit.bind(this)}></button></td>
                <td><button className="btn-delete" onClick={this.props.handleClick}></button></td>
            </tr>
        )
    }
}

export default User;