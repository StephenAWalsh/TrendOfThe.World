'use strict';

const express = require('express');
const pg = require('pg');

const PORT = process.env.PORT || 3000;
const app = express();

const conString = "postgres://tom:myPassword@localhost:5432/trending";

const client = new pg.Client(conString);
client.connect();

app.use(express.static('./'));

app.post('/google-news', function(request, response) {
  client.query(
    `INSERT INTO
      trending(author, description, publishedat, title, url, urltoimage)
      VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      request.body.author,
      request.body.description,
      request.body.publishedAt,
      request.body.title,
      request.body.url,
      request.body.urlToImage,
    ]
  )
  .then(function() {
    response.send('insert complete')
  })
  .catch(function(err) {
    console.error(err);
  });
});






app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});
