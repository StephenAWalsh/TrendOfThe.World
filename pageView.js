'use strict';

const pageView = {};

pageView.initIndexPage = function() {
  Google.articles.forEach(function(article) {
    debugger;
    // $('#articles').append(article.toHtml())
  });
};
