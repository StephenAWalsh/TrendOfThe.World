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
  $newArticle.find('span.date').text(this.publishedAt);


  if (this.viewCount) {
    var viewCountReadable = numeral(this.viewCount).format('0,0')
    $newArticle.find('span.viewCount').text(viewCountReadable + " views");
  }

  var totalMinutes = parseInt((new Date() - new Date(this.publishedAt))/60/1000);
  var days = Math.floor(totalMinutes/60/24)
  var hours = Math.floor(totalMinutes/60 - (days*24));
  var minutes = Math.floor(totalMinutes - (days*24*60) - (hours*60));

  // $newArticle.find('span.date').html(days + ' days, ' + hours + ' hours, ' + minutes + ' minutes ago.');

  if (hours < 1) {
    $newArticle.find('span.date').html(minutes + 'm');
  } else if (hours >= 1 && days < 1) {
    $newArticle.find('span.date').html(hours + 'h ' + minutes + 'm');
  } else {
    $newArticle.find('span.date').html(days + 'd ' + hours + 'h ' + minutes + 'm');
  }
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

var articles = [];

var initPage = function(){
  articles = [];
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
  var sort = function (callback){
    articles.sort(function(a,b) {
      // Sort the articles based on newest first.
      return (new Date(b.publishedAt)) - (new Date(a.publishedAt));
    });
    callback();
  }

  $('.not-template').remove();

  var append = function(){
    articles.forEach(function(a) {
    $('#trending').append(a.toHtml());
    });
  }

  sort(append);
};

////////  UI/UX  /////////

// ABOUT US TOGGLE
$(document).ready(function() {

  function toggleSidebar() {
    $(".button").toggleClass("active");
    $("main").toggleClass("move-to-left");
    $(".sidebar-item").toggleClass("active");
  }

  $(".button").on("click tap", function() {
    toggleSidebar();
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      toggleSidebar();
    }
  });

});

// MOBILE ABOUT US TOGGLE
$(document).ready(function() {

  function toggleSidebar() {
    $(".button-mobile").toggleClass("active");
    $("main").toggleClass("move-to-left-mobile");
    $(".sidebar-item").toggleClass("active");
    $('.sidebar').toggleClass('sidebar-mobile');
    $(".sidebar-item").toggleClass("sidebar-item-mobile");
    $(".mobile-close").toggleClass("fa-times");
  }

  $(".button-mobile").on("click tap", function() {
    toggleSidebar();
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      toggleSidebar();
    }
  });

});


// BACK TO TOP

if ($('#back-to-top').length) {
  var scrollTrigger = 400, // px
      backToTop = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
              $('#back-to-top').addClass('show');
          } else {
              $('#back-to-top').removeClass('show');
          }
      };
  backToTop();
  $(window).on('scroll', function () {
      backToTop();
  });
  $('#back-to-top').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
          scrollTop: 0
      }, 900);
  });
}

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

//////  Event Listeners  //////

// CSS TOGGLE LIGHT-DARK BG

$('.toggle').click(function(){
  $('main').toggleClass('dark');
  $('header').toggleClass('dark');
  $('.nav-class').toggleClass('dark');
  $('.center-logo').toggleClass('center-logo-white');
  $('.box').toggleClass('box-shadow-off');
  $('.link-color').toggleClass('link-color-dark');
  $('.link-color-nav').toggleClass('link-color-nav-dark');
  $('.time-color-light').toggleClass('time-color-dark');
  $('.nav-light').toggleClass('nav-dark');
  $('.box-light').toggleClass('box-dark');
  $('.flip').toggleClass('fa-circle fa-circle-o');
  $('body').toggleClass('dark');
});

$('.nav a').click(function (){
  $('.container').css('display', 'none');
  $('.container').fadeIn(700);
});

$('.mobile-refresh').click(function() {
  fetchAll(initPage);
});

var idleTime = new Date().getTime();
$(document.body).bind("mousemove keypress", function() {
  idleTime = new Date().getTime();
});
function refresh() {
  if(new Date().getTime() - idleTime >= 60000) {
    fetchAll(initPage);
  } else {
    setTimeout(refresh, 10000);
  };
};
setTimeout(refresh, 10000);

$('#trending').on('mouseenter', '.not-template', function() {
  // console.log('trending');
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

fetchAll(initPage);
