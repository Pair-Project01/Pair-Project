$(document).ready(function () {
    var trunedCards = [];
    var cardCount = 6; // Total number of card pairs
    var timerInterval;
    var remainingTime = 30; // Game duration in seconds
  
    $("#startButton").on("click", function () {
      startGame();
    });
  
    function startGame() { // function for start button 
      $("#startButton").prop("disabled", true);  
      resetGame();
      createCards();
      startTimer();
    }
  
    function resetGame() {  // reset game when timeleft 30S
      clearInterval(timerInterval);
      remainingTime = 30;
      $("#timer").text(remainingTime);
      $(".memory-game").empty();
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
        if (trunedCards.length < 2 && !$(this).hasClass("card-flipped")) {
          $(this).addClass("card-flipped");
          trunedCards.push($(this));
  
          if (trunedCards.length === 2) {
            if (trunedCards[0].data("card") === trunedCards[1].data("card")) {
              setTimeout(function () {
                for (var i = 0; i < trunedCards.length; i++) {
                  trunedCards[i].addClass("card-matched");
                }
                trunedCards = [];
                checkWinner();
              }, 500);
            } else {
              setTimeout(function () {
                for (var i = 0; i < trunedCards.length; i++) {
                  trunedCards[i].removeClass("card-flipped");
                }
                trunedCards = [];
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
  
      var cardImages = [ // add images in array 
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
            alert("Time's up! Game over.");
            $("#startButton").prop("disabled", false);
          }
        }, 1000);
      }
    
      function checkWinner() {
        if ($(".card-matched").length === cardCount * 2) {
          clearInterval(timerInterval);
          alert("Congratulations! You've won!");
          $("#startButton").prop("disabled", false); 
        }
      }
    });
  