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
            jokes:JSON.parse(window.localStorage.getItem("jokes"))||[],
            isloading:false,
        }
        this.seenjokes= new Set(this.state.jokes.map(
            j =>(
                j.joke
            )
        ));
        this.handleVote=this.handleVote.bind(this);
        this.handleClick=this.handleClick.bind(this);
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
            ),() =>
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
        
    }
    componentWillUnmount(){
        
    }
    handleClick(){
        this.setState({isloading:true},this.getJoke)        ;
    }
    async componentDidMount(){
      if (this.state.jokes.length ===0) this.getJoke();
        
    }
    async getJoke(){
        try
        {
        let jokes=[];
        while(jokes.length<this.props.numJokestoGet){
            let res= await axios.get(API_URL,{headers:{Accept : "application/json"}});
            if(!this.seenjokes.has(res.data.joke))
            jokes.push({id:uuid(),joke:res.data.joke,votes:0});
            
        }
        this.setState(st=>(
           { isloading:false,
               jokes: [...st.jokes,...jokes]
           } 
        ),()=>(
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        
        ));
        } catch(e){
            alert(e);
            this.setState({isloading:false});
        }
        
    }
    render(){
        var jokes=this.state.jokes.sort((a,b)=>(b.votes -a.votes)).map(j=>(
            <Joke 
            upvote={()=>this.handleVote(j.id,1)} 
            downvote={()=>(this.handleVote(j.id,-1))}
             key={j.id}joke={j.joke}
             vote={j.votes}></Joke>
    
        ))

        if(this.state.isloading){
            return            <div className="JokeList-spinner">
                <i className="far fa-8x fa-laugh fa-spin"></i>
                <h1 className="joke-list-title"> loading ... </h1>
            </div>
        }

        return <div className="Joke-List">
            <div className="joke-list-sideBar">
            <h1 className="joke-list-title">
                <span>Dad</span> Jokes
            </h1>
            <img className="laugh"src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="Laughthing Emoji"/>
            <button className="JokeList-getmore" onClick={this.handleClick}>New Jokes</button>
            </div>
            
            <div className="JokeList-jokes">
            {jokes}
            </div>
            
        </div>
    }
}

export default JokeList;