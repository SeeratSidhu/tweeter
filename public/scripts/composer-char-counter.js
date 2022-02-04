$(document).ready(function() {

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
});

