import React, { Component } from 'react';
class InfoAboutPerson extends Component {
    state={
        value:[],
    }
    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/person/${this.props.url}?api_key=dcf025b227cc290e6845162a216870ff&language=en-US`)
    .then(data=>data.json())
    .then(data=>this.setState({ value: data }))

}

    render() {
        const {value}=this.state;
        return (
            <div>
                <h1>{value.name}</h1>
                <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${value.profile_path}`} alt ='Poster'></img>
                <p>{value.biography}</p>
            </div>
        );
    }
}

export  default  InfoAboutPerson