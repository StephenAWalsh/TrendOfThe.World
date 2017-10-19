'use strict';

const jsonParser = require('body-parser').json();
const { Router } = require('express');

const newsapiRouter = module.exports = new Router();

//Google News

newsapiRouter.post('/google-news', function(request, response) {
  client.query(
    `INSERT INTO
      google_news(author, description, publishedat, title, url, urltoimage, category, icon)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'news',
      'images/cnn.png',
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.delete('/google-news', function(request, response) {
  client.query(
    'DELETE FROM google_news;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.get('/google-news', function(request, response) {
  client.query('SELECT * FROM google_news')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

//Buzzfeed

newsapiRouter.post('/buzzfeed', function(request, response) {
  client.query(
    `INSERT INTO
      buzzfeed(author, description, publishedat, title, url, urltoimage, category, icon)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'offbeat',
      'images/buzzfeed.png',
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.delete('/buzzfeed', function(request, response) {
  client.query(
    'DELETE FROM buzzfeed;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.get('/buzzfeed', function(request, response) {
  client.query('SELECT * FROM buzzfeed')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

//ESPN

newsapiRouter.post('/espn', function(request, response) {
  client.query(
    `INSERT INTO
      espn(author, description, publishedat, title, url, urltoimage, category, icon)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'sports',
      'images/espn.png',
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.delete('/espn', function(request, response) {
  client.query(
    'DELETE FROM espn;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.get('/espn', function(request, response) {
  client.query('SELECT * FROM espn')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});


//TechCrunch

newsapiRouter.post('/techcrunch', function(request, response) {
  client.query(
    `INSERT INTO
      techcrunch(author, description, publishedat, title, url, urltoimage, category, icon)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'tech',
      'images/techcrunch.png',
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.delete('/techcrunch', function(request, response) {
  client.query(
    'DELETE FROM techcrunch;'
  )
  .then(function() {
    response.send('Delete complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});

newsapiRouter.get('/techcrunch', function(request, response) {
  client.query('SELECT * FROM techcrunch')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});
