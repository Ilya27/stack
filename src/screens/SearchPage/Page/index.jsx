import React, { Component } from 'react';
import placeholder from '../../../assets/img/placeholder.jpg';
import { Link } from "react-router-dom";
import{OurProgressRing} from '../../../components/index';
import moment from'moment' ;
class SearchPage extends Component{
    state={
        search_info:''
    }

    checkImg(link){
      if(link){
        return <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${link}`} alt='poster'></img>
      }else{
        return <img  src={placeholder} alt='poster'></img>
      }
    }

    movieOrshow(value){
      if(value==="tv"){
        return 'show'
      }else{
        return 'movie'
      }
    }

    cut(value){
      var size = 214;
      if(value.length > size){
      return value.slice(0, size) + ' ...';}
      else{
        return value
      }
    }

    normalDate(date){
      if(date){
          var format='LL';
          var result= moment(date).format(format) 
          return result
      }else{
        return <>&mdash;</>
      }
  }

  // printRing(value){
  //   if
  //   retunr <div className='container_circle'>
  //                 <OurProgressRing progress={item.vote_average}/>
  //             </div>
  // }

    render(){
        const {search_info}=this.props;
        if(search_info.results===undefined){
          return <div></div>
        }
        let root = this.props.match.url;
        let name_result="Movie";
        let typeSearch=root.split('/');
        if(typeSearch[2]==='show'){
          typeSearch[2]='tv';
          name_result="TV Show"
        }
        console.log(typeSearch[2]);
        
        const result = search_info.results.filter(word => word.media_type === typeSearch[2]);
        console.log(result);
        
       return(
       <div className='search_page__search_info'>
       <h2>Search <b>></b> {name_result} Results</h2>
       {result.map(item=>(
          <div className='search_info__block' >
            <div className='search_info__logo '>
              <Link to={`/${this.movieOrshow(item.media_type)}/${item.id}`}>
                  {this.checkImg(item.poster_path)}
                </Link>
              </div>
            <div className='search_info__text'>
            {/* {this.printRing(item.vote_average)}
            <div className='container_circle'>
                  <OurProgressRing progress={item.vote_average}/>
              </div> */}
              <Link to={`/${this.movieOrshow(item.media_type)}/${item.id}`}>
                <h3>{item.title||item.name}</h3><br></br>
              </Link>
              <p className='release_date'>{this.normalDate(item.release_date||item.first_air_date)}</p>
              <p className='overview'>{this.cut(item.overview)}</p>
              {/* <p>{item.overview}</p> */}
            </div>
          </div>
          )
        )
      }       
       </div>)
    }
}

export default SearchPage;