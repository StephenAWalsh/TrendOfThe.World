'use strict';

const jsonParser = require('body-parser').json();
const { Router } = require('express');

const youtubeRouter = module.exports = new Router();

//YouTube

youtubeRouter.post('/youtube', function(request, response) {
  client.query(
    `INSERT INTO
      youtube(author, description, publishedat, title, url, urltoimage, category, viewcount, icon)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'video',
      request.body.viewCount,
      'images/youtube.png',
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

youtubeRouter.delete('/youtube', function(request, response) {
  client.query(
    'DELETE FROM youtube;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

youtubeRouter.get('/youtube', function(request, response) {
  client.query('SELECT * FROM youtube')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});
