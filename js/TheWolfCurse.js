$(document).ready(function() {
    var interval = null;
    var gameStarted = false;
    var highlightedCellIndex = null;
    var amount = 0;

    function highlightCell(index) {
        $('.cell').eq(index).addClass('highlighted');
        $('.cell.spinnable').eq(index).addClass('spinning');
    }

    function unhighlightCell(index) {
        $('.cell').eq(index).removeClass('highlighted spinning');
    }

    function enlargeCell(index) {
        $('.cell').eq(index).css({
            'background-color': 'yellow',
            'transform': 'scale(1.2)',
            'transition': 'all 0.2s linear'
        });
    }

    function shrinkCell(index) {
        $('.cell').eq(index).css({
            'background-color': '#f0f0f0',
            'transform': 'none',
            'transition': 'none'
        });
    }

    function getRandomCellIndex() {
        return Math.floor(Math.random() * 9);
    }

    function updateAmount(change) {
        amount = change;
        $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
        if (amount <= 0) {
            $('#spinButton').prop('disabled', true);
        }
    }

    function startGame() {
        if (!gameStarted) {
            var enteredAmount = parseInt($('#amountInput').val());
            if (enteredAmount >= 10) {
                amount = enteredAmount;
                $('#amountInput').val('Playing');
                $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
                gameStarted = true;
                highlightedCellIndex = getRandomCellIndex();
                interval = setInterval(function() {
                    unhighlightCell(highlightedCellIndex);
                    shrinkCell(highlightedCellIndex);
                    highlightedCellIndex = getRandomCellIndex();
                    highlightCell(highlightedCellIndex);
                    enlargeCell(highlightedCellIndex);
                }, 200);

                $('#startButton').prop('disabled', true);
                $('#spinButton').prop('disabled', true);
                $('#stopButton').prop('disabled', false);
                $('#withdrawButton').prop('disabled', true);
            } else {
                alert('Please enter an amount equal to or greater than 10 to start the game.');
            }
        } else {
            startGame();
        }
    }

    function stopGame() {
        clearInterval(interval);
        unhighlightCell(highlightedCellIndex);
        enlargeCell(highlightedCellIndex);

        var lastBoxImg = $('.cell').eq(highlightedCellIndex).find('img').attr('src');

        if (lastBoxImg === 'TWC images/2.jpg') {
            updateAmount(amount * 2);
            $('#resultat').text("Great you Doubled Your Money");
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
        } else if (lastBoxImg === 'TWC images/téléchargement (1).jpg') {
            updateAmount(amount / 2);
            $('#resultat').text("Oops The Wolf Took Half Of Your Money");
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
        } else if (lastBoxImg === 'TWC images/5.jpg') {
            updateAmount(amount * 5);
            $('#resultat').text("Great you Increased Your Money Five times");
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
        } else if (lastBoxImg === 'TWC images/logo.jpeg') {
            amount = 0;
            $('#resultat').text("You Have Been Cursed By The Wolf hahah");
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
        } else if (lastBoxImg === 'TWC images/5.jpeg') {
            updateAmount(amount - 5);
            $('#resultat').text("Oops The Wolf Took 5$ Of Your Money");
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
        } else if (lastBoxImg === 'TWC images/10.png') {
            updateAmount(amount * 10);
            $('#resultat').text("You Increased Your Money Ten times");
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
        }

        if (amount <= 0) {
            clearInterval(interval);
            gameStarted = false;
            $('#resultat').text("Game Over - You Have Been cursed By The Wolf hahah");
            $('#startButton').prop('disabled', true);
            $('#spinButton').prop('disabled', true);
            $('#stopButton').prop('disabled', true);
            $('#withdrawButton').prop('disabled', true);

            $('#amountInput').val('');
            amount = 0;
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');

            $('#startButton').prop('disabled', false);
        } else {
            $('#startButton').prop('disabled', false);
            $('#spinButton').prop('disabled', false);
            $('#stopButton').prop('disabled', true);
            $('#withdrawButton').prop('disabled', false);
        }
    }

    $('#startButton').on('click', function() {
        startGame();
    });

    $('#stopButton').on('click', function() {
        stopGame();
    });

    $('#spinButton').on('click', function() {
        if (gameStarted && amount > 0) {
            unhighlightCell(highlightedCellIndex);
            shrinkCell(highlightedCellIndex);
            highlightedCellIndex = getRandomCellIndex();
            interval = setInterval(function() {
                unhighlightCell(highlightedCellIndex);
                shrinkCell(highlightedCellIndex);
                highlightedCellIndex = getRandomCellIndex();
                highlightCell(highlightedCellIndex);
                enlargeCell(highlightedCellIndex);
            }, 200);
            $('#spinButton').prop('disabled', true);
            $('#stopButton').prop('disabled', false);
            $('#startButton').prop('disabled', true);
            $('#withdrawButton').prop('disabled', true);
        }
    });

    $('#withdrawButton').on('click', function() {
        if (gameStarted) {
            $('#resultat').text("You have withdrawn " + amount + " $. Thanks for playing!");
            amount = 0;
            $('#yourMoney').text('Your Current Amount: ' + amount + ' $');
            clearInterval(interval);
            gameStarted = false;
            $('#startButton').prop('disabled', false);
            $('#spinButton').prop('disabled', true);
            $('#stopButton').prop('disabled', true);
            $('#withdrawButton').prop('disabled', true);
        }
    });
});
