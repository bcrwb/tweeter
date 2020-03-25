// import { response } from "express";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
   
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

   
       
    $(".form").submit(function(event) {
        event.preventDefault()
        console.log('submit');
        let data = $('form').serialize();
        $("#tweet-text").val(' ');
        if($('.counter').val() >= 140){
            alert("Please enter something");
        } else if ($('.counter').val()<0){
            alert('Tweet too Long')
        } else {
            $.ajax({
                url: '/tweets',
                type: "POST",
                data: data
            }).then(function(){
                console.log('succes');
                loadTweets();
            });
        }
    });

        const loadTweets = ()=>{

         $.ajax({
            url: '/tweets',
            type: "GET",
            dataType:'JSON'
        }).then(response => {
            renderTweets(response);
        });
          
        
        }
        
       // loadTweets();
    
    


});
    
    
