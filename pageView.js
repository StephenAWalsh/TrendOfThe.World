'use strict';

console.log('hello from pageView');

// var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.description = opts.description;
  this.publishedAt = opts.publishedat;
  this.title = opts.title;
  this.url = opts.url;
  this.urlToImage = opts.urltoimage;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('.template').clone();

  $newArticle.removeClass('template');
  $newArticle.addClass('not-template');

  $newArticle.find('a.img-link').attr('href', this.url);
  $newArticle.find('img').attr('src', this.urlToImage);
  $newArticle.find('img').attr('alt', this.title);
  $newArticle.find('a.article-link').text(this.title);
  $newArticle.find('a.article-link').attr('href', this.url)
  $newArticle.find('section.article-description').text(this.description);
  // $newArticle.find('a.read-more').attr('href', this.url);
  $newArticle.find('span.author').text(this.author);
  $newArticle.find('span.date').text(this.publishedAt);

  // $newArticle.append('<hr>');
  return $newArticle;
}

Google.fetchAll(initPage);

var initPage = function(){
  var articles = [];
  // debugger;
  Google.articles.forEach(function(articleObject) {
    articles.push(new Article(articleObject));
  });
  $('.not-template').remove();
  articles.forEach(function(a) {
  $('#google-news').append(a.toHtml());
  });
};

// initPage();
