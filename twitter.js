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
var twitterSearch = 'https://api.twitter.com/1.1/search/tweets.json';
var twitterShow = 'https://api.twitter.com/1.1/statuses/show.json';
var twitterOembed = 'https://publish.twitter.com/oembed';

var twitterRequest = function(bearerToken){
    var getPopTrends = function(callback) {
      var popTrends = [];
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
            // console.log(i)
            // console.log(res.body[0].trends[i].name);
            popTrends.push(res.body[0].trends[i].name);
          }
          callback(popTrends);
          // console.log(popTrends)
        });
    };
    var searchTweetsByTrend = function(trends) {
      for(var i = 0; i < trends.length; i++) {
      request
      .get(twitterSearch)
      .set({
        'Authorization': 'Bearer ' + bearerToken
      })
      .query({
        'q': trends[i],
        'result_type': 'popular',
        'count': '1'
      })
      .end(function(err, res){
        // console.log(res.body.statuses[0].user.screen_name);
        // console.log(res.body.statuses[0].id_str);
        var userName = res.body.statuses[0].user.screen_name;
        var tweetID = res.body.statuses[0].id_str;
        var tweetUrl = 'https://twitter.com/' + userName + '/statuses/' + tweetID;
        // console.log(tweetUrl);
        request
        .get(twitterOembed)
        .query({
          'url': tweetUrl,
          'maxwidth': 300,
          'omit_script': true
        })
        .end(function(err, res){
          console.log(res.body.html);
          // var tweetHtml = res.body.html;
        })
      })
    };
    };
    getPopTrends(searchTweetsByTrend);
};

twitterAuth(twitterRequest);
