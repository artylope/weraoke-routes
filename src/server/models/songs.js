/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

    let getAll = (callback) => {

         const queryString = "select songs.id, songs.song_name, artists.artist_name, artists.image_link, songs.video_link, songs.lyrics from songs inner join artists on (songs.artist_id = artists.id) order by artist_id";

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

        const queryString = "select songs.song_name, artists.artist_name, artists.image_link, songs.video_link, songs.lyrics from songs inner join artists on (songs.artist_id = artists.id) WHERE songs.id=($1)"
        let arr = [id]

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

  //     let name = data.name;
  //     let price = data.price;
  //     let description = data.description;
  //     console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH")
  //     console.log(data)
  //     let query = "INSERT INTO products (name, price, description) VALUES ($1 , $2 , $3) RETURNING *";
  //     const values = [name, price, description];
  //     console.log(values);
  //     dbPoolInstance.query(query, values, (error, queryResult) => {
  //       if (error) {
  //           console.log("ERRORORORORORORORORORO")
  //           console.log(error)
          // invoke callback function with results after query has executed
        //   callback(error, null);
        // } else {
        //     console.log("SUCCESSSSSSSSS")
          // invoke callback function with results after query has executed

      //     callback(null, queryResult.rows );
      //   }
      // });

  return {
    getAll,
    getById
    // createNew
    //newThing
  };
};