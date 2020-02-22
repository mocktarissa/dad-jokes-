import React from 'react';

import './App.css';
import JokeList from './JokeList';

//var API_URL="https://icanhazdadjoke.com/";
class  App extends React.Component {
 render() {return (
    <div className="App">
    <JokeList/>
    </div>
  );}
}

export default App;
