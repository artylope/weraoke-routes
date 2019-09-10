import React from 'react';
import PropTypes from 'prop-types';

class Song extends React.Component {

    render() {
        const songs = this.props.songs.map((item, index) => {
            return (
                <p key={index}>{item.song_name}<br/>
                {item.lyrics}
                </p>

                )
        })
    return (
      <div>
        {songs}
      </div>
    );
  }
}

export default Song;
