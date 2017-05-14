'use strict';

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
  var $newArticle = $('article.template').clone();

  $newArticle.removeClass('template');
  $newArticle.addClass('not-template');

  $newArticle.find('a.read-more').attr('href', this.url);
  $newArticle.find('img').attr('alt', this.title);
  $newArticle.find('img').attr('src', this.urlToImage);
  $newArticle.find('a.article-link').attr('href', this.url)
  $newArticle.find('h2').text(this.title);
  $newArticle.find('section.article-description').text(this.description);
  $newArticle.find('span.author').text(this.author);
  $newArticle.find('span.date').text(this.publishedAt);

  $newArticle.append('<hr>');
  return $newArticle;
}

Google.fetchAll(initPage);

var initPage = function(){
  var articles = [];
  Google.articles.forEach(function(articleObject) {
    articles.push(new Article(articleObject));
  });
  $('.not-template').remove();
  articles.forEach(function(a) {
  $('#google-news').append(a.toHtml());
  });
};

// initPage();