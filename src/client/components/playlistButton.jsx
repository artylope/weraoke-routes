import React from 'react';
import PropTypes from 'prop-types';


class PlaylistButton extends React.Component{

  render(){

    let playlistButtonClasses = "";

    if(this.props.playlist === true){
      playlistButtonClasses = "playlist-button hide"
    } else if (this.props.playlist === false){
      playlistButtonClasses = "playlist-button show"
    }

    return(
      <div className="playlist-button-wrapper">
        <div className={playlistButtonClasses} onClick={()=>this.props.handlePlaylistShowHide(this.props.playlist)}>
          <i className='bx bxs-playlist' ></i>
        </div>
      </div>
    )
  }


}
export default PlaylistButton
