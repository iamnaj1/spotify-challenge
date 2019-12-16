import React from 'react'; 
import './page1.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { 
  Link, 
} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import _ from 'lodash'

const spotifyApi = new SpotifyWebApi();

class Page1 extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();  
    const token = params.access_token; 
    if (token) {
      spotifyApi.setAccessToken(token);
    } 
    this.state = { 
        playlist: null,
        token, 
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getUser(){ 
    spotifyApi.getMe()
    .then((user) => { 
        console.log("this.state.user: ", user)
        spotifyApi.getFeaturedPlaylists(user.country)
        .then((response) =>{
            this.setState({
                playlist: response.playlists
            })
            console.log("this.state.response.playlists: ", response.playlists)
        })
    })   
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }  
  componentDidMount(){ 
      this.getUser() 
  } 
render() {
     
    return (
    <div className="App"> 
      <div>
        <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
      </div>
      { this.state.loggedIn?
      
        <div className="home-wrapper">
            { (this.state.playlist && !_.isEmpty(this.state.playlist.items)) ?
            <div className="playlist-wrapper">
                <h1>User's Country Recommendation</h1>
                <h3>{this.state.playlist.total} Total Playlist based on your Country</h3>
                    <div className="playlist-container">
                    {
                        _.map(this.state.playlist.items, (playlist, index) => {
                            return (
                                <Link to={{ pathname: '/Page2', state: { id: playlist.id} }} key={playlist.name+index} >
                                    <Card className="playlist-item" >
                                        <Card.Img variant="top" src={playlist.images[0].url} />
                                        <Card.Body>
                                            <Card.Title>{playlist.name}</Card.Title>
                                            <Card.Text style={{  fontSize: '12px' }}>
                                                {playlist.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            )
                        })
                    }
                    </div>
                   
            </div>
                :
            <h1>No Playlist Recommendation</h1>
            }
        </div>
        :
        <div>
            <a href='http://localhost:8888'> <h1>Go to Spotify </h1></a> 
        </div>
      }
    </div>
  );
}
}
export default Page1;
