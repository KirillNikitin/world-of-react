import React from 'react';
import User from './user.jsx';
import NewUser from './NewUser.jsx';

class MainTable extends React.Component {
    constructor(props) {
        super(props);
        this.sorted = { age: true, name: true };
        this.state = { users: this.generateUsers() };
        this.handleClick = function (user) {
            let users = this.state.users;
            users.unshift(user);
            this.setState({ users: users })
        }.bind(this);
        this.handleSave = function (user){
            let users = this.state.users;
            users[this.updateUser(user.id)] = user;
            this.setState({ users: users });
        }

    }
    generateUsers() {
        var N = 100;
        var maleNames = ['John', 'Paul', 'Chris', 'Gordon', 'James'];
        var femaleNames = ['Sidney', 'Ann', 'Johanna', 'Susan', 'Teresa'];
        var names = [maleNames, femaleNames];
        var arr = [];

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function setId() {
            var d = new Date();
            return getRandomInt(0, d.getTime()).toString(16);
        }

        for(var i=0; i<N; i++){
            var arrNames = names[getRandomInt(0,1)];
            arr.push({
                id: setId(),
                name: arrNames[getRandomInt(0,arrNames.length - 1)],
                gender: arrNames == maleNames ? 'Male' : 'Female',
                age: getRandomInt(18, 45)
            })
        }
        return arr;
    }

    sort(type) {
        const { users } = this.state;
        // получаем порядок сортировки
        const isSorted = this.sorted[type];
        // устанавливаем направление
        let direction = isSorted ? 1 : -1;

        // создаём новый массив из данных, чтобы не перезаписывать
        // состояние и сортируем его
        const sorted = [].slice.call(users).sort((a, b) => {
            // чтобы сортировка всегда была одинаковой учтём все условия
            // функция может вернуть 0, 1 или -1, в зависимости от возвращаемого
            // значения метод массивов sort сделает свой выбор
            if (a[type] === b[type]) { return 0; }
            return a[type] > b[type] ? direction : direction * -1;
        });

        this.sorted[type] = !isSorted;

        this.setState({ users: sorted });
    }

    getUserArrayInd (objectId) {
        var ind = -1;
        var arr = this.state.users;
        for(var i=0; i<arr.length; i++){
            if(arr[i].id === objectId){
                ind = i;
                break;
            }
        }
        return ind;
    }

    deleteUserFromUsers (arrayIndex) {
        var confirmed = confirm("Are you sure?");
        return confirmed && !!this.state.users.splice(arrayIndex, 1).length;
    }

    deleteUser(id) {
        let userArrayInd = this.getUserArrayInd(id);
        if (userArrayInd !== -1 && this.deleteUserFromUsers(userArrayInd)) {
            this.setState({
                msg: `User id: ${id} has been deleted!`
            })
        }
    }

    updateUserInUsers (arrayIndex) {
        return this.state.users[arrayIndex];
    }

    updateUser(id) {
        return this.getUserArrayInd(id);
    }

    render(){
        const users = this.state.users.map((i) => <User handleSave={this.handleSave.bind(this)} handleClick={this.deleteUser.bind(this, i.id)} key={i.id} {...i} />);
        return(
            <div>
                {this.state.msg ?
                    <h2>{this.state.msg}</h2>
                    : null
                }
                <NewUser handler={this.handleClick} />
                <table className="user-list table table-striped">
                    <thead>
                        <tr>
                            <th onClick={() => this.sort('id')}>ID</th>
                            <th onClick={() => this.sort('name')}>Name</th>
                            <th onClick={() => this.sort('gender')}>Gender</th>
                            <th onClick={() => this.sort('age')} colSpan="3">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MainTable;