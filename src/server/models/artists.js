module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

    let getAll = (callback) => {

         const queryString = "select artists.artist_name, songs.song_name, songs.video_link, songs.lyrics from songs inner join artists on (songs.artist_id = artists.id) order by artists.id";

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

        const queryString = "select artists.artist_name, songs.song_name, songs.video_link, songs.lyrics from songs inner join artists on (songs.artist_id = artists.id) where artists.id=($1)";

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


    return {
        getAll,
        getById,

    };
};