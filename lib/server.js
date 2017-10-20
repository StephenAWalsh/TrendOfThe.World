'use strict';

const express = require('express');
const pg = require('pg');

//SHOULD NOT NEED THIS HERE
// const bodyParser = require('body-parser');

// const PORT = process.env.PORT;
const app = express();

// const conString = process.env.DATABASE_URL

// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();

//SHOULD NOT NEED THESE HERE!
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./public'));
app.use(require('../router/newsapi.js'));
// app.use(require('../router/twitter.js')); //WILL USE WHEN TWITTER IS ENABLED
app.use(require('../router/youtube.js'));

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server up on port', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('server already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('server not running'));
  });
};
