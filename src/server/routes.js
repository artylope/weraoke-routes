module.exports = (app, db) => {
  const artists = require('./controllers/artists')(db);
  const songs = require('./controllers/songs')(db);
  // const sessions = require('./controllers/sessions')(db);
  const sessions_songs = require('./controllers/sessions_songs')(db);



  app.get('/api/artists', artists.getAll);
  app.get('/api/artists/:id', artists.getById);

  app.get('/api/songs', songs.getAll);
  app.get('/api/songs/:id', songs.getById);
  // app.post('/api/songs/new', songs.createNew);

  // app.get('/api/sessions/', sessions.getAll);
  // app.post('/api/sessions/new', sessions.createNewSession);
  // app.get('/api/sessions/:id', sessions.getById);
  // app.get('/api/sessions/:name', sessions.getByName);

  app.get('/api/sessions/:id/songs', sessions_songs.getById);
  app.post('/api/sessions/:id/songs/new', sessions_songs.addSongsToPlaylist);
  app.delete('/api/sessions/:id/songs/delete', sessions_songs.removeSongsFromPlaylist)



};
