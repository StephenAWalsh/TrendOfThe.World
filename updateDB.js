'use strict';

const pg = require('pg');
const request = require('superagent');
const moment = require('moment');

const conString = process.env.DATABASE_URL || "postgres://tom:myPassword@localhost:5432/trending"

const client = new pg.Client(conString);
client.connect();

var googleAPI = 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

var updateGoogle = function(callback) {
  request.get(googleAPI, function(err, res){
    if (err) throw err;

    client.query('DELETE FROM google_news')

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
          res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/googleNews.png',
          'news',
        ]
      )
    };
  });
callback();
}
var updateBuzzfeed = function(callback) {
  var buzzfeedAPI = 'https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

  request.get(buzzfeedAPI, function(err, res){
    if (err) throw err;

    client.query('DELETE FROM buzzfeed')

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
          res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/buzzFeed.png',
          'offbeat',
        ]
      )
    };
  });
callback();
}
var updateEspn = function(callback) {
  var espnAPI = 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

  request.get(espnAPI, function(err, res){
    if (err) throw err;

    client.query('DELETE FROM espn')

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
          res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/espn.png',
          'sports',
        ]
      )
    };
  });
callback();
}
var updateTechCrunch = function(callback) {
  var techCrunchAPI = 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33';

  request.get(techCrunchAPI, function(err, res){
    if (err) throw err;

    client.query('DELETE FROM techcrunch')

    for (var i = 0; i < res.body.articles.length; i++) {
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
          res.body.articles[i].urlToImage ? res.body.articles[i].urlToImage : 'images/techCrunch.png',
          'tech',
        ]
      )
    };
  });
callback();
}
var updateYouTube = function(callback) {
  var youTubeAPI = 'https://www.googleapis.com/youtube/v3/videos?part=id,statistics,snippet&chart=mostPopular&maxResults=5&key=AIzaSyDbufW1Ct37Sw47blgSdKi2NVIviS1ZcqY';

  request.get(youTubeAPI, function(err, res){
    if (err) throw err;

    client.query('DELETE FROM youtube')

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
callback();
}

var updateDB = function(callback) {
  updateGoogle(function(){
    updateBuzzfeed(function(){
      updateEspn(function(){
        updateTechCrunch(function(){
          updateYouTube(function(){
            callback();
          })
        });
      });
    });
  });
}

// var end = function() {
//   process.exit();
// };

var end = function() {
  setTimeout(function(){process.exit();}, 2000);
};

updateDB(end);
