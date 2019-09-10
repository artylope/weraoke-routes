module.exports = (db) => {

    let getAll = (request, response) => {

        db.songs.getAll((error, songs) => {

            if (error) {
                console.error('error getting song', error);
                response.status(500);
                response.send('server error');
            } else {
                response.send({songs: songs});
            }
        });
    };

    let getById = (request, response) => {

        let song_id = parseInt(request.params.id);

        db.songs.getById(song_id,(error, songs) => {

            if (error) {
                console.error('error getting song', error);
                response.status(500);
                response.send('server error');
            } else {
                response.send({songs: songs});
            }
        });
    };


  // let newProduct = (request, response) => {

  //   db.products.newThing(request.body,(error, result) => {
  //     // TODO add conditionals that check for errors
  //     console.log("OUTTTTTTTTTTTTTTTT")
  //     console.log(result)
  //     response.send(result[0]);
  //   });


  // };

  return {
    getAll: getAll,
    getById: getById
    //newProduct:newProduct
  };
};