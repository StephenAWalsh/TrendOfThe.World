'use strict';

function Google() {};

Google.articles = [];

Google.insert = function() {

  $.ajax({
    url: 'https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=8e27dae588c2418eb0bd0559dea50b33',
    method: 'GET',
  })
        .then(function(data) {
          console.log(data);
          for (var i = 0; i < 5; i++) {
            // console.log(data.articles[i])
            $.post('/google-news', {
              author: data.articles[i].author,
              description: data.articles[i].description,
              publishedAt: data.articles[i].publishedAt,
              title: data.articles[i].title,
              url: data.articles[i].url,
              urlToImage: data.articles[i].urlToImage
            });
          }
          // debugger;
        });
};

Google.fetchAll = function() {
  $.get('/google-news')
  .then(
    function(results) {
      Google.articles = results;
    }
  )
};
