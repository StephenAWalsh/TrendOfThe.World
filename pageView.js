'use strict';

function Article (opts) {
  this.author = opts.author;
  this.description = opts.description;
  this.publishedAt = opts.publishedat;
  this.title = opts.title;
  this.url = opts.url;
  this.urlToImage = opts.urltoimage;
  this.category = opts.category;
  this.viewCount = opts.viewcount
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
  // $newArticle.find('span.date').text(this.publishedAt);


  if (this.viewCount) {
    var viewCountReadable = numeral(this.viewCount).format('0,0')
    $newArticle.find('span.viewCount').text(viewCountReadable);
  }

  var totalMinutes = parseInt((new Date() - new Date(this.publishedAt))/60/1000);
  var hours = Math.floor(totalMinutes/60);
  var minutes = Math.floor(totalMinutes - (hours*60));

// $newArticle.find('span.date').html(hours + ' hours, ' + minutes + ' minutes ago.');

  if (this.publishedAt) {

    if (hours < 1) {
      $newArticle.find('span.date').html(minutes + 'm');
    } else if (hours = 1) {
      $newArticle.find('span.date').html(hours + 'h ' + minutes + 'm');
    } else {
      $newArticle.find('span.date').html(hours + 'h ' + minutes + 'm');
    }
  }
  else {
    $newArticle.find('span.date').html('today');
  }
  // $newArticle.append('<hr>');
  return $newArticle;
}

var fetchAll = function(callback) { //useful function to fetch from DB without refreshing the page
  Google.fetchAll(function(){
    Buzzfeed.fetchAll(function(){
      Espn.fetchAll(function(){
        TechCrunch.fetchAll(function(){
          YouTube.fetchAll(function(){
            callback();
          })
        });
      });
    });
  });
}

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
  if (Espn.articles.length > 0) {
    Espn.articles.forEach(function(articleObject) {
      articles.push(new Article(articleObject));
    });
  }
  if (TechCrunch.articles.length > 0) {
    TechCrunch.articles.forEach(function(articleObject) {
      articles.push(new Article(articleObject));
    });
  }
  if (YouTube.articles.length > 0) {
    YouTube.articles.forEach(function(articleObject) {
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

//Filters

Article.showAll = function(){
  $('.not-template').show();
};
Article.showNews = function(){
  $('.not-template').hide();
  $('.not-template[data-category="news"]').show();
};
Article.showOffbeat = function(){
  $('.not-template').hide();
  $('.not-template[data-category="offbeat"]').show();
};
Article.showSports = function(){
  $('.not-template').hide();
  $('.not-template[data-category="sports"]').show();
};
Article.showTech = function(){
  $('.not-template').hide();
  $('.not-template[data-category="tech"]').show();
};
Article.showVideo = function(){
  $('.not-template').hide();
  $('.not-template[data-category="video"]').show();
};

//Event Listeners

$('#trending').on('mouseenter', '.not-template', function() {
  console.log('trending');
  var animation = 'animated pulse';
  var animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  $(this).addClass(animation).one(animationend, function(){
    $(this).removeClass(animation);
  });
});

$('a.home').click(function(event) {
  event.preventDefault();
  Article.showAll();
});

$('a.news').click(function(event) {
  event.preventDefault();
  Article.showNews();
});

$('a.offbeat').click(function(event) {
  event.preventDefault();
  Article.showOffbeat();
});

$('a.sports').click(function(event) {
  event.preventDefault();
  Article.showSports();
});

$('a.tech').click(function(event) {
  event.preventDefault();
  Article.showTech();
});

$('a.video').click(function(event) {
  event.preventDefault();
  Article.showVideo();
});

$( document ).ready(function() {
  fetchAll(initPage);
});
