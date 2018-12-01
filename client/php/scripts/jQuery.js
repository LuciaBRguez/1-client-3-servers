$(document).ready(function(){
    
    // Initial state
    $('#get').hide();
    $('#post').hide();
    $('#get-id').hide();
    $('#put-id').hide();
    $('#delete-id').hide();
    
    // Click header
    $('#get-header').click(function(){
        $('#get').slideToggle();
    });
    $('#post-header').click(function(){
        $('#post').slideToggle();
    });
    $('#get-id-header').click(function(){
        $('#get-id').slideToggle();
    });
    $('#put-id-header').click(function(){
        $('#put-id').slideToggle();
    });
    $('#delete-id-header').click(function(){
        $('#delete-id').slideToggle();
    });

});