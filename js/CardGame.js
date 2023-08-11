$(document).ready(function () {
  var turnedCards = [];
  var cardCount = 6; // Total number of card pairs
  var timerInterval;
  var remainingTime = 15; // Game duration in seconds

  $("#startButton").on("click", function () {
    startGame();
  });

  function startGame() {
    $("#startButton").prop("disabled", true);
    resetGame();
    createCards();
    startTimer();
  }

  function resetGame() {
    clearInterval(timerInterval);
    remainingTime = 15;
    $("#timer").text(remainingTime);
    $(".memory-game").empty();
    $("#withdrawButton").prop("disabled", true); // Disable the Withdraw button at the start of the game
  }
 
  function createCards() {
    var cardArray = [];

    for (var i = 1; i <= cardCount; i++) {
      cardArray.push(createCard(i));
      cardArray.push(createCard(i));
    }

    randomArray(cardArray);

    var memoryGame = $(".memory-game");
    for (var i = 0; i < cardArray.length; i++) {
      memoryGame.append(cardArray[i]);
    }

    $(".card").on("click", function () {
      if (turnedCards.length < 2 && !$(this).hasClass("card-flipped")) {
        $(this).addClass("card-flipped");
        turnedCards.push($(this));

        if (turnedCards.length === 2) {
          if (turnedCards[0].data("card") === turnedCards[1].data("card")) {
            setTimeout(function () {
              for (var i = 0; i < turnedCards.length; i++) {
                turnedCards[i].addClass("card-matched");
              }
              turnedCards = [];
              checkWinner();
            }, 500);
          } else {
            setTimeout(function () {
              for (var i = 0; i < turnedCards.length; i++) {
                turnedCards[i].removeClass("card-flipped");
              }
              turnedCards = [];
            }, 1000);
          }
        }
      }
    });
  }

  function createCard(cardNumber) {
    var card = document.createElement("div");
    card.className = "card";
    card.dataset.card = cardNumber;

    var cardInner = document.createElement("div");
    cardInner.className = "card-inner";

    var cardFront = document.createElement("div");
    cardFront.className = "card-front";
    cardFront.innerHTML = `<img src="/image/CardImage/logo.jpg" alt="Logo" class="card-image" style="max-width: 100px; max-height: 200px;">`;

    var cardBack = document.createElement("div");
    cardBack.className = "card-back";

    var cardImages = [
      "/image/CardImage/1.png",
      "/image/CardImage/2.png",
      "/image/CardImage/3.jpg",
      "/image/CardImage/4.jpg",
      "/image/CardImage/5.jpg",
      "/image/CardImage/6.jpg",
    ];

    var selectedImage = cardImages[cardNumber - 1];

    cardBack.innerHTML = `<img src="${selectedImage}" alt="Card ${cardNumber}" class="card-image">`;

    card.appendChild(cardInner);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    return card;
  }

  function randomArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      remainingTime--;
      $("#timer").text(remainingTime);


      if (remainingTime === 0) {
        clearInterval(timerInterval);
        alert("Time's up! Game over, to get more 5 seconds Watch Video bellow : watch ads");
        $("#startButton").prop("disabled", true);
        


      }
    }, 1000);
  }

  function checkWinner() {
    if ($(".card-matched").length === cardCount * 2) {
      clearInterval(timerInterval);
      alert("Congratulations! You've won 6$!");
      $("#startButton").prop("disabled", false);
      $("#withdrawButton").prop("disabled", false); // Enable the Withdraw button when you win

      if (!$('#withdrawButton').data('clicked')) {
        $("#withdrawButton").on("click", function () {
          withdraw();
        });
        $('#withdrawButton').data('clicked', true);
      }
    }
  }

  function withdraw() {
    alert("You have successfully withdrawn $6.");
    $("#withdrawButton").prop("disabled", true);  // Disable the Withdraw button after withdrawal
  }
});
