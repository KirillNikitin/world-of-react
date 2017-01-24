import React from 'react';
import TextInput from './TextInput.jsx';
import SelectOption from './SelectOption.jsx';
import NumberInput from './NumberInput.jsx';

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', gender: '', age: null};
        this.handleClick = () => {
            const user = {
                name: this.state.name,
                gender: this.state.gender,
                age: this.state.age
            };
            var d = new Date();
            user.id = d.getTime().toString(16);
            props.handler(user);
        };
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

    render(){
        var classNames = require('classnames');
        var isDisabled = !this.state.name || !this.state.gender || !this.state.age;
        var btnClass = classNames({
            'btn-add': true,
            'btn-default': true,
            'disabled': isDisabled
        });
        var formControlClass = classNames({'form-control': true})
        return (
            <div className="new-user">
                <div className="row">
                    <div className="col-md-5">
                        <div className="new-user__name">
                            <TextInput getter={this.getName.bind(this)} value={this.state.name} className={formControlClass} />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="new-user__gender">
                            <SelectOption getter={this.getGender.bind(this)} value={this.state.gender} className={formControlClass} />
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="new-user__age">
                            <NumberInput getter={this.getAge.bind(this)} value={this.state.age} className={formControlClass} />
                        </div>
                    </div>
                    <div className="col-md-1">
                        <button onClick={this.handleClick} disabled={isDisabled} className={btnClass}>Add user</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewUser;