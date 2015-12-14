$(window).load(function() {
  $('header').height($('.navbar-static-top').outerHeight());
});

$(document).ready(function() {

  $('.navbar-static-top').affix({
    offset: {
      top: 0
    }   
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > 25) {
      $('.navbar-static-top').addClass('scrolled');
    } else {
      $('.navbar-static-top').removeClass('scrolled');
    }
  })

  function calculateFullHeight(el) {
    var $window = $(window);
    var $navbar = $('header');
    var $oe_nav = $('#oe_main_menu_navbar');
    var $copy   = $('.video-header-copy'); 
    
    if ($oe_nav.length) {
      el.height($window.height() - $navbar.height() - $oe_nav.outerHeight());
    } else {
      el.height($window.height() - $navbar.height());
    }

    $copy.css('margin-top', el.height()/2 - $copy.height()/2)

  }

  calculateFullHeight($('.video-header'));

  $(window).resize(function() {
    calculateFullHeight($('.video-header'));
  })

  function scrollDown (el) {
    $nextEl = el.closest('section').next('section');

    $('html, body').animate({
      scrollTop: $nextEl.offset().top - $('header').height() + 40
    }, 800, 'swing');
  }

  $('.scroll-link').click(function() {
    scrollDown($(this));
  })

  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 10
  });

  $('.grid-link').on('mouseover', function(){
    $(this).find('.grid-item-copy-box').addClass('is-hovered')
  });
  $('.grid-link').on('mouseleave', function(){
    $(this).find('.grid-item-copy-box').removeClass('is-hovered')
  });
});