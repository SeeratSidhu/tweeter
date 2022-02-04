$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    const text = $(this).val();
    const $form = $(this).closest('form');
    const $counter = $form.find('.counter');
    const charsLeft = (140 - text.length);
    $counter.html(charsLeft);

    if (charsLeft < 0) {
      $counter.addClass('invalid');
    } else {
      $counter.removeClass('invalid');
    }
  });

});

