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
  this.category = opts.category;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('.template').clone();

  $newArticle.removeClass('template');
  $newArticle.addClass('not-template');

  $newArticle.attr('data-category', this.category);
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

Google.fetchAll();
Buzzfeed.fetchAll();

var initPage = function(){
  var articles = [];
  if (Google.articles.length > 0) {
    Google.articles.forEach(function(articleObject) {
      articles.push(new Article(articleObject));
    });
  }
  if (Google.articles.length > 0) {
    Buzzfeed.articles.forEach(function(articleObject) {
      articles.push(new Article(articleObject));
    });
  }
  articles.sort(function(a,b) {
    // Sort the articles based on newest first.
    return (new Date(b.publishedAt)) - (new Date(a.publishedAt));
  });
  $('.not-template').remove();
  articles.forEach(function(a) {
  $('#trending').append(a.toHtml());
  });
};

// initPage();
