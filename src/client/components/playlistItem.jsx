import React from 'react';
import PropTypes from 'prop-types';



class PlaylistItem extends React.Component{

  render() {

    let playlistItemClasses = "playlist-item";

    if (this.props.index === this.props.nowPlaying){
      playlistItemClasses = "playlist-item active"
    }else if(this.props.index < this.props.nowPlaying){
      playlistItemClasses = "playlist-item completed"
    }else if(this.props.index > this.props.nowPlaying){
      playlistItemClasses = "playlist-item"
    }

    // let duration = this.props.song.duration;
    // should call the youtube api to get the duration
    //for now like that, dummy data.
    let duration = "PT2M34S";

    duration = duration.replace('PT','')
    duration = duration.replace(/([^0-9])+/g, ",");
    let durationArray = duration.split(',');

    let songDurH, songDurM, songDurS, songDurDisplay, videoDurationInSecs;

    if( durationArray.length === 4){
      songDurH = parseInt(durationArray[0]);
      songDurM = parseInt(durationArray[1]);
      songDurS = parseInt(durationArray[2]);
      videoDurationInSecs = ((songDurH*60) + songDurM)*60 + songDurS;
      songDurDisplay = `${songDurH.toString()}:${songDurM.toString().padStart(2, '0')}:${songDurS.toString().padStart(2, '0')}`;
    } else if( durationArray.length === 3){
      songDurM = parseInt(durationArray[0]);
      songDurS = parseInt(durationArray[1]);
      songDurDisplay = `${songDurM.toString()}:${songDurS.toString().padStart(2, '0')}`;
      videoDurationInSecs = (songDurM*60) + songDurS;
    } else if(durationArray.length === 2){
      songDurS = parseInt(durationArray[0]);
      videoDurationInSecs = songDurS;
      songDurDisplay = `0:${songDurS.toString().padStart(2, '0')}`;
    }

    // console.log(songDurH);
    // console.log(songDurM);
    // console.log(songDurS);
    // console.log(songDurDisplay);
    // console.log('videoDurationInSecs ', videoDurationInSecs)

     return (
        <div className={playlistItemClasses} onClick={()=>{this.props.handlePlaylistItemClick(this.props.index)}}>
            <div className="playlist-item-order">{(this.props.index) + 1 }</div>
            <div className="playlist-item-content">
                <div className="song-info"><p>{this.props.song.song_name}</p> <p>{songDurDisplay}</p></div>
                <div className="song-info-2"><p>{this.props.song.artist_name}</p><i onClick={() => {
                  console.log(this.props.song.id)
                  this.props.handlePlaylistItemDelete(this.props.song.id, this.props.index);
                }}class='bx bx-trash-alt'></i></div>
            </div>
        </div>

    );

 }
}


export default PlaylistItem
