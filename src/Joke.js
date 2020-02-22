import React from 'react'
import './joke.css'
class Joke extends React.Component{
    render(){
        return <div className="joke">
            <div className="Joke-buttons">
            <div className='fa-arrow-up
  '> U</div>
            <span className="Joke-votes">{this.props.vote}</span>
            <div className='fa-arrow-down'> D</div>
            </div>
            <div className="Joke-text">
            {this.props.joke}
            </div>
             <div className="Joke-buttons"></div>
        </div>
    }
}

export default Joke;