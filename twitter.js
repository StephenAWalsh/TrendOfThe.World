'use strict';

// const pg = require('pg');
const request = require('superagent');
// const moment = require('moment');

// const conString = process.env.DATABASE_URL || "postgres://tom:myPassword@localhost:5432/trending"

// const client = new pg.Client(conString);
// client.connect();


var consumer_key = '20ux24G6Ft9Cj5MrVEHEI01jj';
var consumer_secret = 'B5Chvy7PsoWtOTlg8rjPp0NM25KPiq5EvkqvExeUpCou1rX4Q7';
var encode_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');

var twitterAuthUrl = 'https://api.twitter.com/oauth2/token';

var twitterAuth = function(callback){

  request
    .post(twitterAuthUrl)
    .set({
      'Authorization': 'Basic ' + encode_secret,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    })
    .send('grant_type=client_credentials')
    .end(function(err, res){
      callback(res.body.access_token);
     });
}

var twitterTrends = 'https://api.twitter.com/1.1/trends/place.json';

var twitterRequest = function(bearerToken){
  request
    .get(twitterTrends)
    .set({
      'Authorization': 'Bearer ' + bearerToken
    })
    .query({
      'id': '23424977'
    })
    .end(function(err, res){
      for (var i = 0; i < 5; i++) {
        console.log(res.body[0].trends[i]);
      }
     });
}

twitterAuth(twitterRequest);
