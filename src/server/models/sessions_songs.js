module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

    let getAll = (callback) => {

         const queryString = "select sessions.id, songs.song_name, songs.video_link, songs.lyrics, artists.artist_name, sessions.session_name from sessions_songs inner join songs on (sessions_songs.song_id = songs.id) inner join artists on (artists.id = songs.artist_id) inner join sessions on (sessions_songs.session_id = sessions.id) order by sessions.id";

        dbPoolInstance.query(queryString, (error, queryResult) => {
            if (error) {
                // invoke callback function with results after query has executed
                callback(error, null);
            } else {
                // invoke callback function with results after query has executed

                callback(null, queryResult.rows );
            }
        });
    };

    let getById = (id, callback) => {

        let arr = [id];

        const queryString = "select sessions_songs.id, songs.song_name, songs.video_link, songs.lyrics, artists.artist_name, sessions.session_name from sessions_songs inner join songs on (sessions_songs.song_id = songs.id) inner join artists on (artists.id = songs.artist_id) inner join sessions on (sessions_songs.session_id = sessions.id) where sessions.id=($1) order by sessions_songs.id";

        dbPoolInstance.query(queryString, arr, (error, queryResult) => {
            if (error) {
                // invoke callback function with results after query has executed
                callback(error, null);
            } else {
                // invoke callback function with results after query has executed

            callback(null, queryResult.rows );
            }
        });
    };

    // let createNew = (id, callback) => {

    //     let arr = [id];

    //     const queryString = "insert into sessions (session_name) values sessions_songs (session) songs.song_name, songs.video_link, songs.lyrics, artists.artist_name, sessions.session_name from sessions_songs inner join songs on (sessions_songs.song_id = songs.id) inner join artists on (artists.id = songs.artist_id) inner join sessions on (sessions_songs.session_id = sessions.id) where sessions.id=($1)";

    //     dbPoolInstance.query(queryString, arr, (error, queryResult) => {
    //         if (error) {
    //             // invoke callback function with results after query has executed
    //             callback(error, null);
    //         } else {
    //             // invoke callback function with results after query has executed

    //         callback(null, queryResult.rows );
    //         }
    //     });
    // };

    let addSongsToPlaylist = (data, callback) => {

        console.log('in model');
        //data is request.body in controller
        console.log('data', data)
        // let session_id = (request.params.id);
        let songId = (data.song_id);
        let sessionId = (data.session_id);

        console.log(songId);
        console.log(sessionId);

        const queryString = "insert into sessions_songs (session_id, song_id) values ($1, $2)";
        const values = [sessionId, songId ]

        dbPoolInstance.query(queryString, values, (error, queryResult) => {
            if (error) {
                // invoke callback function with results after query has executed
                callback(error, null);
            } else {
                // invoke callback function with results after query has executed

            callback(null, queryResult.rows );
            }
        });
    };

    let removeSongsFromPlaylist  = (data, callback) => {

        console.log('in removeSongsFromPlaylist inb model', data);

        let songId = data.song_id;
        console.log('id to delete is ', songId)

        const queryString = "delete from sessions_songs where id="+ songId;

        dbPoolInstance.query(queryString, (error, queryResult) => {
            if (error) {
                // invoke callback function with results after query has executed
                callback(error, null);
            } else {
                // invoke callback function with results after query has executed

            callback(null, queryResult.rows );
            }
        });
    };

    return {
        getAll,
        getById,
        //createNew,
        addSongsToPlaylist,
        removeSongsFromPlaylist,
    };
};
