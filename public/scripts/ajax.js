'use strict';

//Google News

function Google() {};

Google.articles = [];

Google.truncateTable = function() {
  $.ajax({
    url: '/google-news',
    method: 'DELETE',
  })
  // .then(function(data) {
  //   console.log(data);
  // });
};

Google.insert = function() {

  $.ajax({
    url: 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33',
    method: 'GET',
  })
        .then(function(data) {
          for (var i = 0; i < 5; i++) {
            $.post('/google-news', {
              author: data.articles[i].author,
              description: data.articles[i].description,
              // publishedAt: data.articles[i].publishedAt ? moment.parseZone(data.articles[i].publishedAt).local().format().slice(0, -6) : moment().format().slice(0, -6),
              publishedAt: data.articles[i].publishedAt ? data.articles[i].publishedAt : moment().format(),
              title: data.articles[i].title,
              url: data.articles[i].url,
              urlToImage: data.articles[i].urlToImage
            });
          }
        });
};

Google.fetchAll = function(callback) {
  $.get('/google-news')
  .then(
    function(results) {
      Google.articles = results;
      callback();
    }
  )
};

Google.updateDB = function() {
  Google.truncateTable();
  console.log('table truncated')
  Google.insert();
  console.log('table updated')
};

//Buzzfeed

function Buzzfeed() {};

Buzzfeed.articles = [];

Buzzfeed.truncateTable = function() {
  $.ajax({
    url: '/buzzfeed',
    method: 'DELETE',
  })
  // .then(function(data) {
  //   console.log(data);
  // });
};

Buzzfeed.insert = function() {

  $.ajax({
    url: 'https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33',
    method: 'GET',
  })
        .then(function(data) {
          for (var i = 0; i < 5; i++) {
            $.post('/buzzfeed', {
              author: data.articles[i].author,
              description: data.articles[i].description,
              // publishedAt: data.articles[i].publishedAt ? moment.parseZone(data.articles[i].publishedAt).local().format().slice(0, -6) : moment().format().slice(0, -6),
              publishedAt: data.articles[i].publishedAt ? data.articles[i].publishedAt : moment().format(),
              title: data.articles[i].title,
              url: data.articles[i].url,
              urlToImage: data.articles[i].urlToImage
            });
          }
        });
};

Buzzfeed.fetchAll = function(callback) {
  $.get('/buzzfeed')
  .then(
    function(results) {
      Buzzfeed.articles = results;
      callback();
    }
  )
};

Buzzfeed.updateDB = function() {
  Buzzfeed.truncateTable();
  console.log('table truncated')
  Buzzfeed.insert();
  console.log('table updated')
};

//ESPN

function Espn() {};

Espn.articles = [];

Espn.truncateTable = function() {
  $.ajax({
    url: '/espn',
    method: 'DELETE',
  })
  // .then(function(data) {
  //   console.log(data);
  // });
};

Espn.insert = function() {

  $.ajax({
    url: 'https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33',
    method: 'GET',
  })
        .then(function(data) {
          for (var i = 0; i < 5; i++) {
            $.post('/espn', {
              author: data.articles[i].author,
              description: data.articles[i].description,
              // publishedAt: data.articles[i].publishedAt ? moment.parseZone(data.articles[i].publishedAt).local().format().slice(0, -6) : moment().format().slice(0, -6),
              publishedAt: data.articles[i].publishedAt ? data.articles[i].publishedAt : moment().format(),
              title: data.articles[i].title,
              url: data.articles[i].url,
              urlToImage: data.articles[i].urlToImage
            });
          }
        });
};

Espn.fetchAll = function(callback) {
  $.get('/espn')
  .then(
    function(results) {
      Espn.articles = results;
      callback();
    }
  )
};

Espn.updateDB = function() {
  Espn.truncateTable();
  console.log('table truncated')
  Espn.insert();
  console.log('table updated')
};

//TechCrunch

function TechCrunch() {};

TechCrunch.articles = [];

TechCrunch.truncateTable = function() {
  $.ajax({
    url: '/techcrunch',
    method: 'DELETE',
  })
  // .then(function(data) {
  //   console.log(data);
  // });
};

TechCrunch.insert = function() {

  $.ajax({
    url: 'https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33',
    method: 'GET',
  })
        .then(function(data) {
          for (var i = 0; i < 5; i++) {
            $.post('/techcrunch', {
              author: data.articles[i].author,
              description: data.articles[i].description,
              // publishedAt: data.articles[i].publishedAt ? moment.parseZone(data.articles[i].publishedAt).local().format().slice(0, -6) : moment().format().slice(0, -6),
              publishedAt: data.articles[i].publishedAt ? data.articles[i].publishedAt : moment().format(),
              title: data.articles[i].title,
              url: data.articles[i].url,
              urlToImage: data.articles[i].urlToImage
            });
          }
        });
};

TechCrunch.fetchAll = function(callback) {
  $.get('/techcrunch')
  .then(
    function(results) {
      TechCrunch.articles = results;
      callback();
    }
  )
};

TechCrunch.updateDB = function() {
  TechCrunch.truncateTable();
  console.log('table truncated')
  TechCrunch.insert();
  console.log('table updated')
};

//YouTube

function YouTube() {};

YouTube.articles = [];

YouTube.truncateTable = function() {
  $.ajax({
    url: '/youtube',
    method: 'DELETE',
  })
  // .then(function(data) {
  //   console.log(data);
  // });
};

YouTube.insert = function() {
  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/videos?part=id,statistics,snippet&chart=mostPopular&maxResults=5&key=AIzaSyDbufW1Ct37Sw47blgSdKi2NVIviS1ZcqY',
    method: 'GET',
  })
        .then(function(data) {
          for (var i = 0; i < 5; i++) {
            $.post('/youtube', {
              author: data.items[i].snippet.channelTitle,
              description: data.items[i].snippet.description,
              // publishedAt: data.items[i].snippet.publishedAt ? moment.parseZone(data.items[i].snippet.publishedAt).local().format().slice(0, -6) : moment().format().slice(0, -6),
              publishedAt: data.items[i].snippet.publishedAt ? data.items[i].snippet.publishedAt : moment().format(),
              title: data.items[i].snippet.title,
              url: 'https://www.youtube.com/watch?v=' + data.items[i].id,
              urlToImage: data.items[i].snippet.thumbnails.medium.url,
              viewCount: data.items[i].statistics.viewCount
            });
          }
        });
};

YouTube.fetchAll = function(callback) {
  $.get('/youtube')
  .then(
    function(results) {
      YouTube.articles = results;
      callback();
    }
  )
};

YouTube.updateDB = function() {
  YouTube.truncateTable();
  console.log('table truncated')
  YouTube.insert();
  console.log('table updated')
};

//GLOBAL - Function to populate databases

var updateDB = function() {
  Google.updateDB();
  Buzzfeed.updateDB();
  Espn.updateDB();
  TechCrunch.updateDB();
  YouTube.updateDB();
};

var truncateDB = function() {
  Google.truncateTable();
  Buzzfeed.truncateTable();
  Espn.truncateTable();
  TechCrunch.truncateTable();
  YouTube.truncateTable();
}
