$(window).load(function() {
  $('header').height($('.navbar-static-top').outerHeight());
});

$(document).ready(function() {
  $('.navbar-static-top').affix({
    offset: {
      top: 0
    }   
  });
});