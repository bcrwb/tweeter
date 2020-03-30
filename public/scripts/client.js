// import { response } from "express";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
   //Takes the tweet object and puts data into html
    const createTweetElement = (tweet) => {
        let d = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const { name, avatars, handle } = tweet.user;
        let userInfo = `
            <img src="${avatars}">
            <span>${name}</span><span class ="username">${handle}</span>`
               
        let safeUserInfo = $('<p>').text(tweet.content.text);
        let genericInfo = `
            <hr>
            <span class ="date">${days[d.getDay()]}</span>
            <span class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
            </span>
        `
        const $tweet = $("<article>").addClass("tweet")
        let first = $tweet.append(userInfo);
        let second = first.append(safeUserInfo);
        let third = second.append(genericInfo);

        return third
    }
    //Adds the new tweets to the page
    const renderTweets = (tweetArray) => {
        let tweets = [];
        for (let tweet of tweetArray) {
            tweets.push(createTweetElement(tweet));
           
        }
        tweets.reverse()
        let posted = $('.tweet-container').html(tweets);
        return posted;
    }

   
       //Posts new tweets to the database and retrieves them using AJAX
    $(".form").submit(function(event) {
        event.preventDefault()
        console.log('submit');
        let data = $('form').serialize()
       
        if($('.counter').val() >= 140){
            $('.error').addClass('visible')
            $('.error').html("Please Enter Something!");
        } else if ($('.counter').val()<0){
            $('.error').addClass('visible')
            $('.error').html("Tweet Too Long!");
        } else {
            $('.counter').val(140);
            $('.error').removeClass('visible')
            $("#tweet-text").val(' ');
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
    
        $('#compose').click(function(event){
            $('.new-tweet').toggleClass('show')
        })


});
    
    
