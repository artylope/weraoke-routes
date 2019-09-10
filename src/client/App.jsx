import React from 'react';
import { hot } from 'react-hot-loader';
import YouTube from 'react-youtube';


//components
// import Nav from './components/nav';
// import Playlist from './components/playlist';
// import Player from './components/player';
import Search from './components/search';
import SearchPanelButton from './components/searchPanelButton';
import Playlist from './components/playlist';
import PlaylistButton from './components/playlistButton';
import Song from './components/song';
import Session_Song from './components/session_song';
import Lyrics from './components/lyrics';
// import Form from './components/form';


class App extends React.Component {
  constructor() {
    super();
    this.state = {

      sessionId : 4,

      //data stuff
      preloadSong: {
        "name": "Just The Way You Are",
        "artist": "Bruno Mars",
        "video_link": "LjhCEhWiKXk",
        "duration": "PT3S",
        "order": 1,
        "status": "watched"
      },
      sessionSongs: [],
      allSongs: [],

      //UI stuff
      playlist: true,
      searchPanel: true,
      playlistEditMode: false,

      //current song info
      nowPlaying: 0,
      isPlaying: true,
    };


    this.handlePlaylistShowHide = this.handlePlaylistShowHide.bind(this);
    this.handlePlaylistItemClick = this.handlePlaylistItemClick.bind(this);
    this.handlePlaylistItemDelete = this.handlePlaylistItemDelete.bind(this);
    this.handleSearchPanelShowHide = this.handleSearchPanelShowHide.bind(this);
    this.handleAddSongToPlaylist = this.handleAddSongToPlaylist.bind(this);
  }

  handlePlaylistShowHide(state){
    console.log('clicked');
    console.log(state);
    if(state === true){
      this.setState({
        playlist: false
      })
    } else if(state === false){
      this.setState({
        playlist: true
      })
    }
  }

  handlePlaylistItemClick(index){

    let selectedSong = parseInt(index);
    this.setState({
      nowPlaying: selectedSong,
      // playlist: false
    })

  }

  handlePlaylistItemDelete(songId, sessionSongId){
    console.log('delete song from playlist ', songId);
    console.log('currentSong' + this.state.nowPlaying);
    console.log('sessionSongId' + sessionSongId);

    let deleteSongURL = 'http://localhost:3000/api/sessions/' + this.state.sessionId + '/delete';
    fetch(deleteSongURL , {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        session_id: this.state.sessionId,
        song_id: songId
      })
    })
    .then( (response) => {
       //do something awesome that makes the world a better place

       console.log('done');
       console.log('response', response);

       console.log('reload data');

       // let sessionSongs = this.state.sessionSongs;
       // sessionSongs.splice(sessionSongId, 1);
       // console.log(sessionSongs);

       this.loadData();
    });

  }

  handleSearchPanelShowHide(state){
    console.log('clicked');
    console.log(state);
    if(state === true){
      this.setState({
        searchPanel: false
      })
    } else if(state === false){
      this.setState({
        searchPanel: true
      })
    }
  }

  handleAddSongToPlaylist(songId){
    console.log('add song ', songId);
    let addSongURL = 'http://localhost:3000/api/sessions/' + this.state.sessionId + '/new';
    console.log(addSongURL);


    fetch(addSongURL, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        session_id: this.state.sessionId,
        song_id: songId
      })
    })
    .then( (response) => {
       //do something awesome that makes the world a better place
       console.log('done');
       console.log('response', response);
       this.loadData();
    });
  }


  loadData(){
    //multiple fetch API
    let allSongsUrl = 'http://localhost:3000/api/songs';
    // let allArtistsUrl = 'http://localhost:3000/artists';
    let thisSessionSongsUrl = 'http://localhost:3000/api/sessions/' + this.state.sessionId;


    Promise.all([
            fetch(allSongsUrl).then(allSongs => allSongs.json()),
            fetch(thisSessionSongsUrl).then(allSessionSongs => allSessionSongs.json())
            ])
            .then((result) => {
               console.log("multiple fetch");
               console.log(result[0].songs);
               console.log(result[1].sessions_songs);
               //
               this.setState({
                 allSongs : result[0].songs,
                 sessionSongs : result[1].sessions_songs
               });

            })
            .catch((err) => {
                console.log(err);
            });
  }


  componentDidMount(){

    console.log('component did mount');
    this.loadData();

    }

  render(){

    let sessionSongs = this.state.sessionSongs;

    let currentSong;
    if (sessionSongs.length <= 0){
      currentSong = this.state.preloadSong;
    } else if (sessionSongs.length > 0) {
      currentSong = this.state.sessionSongs[this.state.nowPlaying];
    }

    //1280 x 780
    //960 x 585
    const opts = {
      height: '780',
      width: '1280',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        controls: 0,
        modestbranding: 1
      }
    };

    return(
      <div>
        <h1 className="logo">Weraoke</h1>

        <div className="video-panel">
          <YouTube
          videoId={currentSong.video_link}
          opts={opts}
          onReady={this._onReady}
          onPlay={
            console.log('nowPlaying' , this.state.nowPlaying)
          }
          onEnd={()=>{
            if( this.state.nowPlaying === (this.state.sessionSongs.length - 1)){
              this.setState({
                nowPlaying: 0,
              })
            } else {
              this.setState({
                nowPlaying: (this.state.nowPlaying) + 1,
              });
            }
          }}
          />
        </div>

        <PlaylistButton
            playlist={this.state.playlist}
            handlePlaylistShowHide= {this.handlePlaylistShowHide} />
        <Playlist
            isPlaying = {this.state.isPlaying}
            nowPlaying={this.state.nowPlaying}
            sessionSongs={this.state.sessionSongs}
            playlist={this.state.playlist}
            handlePlaylistShowHide= {this.handlePlaylistShowHide}
            handlePlaylistItemClick= {this.handlePlaylistItemClick}
            handlePlaylistItemDelete= {this.handlePlaylistItemDelete}/>
        <SearchPanelButton
            handleSearchPanelShowHide= {this.handleSearchPanelShowHide}
            searchPanel={this.state.searchPanel} />
        <Search
            sessionSongs= {this.state.sessionSongs}
            handleSearchPanelShowHide = {this.handleSearchPanelShowHide}
            searchPanel={this.state.searchPanel} allSongs = {this.state.allSongs}
            handleAddSongToPlaylist = {this.handleAddSongToPlaylist}/>
      </div>
    )
  }

}

export default hot(module)(App);
