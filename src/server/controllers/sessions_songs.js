module.exports = (db) => {

    let getAll = (request, response) => {

        db.sessions_songs.getAll((error, sessions_songs) => {

            if (error) {
                console.error('error getting session songs', error);
                response.status(500);
                response.send('server error');
            } else {
                response.send({sessions_songs: sessions_songs});
            }
        });
    };

    let getById = (request, response) => {

        let session_id = parseInt(request.params.id);
        db.sessions_songs.getById(session_id,(error, sessions_songs) => {

            if (error) {
                console.error('error getting session songs', error);
                response.status(500);
                response.send('server error');
            } else {
                response.send({sessions_songs: sessions_songs});
            }
        });
    };

    // let createNew = (request, response) => {

    //     let session_id = parseInt(request.params.id);
    //     db.sessions_songs.getById(session_id,(error, sessions_songs) => {

    //         if (error) {
    //             console.error('error getting session songs', error);
    //             response.status(500);
    //             response.send('server error');
    //         } else {
    //             response.send({sessions_songs: sessions_songs});
    //         }
    //     });
    // };

    let addSongsToPlaylist = (request, response) => {
        // let session_id = parseInt(request.params.id);
        console.log('in controller');
        console.log('request', request.body);
        // console.log('response', response);
        let sessions_songs = request.body;

         db.sessions_songs.addSongsToPlaylist(request.body,(error, result) => {

            if (error) {
                console.error('error adding songs', error);
                response.status(500);
                response.send('server error');
            } else {
                console.log('in controller send');
                response.send();
            }
        });

    }

    let removeSongsFromPlaylist = (request, response) => {
        console.log('request', request.body);
        let sessions_songs = request.body;
        console.log('session_songs in controller', sessions_songs);
        db.sessions_songs.removeSongsFromPlaylist(sessions_songs,(error, result) => {

            if (error) {
                console.error('error adding songs', error);
                response.status(500);
                response.send('server error');
            } else {
                response.send();
            }
        });

    }


    return {
        getAll: getAll,
        getById: getById,
        //createNew: createNew,
        addSongsToPlaylist: addSongsToPlaylist,
        removeSongsFromPlaylist: removeSongsFromPlaylist,
    };
};
