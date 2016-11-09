console.log('Hello World!');
import React from 'react';
import {render} from 'react-dom';
import MainTable from './MainTable.jsx';

class App extends React.Component {
    render () {
        return (
            <div>
                <MainTable />
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));