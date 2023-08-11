$(document).ready(function() {
    $('.rating').each(function() {
        let selectedRating = 0;
        let ratingContainer = $(this);
        let resultElement = ratingContainer.next('.result');

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
