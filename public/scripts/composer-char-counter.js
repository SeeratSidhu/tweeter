$(document).ready(function() {

  $('.round-button').hide();

  $('#tweet-text').on('input', function() {
    const text = $(this).val();
    const $form = $(this).closest('form');
    const $counter = $form.find('.counter');
    const charsLeft = (140 - text.length);

    $counter.html(charsLeft);

    //if character count exceeded, add class to implement css
    if (charsLeft < 0) {
      return $counter.addClass('invalid');
    }
    $counter.removeClass('invalid');
  });

  // STRETCH: hide/show back-to-top button on scroll
  $(window).scroll(function () {
    const $roundButton = $('.round-button');
    const $compose = $('.arrow');

    if ($(this).scrollTop()) {
      $roundButton.show();
      $compose.hide();
    } else {
      $roundButton.hide();
      $compose.show();
    }
  });

  $('.round-button').on('click', function() {

    if ($('.new-tweet').is(':hidden')) {
      $('.arrow').trigger('click');
    }
    
    $("html").animate({scrollTop: 0}, 500);
    $('#tweet-text').focus();
  });

});

