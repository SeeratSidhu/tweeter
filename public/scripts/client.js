/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetObject) => {
  const $tweet = $(`<article class="tweet">
  <header>
    <span class="avatar"
      ><img src="https://i.imgur.com/73hZDYK.png" />${tweetObject.user.name}</span
    ><span class="handle">${tweetObject.user.handle}</span>
  </header>
  <p>${tweetObject.content.text}</p>
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
    $('#tweets-container').prepend($tweet);
  }
}

$(document).ready(function() {

  function loadTweets() {
    $.get('/tweets')
      .then((data) => {
        renderTweets(data);
      })
  };
  loadTweets();

  $('#form').submit(function(event) {
    event.preventDefault();
    
    const value = $(this).serialize();
    const url = $(this).attr('action');
    const charsLeft = $(this).children('.form-end').children('.counter').html();
    const tweetText = $(this).children('.input').children('#tweet-text').val();
    const tweetContainer = $(this).parent().siblings()  ;

    if (!tweetText.trim() || charsLeft === 140) {
      alert("Empty tweet!");
    } else if (charsLeft < 0) {
      alert("Maximum word limit exceeded!");
    } else {
      $.post(url, value)
        .done(() => {
          $(this).trigger('reset');
          $(tweetContainer).empty();
          loadTweets();
        });
    }
  });
});
