$(document).ready(function() {
  $("#slider").owlCarousel({
    loop:true,
    margin:0,
    autoplay: true,
    nav: true,
    responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
    }
  });
  
  $('#services__slider').owlCarousel({
    loop:true,
    margin:0,
    nav: false,
    mouseDrag: false,
    touchDrag: false,
    smartSpeed: 1,
    responsive:{
      0:{
          items:1
      },
      600:{
          items:1
      },
      1000:{
          items:1
      }
    }
  });
});