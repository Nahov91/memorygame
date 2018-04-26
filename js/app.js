/*
 * Create a list that holds all of your cards
 */
let logo = ['leaf', 'leaf', 'diamond', 'diamond', 'bicycle', 'bicycle', 'anchor', 'anchor', 'cube', 'cube', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb'];
let timer = 0;
let stars = 3;
let opened = [];
let matches = 0;
let moves = 0;
let delay = 500;
let currentTimer;
$timer = $('.timer');
second = 0;
$deck = $('.deck');
let zeroStar = 24;
let oneStar = 16;
let twoStar = 8;
let threeStar = 2;
$numOfMoves = $('.moves');
$numOfStars = $('.fa-star');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Game Base
function gameBase() {
  let cards = shuffle(logo);
  $deck.empty();
  matches = 0;
  moves = 0;
  for (var i = 0; i < cards.length; i++) {
    $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
  }

  resetTimer(currentTimer);
  second = 0;
  addFlippedCard();
  $timer.text(`${second}`)
  time();
  $numOfMoves.text('0');
}

//Check if there is a match after two card is opened
function compareOpen() {

  if (opened.length == 2) {
    let cardOne = $(opened[0]).children().attr('class');
    let cardTwo = $(opened[1]).children().attr('class');

    if (cardOne === cardTwo) {
      opened[0].addClass('match') && opened[1].addClass('match');
      opened = [];
      matches++;

    } else {
      setTimeout(function() {
        opened[0].removeClass('show open') && opened[1].removeClass('show open');
        opened = [];

      }, delay / 0.5);
      moves++;
      scoring(moves);
      $numOfMoves.html(moves);
    }
  }
};


// Flipping cards and adding them to opened
function addFlippedCard() {
  var $card = $('.card');

  $card.bind('click', function() {
    $flippedCard = $(this).addClass('card open show');
    opened.push($flippedCard);
    compareOpen();
  })
};

//Scoring system
function scoring(moves) {
  let rating = 3;
  if (moves > twoStar && moves < oneStar) {
    $numOfStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
    rating = 2;
  } else if (moves > oneStar && moves < zeroStar) {
    $numOfStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 1;
  } else if (moves > zeroStar) {
    $numOfStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
    rating = 0;
  }

  return {
    score: rating
  };
};


//Game Won



//Start time and reset time functions
function time() {
  currentTimer = setInterval(function() {
    $timer.text(`${second}`)
    second = second + 1
  }, 1000);
}

function resetTimer(timer) {
  if (timer) {
    clearInterval(timer);
  }
}


gameBase();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
