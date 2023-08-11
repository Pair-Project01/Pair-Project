$(document).ready(function() {
    $('.rating').each(function() {
        var selectedRating = 0;
        var ratingContainer = $(this);
        var resultElement = ratingContainer.next('.result');

        ratingContainer.find('.heart').click(function() {
            selectedRating = parseInt($(this).attr('data-rating'));
            updateRating();
        });

        function updateRating() {
            ratingContainer.find('.heart').each(function(index) {
                if (index < selectedRating) {
                    $(this).addClass('filled');
                } else {
                    $(this).removeClass('filled');
                }
            });

            resultElement.text(`Rating: ${selectedRating}`);
        }
    });
});
