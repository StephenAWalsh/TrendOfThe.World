

const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app = express();

const conString = "postgres://tom:myPassword@localhost:5432/trending";

const client = new pg.Client(conString);
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));

app.post('/google-news', function(request, response) {
  client.query(
    `INSERT INTO
      google_news(author, description, publishedat, title, url, urltoimage)
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





app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});
