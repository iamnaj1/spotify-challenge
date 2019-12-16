import React from 'react'; 
import SpotifyWebApi from 'spotify-web-api-js';
import Table from 'react-bootstrap/Table'
import './page2.css';
import _ from 'lodash'
import { 
  Link, Redirect
} from 'react-router-dom'; 

const spotifyApi = new SpotifyWebApi();
class Page2 extends React.Component { 
    constructor(props){
      super(); 
      const {id} = props.location.state
        this.state= {
            id
        }
        console.log("id: ", id)
    }
    getPlaylist(){ 
        spotifyApi.getPlaylist(this.state.id)
        .then((res) => { 
            this.setState({
                playlist:res
            })
            console.log("this.state.tracks: ", this.state.playlist) 
        })   
    }
    componentDidMount(){ 
        this.getPlaylist() 
    } 
    soundtrackClick (e){ 
        this.setState({redirect: true, soundtrackID: e});
      }
    render(){  
        if (this.state.redirect) {
            console.log(this.state.soundtrackID)
            return <Redirect to={{ pathname: '/Page3', state: { id: this.state.soundtrackID } }} />
        }
        return (
            <div className="page-2"> 
            
                {
                    this.state.playlist && this.state.playlist.tracks.items?
                    <div>
                        <h1>{this.state.playlist.name}</h1> 
                        <h4>{this.state.playlist.tracks.total} Songs</h4>
                        <Table hover variant="dark" responsive className="playlist-table">  
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Artist</th>
                                    <th>Popularity</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {
                                    _.map(this.state.playlist.tracks.items, (song, index) => {
                                        return ( 
                                                <tr onClick={this.soundtrackClick.bind(this,song.track.id)} key={song.track.name+index}>
                                                    <td><img src={song.track.album.images[0].url} alt=""/></td>
                                                    <td>{song.track.name}</td>
                                                    <td>{song.track.artists[0].name}</td> 
                                                    <td>{song.track.popularity}</td> 
                                                </tr> 
                                        )
                                    })
                                } 
                            </tbody>
                        </Table>
                    </div>
                    :
                    <h1>Loading Playlist</h1>
                }
            </div>
          );
    }
}

export default Page2;
