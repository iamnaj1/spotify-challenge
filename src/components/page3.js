import React from 'react'; 
import SpotifyWebApi from 'spotify-web-api-js'; 
import './page3.css';
import _ from 'lodash'
const spotifyApi = new SpotifyWebApi(); 
class Page3 extends React.Component { 
    constructor(props){
      super(); 
      const {id} = props.location.state
        this.state= {
            id
        }
        console.log("soundtrack id: ", id)
    }
    getSoundTrack(){ 
        spotifyApi.getTrack(this.state.id)
        .then((res) => { 
            this.setState({
                track:res
            })
            console.log("this.state.tracks: ", this.state.track) 
        })   
    }
    componentDidMount(){ 
        this.getSoundTrack() 
    } 
    render() {
        return (
          <div className="App">
              {
                  this.state.track? 
                    <div className="track-wrapper"> 
                        <img src={this.state.track.album.images[0].url} style={{ height: 150 }}/>
                        <h4>
                            Now Playing:
                        </h4>
                        <h2>{ this.state.track.name }  </h2>
                        <p style={{display: 'inline-flex'}}> 
                            <h3>{this.state.track.album.name}</h3>
                            <h3>-{this.state.track.artists[0].name}</h3>
                        </p>
                    </div>
                  :
                  <h1>Loading Track</h1>
              } 
          </div>
        );
      }
}

export default Page3;
