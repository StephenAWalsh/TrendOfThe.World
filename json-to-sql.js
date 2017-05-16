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
              publishedAt: data.articles[i].publishedAt,
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
              publishedAt: data.articles[i].publishedAt,
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
              publishedAt: data.articles[i].publishedAt,
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

var updateDB = function() {
  Google.updateDB();
  Buzzfeed.updateDB();
  Espn.updateDB();
};
