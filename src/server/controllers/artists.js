module.exports = (db) => {

    let getAll = (request, response) => {

        db.artists.getAll((error, artists) => {

            if (error) {
                console.error('error getting artists', error);
                response.status(500);
                response.send('server error');
            } else {
                response.send({artists: artists});
            }
        });
    };

    let getById = (request, response) => {

        let artist_id = parseInt(request.params.id);
        db.artists.getById(artist_id,(error, artists) => {

            if (error) {
                console.error('error getting artists', error);
                response.status(500);
                response.send('server error');
            } else {
                response.send({artists: artists});
            }
        });
    };



    return {
        getAll: getAll,
        getById: getById
    };
};