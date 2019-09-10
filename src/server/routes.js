module.exports = (app, db) => {
  const songs = require('./controllers/songs')(db);
  const sessions_songs = require('./controllers/sessions_songs')(db)
  const artists = require('./controllers/artists')(db)

  app.get('/api/sessions', sessions_songs.getAll);
  app.get('/api/sessions/:id', sessions_songs.getById);
  //app.get('/api/sessions/:name', sessions_songs.getByName);
  //app.post('/api/sessions/new', sessions.createNew);
  app.post('/api/sessions/:id/new', sessions_songs.addSongsToPlaylist);
  app.delete('/api/sessions/:id/delete', sessions_songs.removeSongsFromPlaylist)

  app.get('/api/artists', artists.getAll);
  app.get('/api/artists/:id', artists.getById);

  app.get('/api/songs', songs.getAll);
  app.get('/api/songs/:id', songs.getById);
  // app.post('/api/songs/new', songs.createNew);

};