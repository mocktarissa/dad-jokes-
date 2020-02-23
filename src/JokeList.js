import React from 'react'
import axios from 'axios';
import Joke from './Joke';
import './jokelist.css';
import uuid from 'uuid/v4'
var API_URL="https://icanhazdadjoke.com/";
class JokeList extends React.Component{
    static defaultProps={
        numJokestoGet:10
    };
    constructor(props){
        super(props);
        this.state={
            jokes:[]
        }
        this.handleVote=this.handleVote.bind(this);
    }
    handleVote(id,delta){
        this.setState(
            st=>(
                {
                    jokes:st.jokes.map(
                        j=>
                            j.id ===id ? {
                                ...j,votes: j.votes+delta
                            } : j
                        
                    )
                }
            )
        );
    }
    async componentDidMount(){
         let jokes=[];
        while(jokes.length<this.props.numJokestoGet){
            let res= await axios.get(API_URL,{headers:{Accept : "application/json"}});
            jokes.push({id:uuid(),joke:res.data.joke,votes:0});
            
        }
        this.setState({jokes:jokes})
        
    }
    render(){
        var jokes=this.state.jokes.map(j=>(
            <Joke 
            upvote={()=>this.handleVote(j.id,1)} 
            downvote={()=>(this.handleVote(j.id,-1))}
             key={j.id}joke={j.joke}
             vote={j.votes}></Joke>
    
        ))
        return <div className="Joke-List">
            <div className="joke-list-sideBar">
            <h1 className="joke-list-title">
                <span>Dad</span> Jokes
            </h1>
            <img className="laugh"src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="Laughthing Emoji"/>
            <button className="JokeList-getmore">New Jokes</button>
            </div>
            
            <div className="JokeList-jokes">
            {jokes}
            </div>
            
        </div>
    }
}

export default JokeList;