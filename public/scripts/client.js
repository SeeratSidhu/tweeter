/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#error-msg').hide();
  $('.new-tweet').hide();

  loadTweets();

  // STRETCH: toggle the form on click and autofocus the textarea
  $('.arrow').on('click', onToggle);

  //validate and post the tweet
  $('#form').submit(postTweet);

});

//STRETCH: callback function to toggle form
const onToggle = function() {
  
  const $tweetForm = $('.new-tweet');
  const $textArea = $tweetForm.find('#tweet-text');
  const $errorContainer = $tweetForm.children('#error-msg');

  if ($tweetForm.is(':hidden')) {
    $tweetForm.slideDown('fast');
    $textArea.focus();
  } else {
    $errorContainer.hide();
    $tweetForm.slideUp('fast');
  }
};

//callback function to post tweet
const postTweet = function(event) {
  event.preventDefault();

  const data = $(this).serialize();
  const charsLeft = $(this).find('.counter').html();
  const $textArea = $(this).find('#tweet-text');
  const tweetText = $textArea.val();
  const $errorContainer = $(this).prev('#error-msg');
    
  // Form validations with added sliding motion
  if (!tweetText.trim() || charsLeft === 140) {
    $errorContainer.slideUp().slideDown(200, function() {
      $errorContainer.text("🛑 A post cannot be blank! 🛑");
    });
  } else if (charsLeft < 0) {
    $errorContainer.slideUp().slideDown(200, function() {
      $errorContainer.text("🛑 Maximum word limit exceeded! 🛑");
    });
  } else {
    $errorContainer.slideUp();

    //post a new tweet if no error
    $.post('/tweets', data)
      .done(() => {
        loadTweets();
        $(this).trigger('reset');
        $textArea.trigger('input');
      });
  }
};

//render tweets from "database"
const loadTweets = () => {

  $.get('/tweets')
    .then((data) => {
      $('.tweets-container').empty();
      renderTweets(data);
    });
};

const createTweetElement = (tweetObject) => {

  const $tweet = $(`<article class="tweet">
    <header>
      <span class="avatar"
        ><img src="${tweetObject.user.avatars}" />${tweetObject.user.name}</span
      ><span class="handle">${tweetObject.user.handle}</span>
    </header>
    <p>${escapeText(tweetObject.content.text)}</p>
    <hr/>
    <footer>
      <span>${tweetObject.created_at}</span
      ><span class="icons"
        ><i class="fas fa-flag"></i><i class="fas fa-retweet"></i
        ><i class="fas fa-heart"></i
      ></span>
    </footer>
  </article>`);

  return $tweet;
};

//display an array of tweets on the webpage in reverse-chronological order
const renderTweets = (tweetArray) => {

  for (let tweet of tweetArray) {
    tweet['created_at'] = timeago.format(tweet.created_at);
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
  }
};

//defense from XSS
const escapeText = function(str) {

  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};