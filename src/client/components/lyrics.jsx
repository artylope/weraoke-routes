import React from 'react';


class Lyrics extends React.Component {

    render() {
        const songlyrics = this.props.session_song.map((item, index) => {
            return (
                <p key={index}>{item.lyrics}
                </p>

                )
        })
    return (
      <div>
        {songlyrics}
      </div>
    );
  }
}

export default Lyrics;