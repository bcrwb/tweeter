$(document).ready(function() {
    let count = $(this).val().length;
    let updatedCount = 0;
    $("#tweet-text").keydown(function(event){
        if(event.key !== 'Backspace'){
        count++
        } else if(count > 0) {
        count--
        }
        updatedCount = 140 - count
       let counter = $(this).parents('form').find('.counter')
       counter.text((updatedCount));
       if(updatedCount < 0){
            counter.addClass('red');
       } else if(updatedCount >= 0){
           counter.removeClass('red');
       }
    })
   
  });

