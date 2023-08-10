$(document).ready(function () {
  var startButton = $('#startButton');
  var guessElement = $('#guess');
  var submitGuessButton = $('#submitGuess');
  var resultTextElement = $('#resultText');
  var gameContainer = $('#game');
  
  var secretNumber;
  var attempts = 0;
  var amount = 100;
  submitGuessButton.prop('disabled', true);
  gameContainer.hide();

  startButton.on('click', function () {
    startButton.prop('disabled', true);
    submitGuessButton.prop('disabled', false);
    gameContainer.show();
    secretNumber = generateSecretNumber();
    attempts = 0;
  });

  submitGuessButton.on('click', function () {
    var guess = guessElement.val();

    if (isValidGuess(guess)) {
      attempts++;
      var result = compareGuess(secretNumber, guess);
      resultTextElement.text(result);

      if (result === 'TTTT') {
        var winning = amount / attempts; // Corrected the calculation
        resultTextElement.text(`You guessed it in ${attempts} attempts! The secret number was ${secretNumber}. Congratulations, you win ${winning} $.`);
        secretNumber = generateSecretNumber();
        attempts = 0;
      }
    } else {
      resultTextElement.text("Invalid guess. Please enter a valid 4-digit number.");
    }
  });

  function generateSecretNumber() {
    var digits = new Set();
    while (digits.size < 4) {
      digits.add(Math.floor(Math.random() * 10));
    }
    return Array.from(digits).join('');
  }

  function isValidGuess(guess) {
    return /^\d{4}$/.test(guess) && guess[0] !== '0' && new Set(guess).size === 4;
  }

  function compareGuess(secret, guess) {
    var result = '';
    for (var i = 0; i < secret.length; i++) {
      if (secret[i] === guess[i]) {
        result += 'T';
      } else if (secret.includes(guess[i])) {
        result += 'V';
      }
    }
    return result;
  }
});
