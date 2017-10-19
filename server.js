'use strict';

const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

const conString = process.env.DATABASE_URL || "postgres://tom:myPassword@localhost:5432/trending"

const client = new pg.Client(conString);
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public/'));

//Google News

app.post('/google-news', function(request, response) {
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

app.delete('/google-news', function(request, response) {
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

app.get('/google-news', function(request, response) {
  client.query('SELECT * FROM google_news')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

//Buzzfeed

app.post('/buzzfeed', function(request, response) {
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

app.delete('/buzzfeed', function(request, response) {
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

app.get('/buzzfeed', function(request, response) {
  client.query('SELECT * FROM buzzfeed')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

//ESPN

app.post('/espn', function(request, response) {
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

app.delete('/espn', function(request, response) {
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

app.get('/espn', function(request, response) {
  client.query('SELECT * FROM espn')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});


//TechCrunch

app.post('/techcrunch', function(request, response) {
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

app.delete('/techcrunch', function(request, response) {
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

app.get('/techcrunch', function(request, response) {
  client.query('SELECT * FROM techcrunch')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});

//YouTube

app.post('/youtube', function(request, response) {
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

app.delete('/youtube', function(request, response) {
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

app.get('/youtube', function(request, response) {
  client.query('SELECT * FROM youtube')
  .then(function(result) {
    response.send(result.rows);
  })
  .catch(function(err) {
    console.error(err)
  })
});


app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});
