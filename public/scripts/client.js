// import { response } from "express";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
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
                "handle": "@rd"
            },
            "content": {
                "text": "Je pense , donc je suis"
            },
            "created_at": 1461113959088
        }
    ]
    const createTweetElement = (tweet) => {
        const { name, avatars, handle } = tweet.user;
        let html = `
            <img src="${avatars}">
            <span>${name}</span><span class ="username">${handle}</span>
            <p>${tweet.content.text} </p>
            <hr>
            <span class ="date">Date</span>
            <span class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
            </span>
        `
        const $tweet = $("<article>").addClass("tweet")
        let post = $tweet.append(html)
        return post
    }
    const renderTweets = (tweetArray) => {
        let tweets = [];
        for (let tweet of tweetArray) {
            tweets.push(createTweetElement(tweet))
        }
        let posted = $('.container').append(tweets);
        return posted;
    }
    renderTweets(data);
    $(".form").submit(function(event) {
        event.preventDefault()
        console.log('submit');
        let data = $('form').serialize();
        $.ajax({
            url: '/tweets',
            type: "POST",
            data: data
        }).then(function(){
            console.log('succes');
        });
    });
});