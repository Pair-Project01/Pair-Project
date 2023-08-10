document.addEventListener('DOMContentLoaded', function () {
    var guessElement = document.getElementById('guess');
    var submitGuessButton = document.getElementById('submitGuess');
    var resultTextElement = document.getElementById('resultText');
  
  var secretNumber = generateSecretNumber();
   var attempts = 0;
  
    
    submitGuessButton.addEventListener('click', function () {
      var guess = guessElement.value;
  
      if (isValidGuess(guess)) {
        attempts++;
        var result = compareGuess(secretNumber, guess);
        resultTextElement.textContent = result;
  
        if (result === 'TTTT') {
          resultTextElement.textContent += ` You guessed it in ${attempts} attempts! The secret number was ${secretNumber}.`;
          secretNumber = generateSecretNumber();
          attempts = 0;
        }
      } else {
        resultTextElement.textContent = "Invalid guess. Please enter a valid 4-digit number.";
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
  