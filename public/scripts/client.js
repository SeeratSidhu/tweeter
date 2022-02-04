/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetObject) => {
  const $tweet = $(`<article class="tweet">
  <header>
    <span class="avatar"
      ><img src="${tweetObject.user.avatars}" />${tweetObject.user.name}</span
    ><span class="handle">${tweetObject.user.handle}</span>
  </header>
  <p>${escapeText(tweetObject.content.text)}</p>
  <hr />
  <footer>
    <span>${tweetObject.created_at}</span
    ><span class="icons"
      ><i class="fas fa-flag"></i><i class="fas fa-retweet"></i
      ><i class="fas fa-heart"></i
    ></span>
  </footer>
</article>`);
return $tweet;
}

const renderTweets = (tweetArray) => {
  for (let tweet of tweetArray) {
    tweet['created_at'] = timeago.format(tweet.created_at);
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
  }
}

$(document).ready(function() {

  $('#error-msg').hide();

  function loadTweets() {
    $.get('/tweets')
      .then((data) => {
        $('.tweets-container').empty();
        renderTweets(data);
      })
  };
  loadTweets();

  $('#form').submit(function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    const charsLeft = $(this).find('.counter').html();
    const $textArea = $(this).children('.input').children('#tweet-text');
    const tweetText = $textArea.val();
    const errorContainer = $(this).parent().children('#error-msg');
    

    if (!tweetText.trim() || charsLeft === 140) {
      errorContainer.slideUp().slideDown(200, function() {
        errorContainer.text("🛑 A post cannot be blank! 🛑");
      })
    } else if (charsLeft < 0) {
      errorContainer.slideUp().slideDown(200, function() {
        errorContainer.text("🛑 Maximum word limit exceeded! 🛑");
      })
    } else {
      errorContainer.slideUp();
      $.post('/tweets', data)
        .done(() => {
          loadTweets();
          $(this).trigger('reset');
          $textArea.trigger('input');
        });
    }
  });
});
