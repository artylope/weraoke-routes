import React from 'react';


class Session_Song extends React.Component {

    render() {
        const ssongs = this.props.session_song.map((item, index) => {
            return (
                    <p key={index}>
                    {item.song_name} {item.artist_name}
                    </p>
                )
        })
    return (
      <div>
        {this.props.session_song[0].session_name}
        {ssongs}
      </div>
    );
  }
}

export default Session_Song;