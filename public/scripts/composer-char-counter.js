$(document).ready(function() {
    
    $("#tweet-text").keyup(function(event){
        let count = $(this).val().length;
    let updatedCount = 140;
        if(updatedCount){
            updatedCount -= count
        }
        let counter = $(this).parents('form').find('.counter')
       counter.text((updatedCount));
       if(updatedCount < 0){
            counter.addClass('red');
       } else if(updatedCount >= 0){
           counter.removeClass('red');
       }
    })
   
  });

