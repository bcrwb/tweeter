// import { response } from "express";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
   
    const createTweetElement = (tweet) => {
        const { name, avatars, handle } = tweet.user;
        let userInfo = `
            <img src="${avatars}">
            <span>${name}</span><span class ="username">${handle}</span>`
               
        let safeUserInfo = $('<p>').text(tweet.content.text)
        let genericInfo = `
            <hr>
            <span class ="date">Date</span>
            <span class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
            </span>
        `
        const $tweet = $("<article>").addClass("tweet")
        let first = $tweet.append(userInfo)
        let second = first.append(safeUserInfo)
        let third = second.append(genericInfo)

        return third
    }
    const renderTweets = (tweetArray) => {
        let tweets = [];
        for (let tweet of tweetArray) {
            tweets.push(createTweetElement(tweet))
        }
        let posted = $('.tweet-container').html(tweets);
        return posted;
    }

   
       
    $(".form").submit(function(event) {
        event.preventDefault()
        console.log('submit');
        let data = $('form').serialize()
        $("#tweet-text").val(' ');
        if($('.counter').val() >= 140){
            $('.error').addClass('visible')
            $('.error').html("Please Enter Something!");
        } else if ($('.counter').val()<0){
            $('.error').addClass('visible')
            $('.error').html("Tweet Too Long!");
        } else {
            $('.counter').val(140);
            $('.error').removeClass('visible')
            $.ajax({
                url: '/tweets',
                type: "POST",
                data: data
            }).then(function(){
                console.log('success');
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
        
        loadTweets();
    
    


});
    
    
