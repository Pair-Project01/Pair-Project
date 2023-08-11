$(document).ready(function() {
    var playerName = "";

    $('.game-container').each(function() {
        $(this).find('.button').prop('disabled', true); // desable Play Now button in this container
    });
    $('#user').prop('disabled',false);

    $('#user').click(function() {
        var inputName = $('#userName').val().trim();
        if (inputName !== "") {
            playerName = inputName;
            $('.game-container').each(function() {
                $(this).find('.button').prop('disabled', false); // Enable Play Now button in this container
            });
            $('#user').prop('disabled', true);
            $('#greeting').text("Welcome " + playerName + " To The Gambling World");
        }
    });

    $('.rating').each(function() {
        var ratingContainer = $(this);
        var resultElement = ratingContainer.next('.result');
        var ratingKey = ratingContainer.attr('id');

        var savedRating = FeedBacks[ratingKey];
        if (savedRating) {
            updateRating(savedRating);
        }

        ratingContainer.find('.heart').click(function() {
            var selectedRating = parseInt($(this).attr('data-rating'));
            FeedBacks[ratingKey] = selectedRating;
            updateRating(selectedRating);
        });

        function updateRating(selectedRating) {
            ratingContainer.find('.heart').each(function(index) {
                if (index < selectedRating) {
                    $(this).addClass('filled');
                } else {
                    $(this).removeClass('filled');
                }
            });

            resultElement.text("Rating: " + selectedRating);
        }
    });

    $('#reset').click(function() {
        playerName = "";
        $('.button').prop('disabled', true); // Disable all Play Now buttons
        $('#user').prop('disabled', false);
        $('#greeting').text("Welcome To The Gambling World");

        $('.heart').removeClass('filled');
        $('.result').text("Rating: 0");
        FeedBacks = {};
    });


    
});
