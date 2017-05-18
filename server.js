'use strict';

const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const request = require('superagent');
const moment = require('moment');

const PORT = process.env.PORT || 3000;
const app = express();

// const conString = "postgres://gleeeqwbsqcjoc:f254821eba40d724489181568ff275b94d4476927d6fad00b7cba2fa6d38fdfb@ec2-54-83-49-44.compute-1.amazonaws.com:5432/df7iaiot91kp8g";
const conString = process.env.DATABASE_URL || "postgres://tom:myPassword@localhost:5432/trending"

const client = new pg.Client(conString);
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

//Google News
var googleAPI = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

request.get(googleAPI, function(err, res){
  if (err) throw err;
  // console.log(res.body.articles);

  for (var i = 0; i < 5; i++) {
    client.query(
      `INSERT INTO
        google_news(author, description, publishedat, title, url, urltoimage, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
      [
        res.body.articles[i].author ? res.body.articles[i].author : 'anonymous',
        res.body.articles[i].description,
        res.body.articles[i].publishedAt ? res.body.articles[i].publishedAt : moment().format(),
        res.body.articles[i].title,
        res.body.articles[i].url,
        res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/null.jpg',
        'news',
      ]
    )
  };
});

app.post('/google-news', function(request, response) {
  client.query(
    `INSERT INTO
      google_news(author, description, publishedat, title, url, urltoimage, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'news',
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

var buzzfeedAPI = 'https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

request.get(buzzfeedAPI, function(err, res){
  if (err) throw err;

  for (var i = 0; i < 5; i++) {
    client.query(
      `INSERT INTO
        buzzfeed(author, description, publishedat, title, url, urltoimage, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
      [
        res.body.articles[i].author ? res.body.articles[i].author : 'anonymous',
        res.body.articles[i].description,
        res.body.articles[i].publishedAt ? res.body.articles[i].publishedAt : moment().format(),
        res.body.articles[i].title,
        res.body.articles[i].url,
        res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/null.jpg',
        'offbeat',
      ]
    )
  };
});

app.post('/buzzfeed', function(request, response) {
  client.query(
    `INSERT INTO
      buzzfeed(author, description, publishedat, title, url, urltoimage, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'offbeat',
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

var espnAPI = 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

request.get(espnAPI, function(err, res){
  if (err) throw err;

  for (var i = 0; i < 5; i++) {
    client.query(
      `INSERT INTO
        espn(author, description, publishedat, title, url, urltoimage, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
      [
        res.body.articles[i].author ? res.body.articles[i].author : 'anonymous',
        res.body.articles[i].description,
        res.body.articles[i].publishedAt ? res.body.articles[i].publishedAt : moment().format(),
        res.body.articles[i].title,
        res.body.articles[i].url,
        res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/null.jpg',
        'sports',
      ]
    )
  };
});

app.post('/espn', function(request, response) {
  client.query(
    `INSERT INTO
      espn(author, description, publishedat, title, url, urltoimage, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'sports',
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

var techCrunchAPI = 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

request.get(techCrunchAPI, function(err, res){
  if (err) throw err;
  for (var i = 0; i < res.body.articles.length; i++) {
    // console.log(res.body.articles[i].author);
    client.query(
      `INSERT INTO
        techcrunch(author, description, publishedat, title, url, urltoimage, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `,
      [
        res.body.articles[i].author, //? res.body.articles[i].author : 'anonymous',
        res.body.articles[i].description,
        res.body.articles[i].publishedAt ? res.body.articles[i].publishedAt : moment().format(),
        res.body.articles[i].title,
        res.body.articles[i].url,
        res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/null.jpg',
        'tech',
      ]
    )
  };
});

app.post('/techcrunch', function(request, response) {
  client.query(
    `INSERT INTO
      techcrunch(author, description, publishedat, title, url, urltoimage, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
      'tech',
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

var youTubeAPI = 'https://www.googleapis.com/youtube/v3/videos?part=id,statistics,snippet&chart=mostPopular&maxResults=5&key=AIzaSyDbufW1Ct37Sw47blgSdKi2NVIviS1ZcqY';

request.get(youTubeAPI, function(err, res){
  if (err) throw err;

  for (var i = 0; i < 5; i++) {
    client.query(
      `INSERT INTO
        youtube(author, description, publishedat, title, url, urltoimage, category, viewcount)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
      `,
      [
        res.body.items[i].snippet.channelTitle,
        res.body.items[i].snippet.description,
        res.body.items[i].snippet.publishedAt,
        res.body.items[i].snippet.title,
        'https://www.youtube.com/watch?v=' + res.body.items[i].id,
        res.body.items[i].snippet.thumbnails.medium.url,
        'video',
        res.body.items[i].statistics.viewCount,
      ]
    )
  };
});

app.post('/youtube', function(request, response) {
  client.query(
    `INSERT INTO
      youtube(author, description, publishedat, title, url, urltoimage, category, viewcount)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
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
