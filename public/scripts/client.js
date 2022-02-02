/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
  $('#tweets-container').append($tweet);
}
}

$(document).ready(function() {
renderTweets(data);
$('#form').submit(function(event) {
  event.preventDefault();
  const value = $(this).serialize();
  const url = $(this).attr('action');
  $.post(url, value)
    .done((data) => {
      console.log(data);
    })
})
});
