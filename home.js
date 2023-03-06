// $(function () {
//     $(window).on('scroll', function () {
//         if ( $(window).scrollTop() > 10 ) {
//             $('.navbar').addClass('active');
//         } else {
//             $('.navbar').removeClass('active');
//         }
//     });
// });


/*Interactivity to determine when an animated element in in view. In view elements trigger our animation*/
$(document).ready(function() {

    //window and animation items
    var animation_elements = $.find('.animation-element');
    var web_window = $(window);
  
    //check to see if any animation containers are currently in view
    function check_if_in_view() {
      //get current window information
      var window_height = web_window.height();
      var window_top_position = web_window.scrollTop();
      var window_bottom_position = (window_top_position + window_height);
  
      //iterate through elements to see if its in view
      $.each(animation_elements, function() {
  
        //get the element sinformation
        var element = $(this);
        var element_height = $(element).outerHeight();
        var element_top_position = $(element).offset().top;
        var element_bottom_position = (element_top_position + element_height);
  
        //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
        if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
          element.addClass('in-view');
        } else {
          element.removeClass('in-view');
        }
      });
  
    }
  
    //on or scroll, detect elements in view
    $(window).on('scroll resize', function() {
        check_if_in_view()
      })
      //trigger our scroll event on initial load
    $(window).trigger('scroll');
  
  });


  $(function() {
    var $blocks = $('.animBlock.notViewed');
    var $window = $(window);
  
    $window.on('scroll', function(e){
      $blocks.each(function(i,elem){
        if($(this).hasClass('viewed')) 
          return;
          
        isScrolledIntoView($(this));
      });
    });
  });
  
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemOffset = 0;
    
    if(elem.data('offset') != undefined) {
      elemOffset = elem.data('offset');
    }
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    
    if(elemOffset != 0) { // custom offset is updated based on scrolling direction
      if(docViewTop - elemTop >= 0) {
        // scrolling up from bottom
        elemTop = $(elem).offset().top + elemOffset;
      } else {
        // scrolling down from top
        elemBottom = elemTop + $(elem).height() - elemOffset
      }
    }
    
    if((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
      // once an element is visible exchange the classes
      $(elem).removeClass('notViewed').addClass('viewed');
      
      var animElemsLeft = $('.animBlock.notViewed').length;
      if(animElemsLeft == 0){
        // with no animated elements left debind the scroll event
        $(window).off('scroll');
      }
    }
  }