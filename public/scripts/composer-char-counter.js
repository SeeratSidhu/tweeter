$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    const text = $(this).val();
    const form = $(this).parents().eq(1);
    const counter = $(form).children('.form-end').children('.counter');
    const charsLeft = (140 - text.length).toString();
    $(counter).html(charsLeft);

    if (charsLeft < 0) {
      $(counter).addClass('invalid');
    } else {
      $(counter).removeClass('invalid');
    }
  });
});

