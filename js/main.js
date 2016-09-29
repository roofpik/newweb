'use strict';
$(document).ready(function() {

$('.gl-compare-icon .gl-compare-btn-wrapper').on('click', function(event) {
  event.preventDefault();

  $(this).parent().find('#gl-compare-menu').toggleClass('gl-compare-menu-visible');
});

/* ==================================================================
                    MODAL
================================================================== */
$('[data-remodal-id=modal], [data-remodal-id=modal-share]').remodal({
    hashTracking : false
});

/* ==================================================================
                    WOW JS
================================================================== */
  var e = new WOW({
      boxClass: "appear",
      animateClass: "animated",
      offset: 100,
      mobile: !1,
      live: !0,
      callback: function(e) {}
  });
  e.init();

/* ==================================================================
                    MAGNIFIC POPUP
================================================================== */
$('.gl-lightbox-img').magnificPopup({
  type: 'image',
  gallery:{
    enabled:true
  }
});

/* ==================================================================
                    MATCH HEIGHT
================================================================== */
$('.gl-footer-widget, .gl-same-height').matchHeight();


/* ==================================================================
                    SELECT2
================================================================== */
$(".gl-category-dropdown-selection").select2({
  placeholder: "Category",
  minimumResultsForSearch: Infinity,
  dropdownCssClass: "gl-big-search-drop"
});

 $(".gl-realestate-category-selection").select2({
  placeholder: "Category",
  minimumResultsForSearch: Infinity,
  dropdownCssClass: "gl-realestate-drop"
});

 $(".gl-realestate-type-selection").select2({
  placeholder: "Type",
  minimumResultsForSearch: Infinity,
  dropdownCssClass: "gl-realestate-drop"
});

$(".gl-location-selection").select2({
  placeholder: "Canada",
  minimumResultsForSearch: Infinity,
  dropdownCssClass: "gl-location-drop"
});

$(".gl--search-category-selection").select2({
  placeholder: "Category",
  minimumResultsForSearch: Infinity,
  dropdownCssClass: "gl-search-category-drop"
});

$(".gl-sort-selection").select2({
  placeholder: "Category",
  minimumResultsForSearch: Infinity,
  dropdownCssClass: "gl-sorting-drop"
});

/* ==================================================================
                    SMOOTH SCROLL
================================================================== */
$('a.gl-scroll-down').smoothScroll();


/* ==================================================================
                    SKILLBAR
================================================================== */
$('.gl-skillbar').waypoint(function(direction) {
    $('.gl-skillbar[data-percent]').each(function () {
        var skillbarWrapper = $(this);
        var progress = $(this).find('span.skill-bar-percent');
        var percentage = Math.ceil($(this).attr('data-percent'));
            $({countNum: 0}).animate({countNum: percentage}, {
              duration: 3000,
              step: function() {
                // What todo on every count
              var pct = '';
              if(percentage == 0){
                pct = Math.floor(this.countNum) + '%';
              }else{
                pct = Math.floor(this.countNum+1) + '%';
              }
              progress.text(pct) && skillbarWrapper.find('.gl-skillbar-bar').css('width',pct);
              }
            });
          })
        this.destroy()
    }, {
    offset: 'bottom-in-view'
});


/* ==================================================================
                    RANGE SLIDER
================================================================== */
$("#gl-salary-range, #gl-adv-search-range").ionRangeSlider({
    type: "double",
    min: 50,
    max: 10000,
    step: 50,
    from: 500,
    to: 7000,
    hide_min_max: true,
    // hide_from_to: true,
    grid: false,
});

var $result = $(".gl-range-value");
var track = function (data) {
    $result.html('$' + data.from + ' - ' + '$' + data.to);
};

$("#gl-search-range").ionRangeSlider({
    type: "double",
    min: 50,
    max: 10000,
    step: 50,
    from: 500,
    to: 7000,
    hide_min_max: true,
    hide_from_to: true,
    grid: false,
    onStart: track,
    onChange: track,
});

/* ==================================================================
                    ISOTOPE
================================================================== */
// BLOG
var $blogGridContainer = $('.gl-blog-grid-wrapper');
var $blogContainer = $('.gl-blog-content');

// $blogContainer.infinitescroll({
//   navSelector  : '#gl-blog-next-page-nav',    // selector for the paged navigation
//   nextSelector : '#gl-blog-next-page-nav a',  // selector for the NEXT link (to page 2)
//   itemSelector : '.gl-blog-items',     // selector for all items you'll retrieve
//   animate: true,
//   loading: {
//     msgText: "",
//     speed: 500,
//     animate: false,
//       finishedMsg: 'No more items to load.',
//       img: 'images/loader.png'
//     }
//   }
// );

$blogGridContainer.imagesLoaded(function() {
  $blogGridContainer.isotope({
      itemSelector: ".gl-blog-items",
      masonry: {
          columnWidth: 1
      }
  })
});

  // $blogGridContainer.infinitescroll({
  //     navSelector  : '#gl-blog-next-page-nav',    // selector for the paged navigation
  //     nextSelector : '#gl-blog-next-page-nav a',  // selector for the NEXT link (to page 2)
  //     itemSelector : '.gl-blog-items',     // selector for all items you'll retrieve
  //     animate: true,
  //     loading: {
  //       msgText: "",
  //       speed: 500,
  //       animate: false,
  //         finishedMsg: 'No more items to load.',
  //         img: 'images/loader.png'
  //       }
  //   },
  //   function(newElements) {
  //     $blogGridContainer.imagesLoaded(function() {
  //         $blogGridContainer.isotope("appended", $(newElements))
  //     })
  // });

  // ISOTOPE
  var $portfolioContainer = $('.gl-listing-categories-wrapper');

    $portfolioContainer.imagesLoaded(function(){
      $portfolioContainer.isotope({
        itemSelector: '.gl-listing-cat-item',
        percentPosition: true,
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1
        }
      });
    });



/* ==================================================================
                    LANDING PAGE HERO HEIGHT
================================================================== */
$(window).resize(function() {
  $('.gl-landing-page-template .gl-hero-img-wrapper').height(
    $(window).height()
  );
});

$(window).trigger('resize');

// Minified Header
  $(window).on('scroll', function() {
      if ($(window).scrollTop() > $(window).height()) {
          $('.gl-transparent-header').addClass('minified');
      } else {
          $('.gl-transparent-header').removeClass('minified');
      }
  });

});