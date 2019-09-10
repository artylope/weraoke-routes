import React from 'react';
import PropTypes from 'prop-types';

import PlaylistItem from './playlistItem';



class Playlist extends React.Component{

  render() {

     let playlistClasses = "";

     if(this.props.playlist === true){
       playlistClasses = "playlist-section show"
     } else if (this.props.playlist === false){
       playlistClasses = "playlist-section hide"
     }

     let playlistItems = this.props.sessionSongs.map((song, index) => {
       return(
         <PlaylistItem
             key={index}
             index={index}
             song={song}
             nowPlaying={this.props.nowPlaying}
             handlePlaylistItemClick = {this.props.handlePlaylistItemClick}
             handlePlaylistItemDelete = {this.props.handlePlaylistItemDelete}
          />
       );
     })

     return (
       <div className={playlistClasses}>
          <div className="playlist">
              <div className="playlist-title">
                  <h1>Playlist</h1>
                  <div
                    className="playlist-hide"
                    onClick={()=>{this.props.handlePlaylistShowHide(this.props.playlist)}}
                    handlePlaylistItemDelete= {this.props.handlePlaylistItemDelete}>
                    <i className='bx bx-x-circle' ></i>
                  </div>
              </div>


              <div className="playlist-list">
                    {playlistItems}
              </div>
          </div>
          <div className="playlist-control-wrapper">
              <div className="playlist-control">
                <div className="prev-song"><i className='bx bx-shuffle' ></i></div>
                <div className="prev-song"><i className='bx bx-skip-previous' ></i></div>
                <div className="play-pause"><i className='bx bx-play'></i></div>
                <div className="next-song"><i className='bx bx-skip-next' ></i></div>
                <div className="prev-song"><i className='bx bxs-share-alt' ></i></div>

              </div>

          </div>
        </div>

    );

 }
}


export default Playlist
