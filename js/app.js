//Creating a list of cards (logos) and setting basic variables and selectors
let logo = ['leaf', 'leaf', 'diamond', 'diamond', 'bicycle', 'bicycle', 'anchor', 'anchor', 'cube', 'cube', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb'];
let timer = 0;
let opened = [];
let matches = 0;
let moves = 0;
let delay = 500;
let currentTimer;
let timeStarted = false;
$timer = $('.timer');
second = 0;
$card = $('.card');
$deck = $('.deck');
$restart = $('.restart');
deckSize = logo.length / 2;
let oneStar = 16;
let twoStar = 8;
$numOfMoves = $('.moves');
$numOfStars = $('.fa-star');


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

//Game Base, that shuffles and shows cards
function gameBase() {
  let cards = shuffle(logo);
  $deck.empty();
  matches = 0;
  moves = 0;
  timeStarted = false;
  for (var i = 0; i < cards.length; i++) {
    $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
  }
  resetTimer(currentTimer);
  opened = [];
  $('.fa-star-o').removeClass('fa-star-o').addClass('fa-star');
  second = 0;
  addFlippedCard();
  $timer.text(`${second}`);
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
      moves++;
      scoring(moves);
      $numOfMoves.html(moves);

    } else {
      setTimeout(function() {
        opened[0].removeClass('show open') && opened[1].removeClass('show open');
        opened = [];

      }, delay / 2.5);
      moves++;
      scoring(moves);
      $numOfMoves.html(moves);
    }
    if (deckSize === matches) {
      scoring(moves);
      let score = scoring(moves).score;
      setTimeout(function() {
        gameWon(moves, score);
      }, 400);
      clearInterval(timer);
    }
  }
}


// Flipping cards and adding them to opened
function addFlippedCard() {
  $card = $('.card');
  $card.bind('click', function() {
    $flippedCard = $(this).addClass('card open show');
    opened.push($flippedCard);
    compareOpen();
  });
}

//Scoring system with stars at top based on counting of moves
function scoring(moves) {
  let rating = 3;
  if (moves > twoStar && moves < oneStar) {
    $numOfStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
    rating = 2;
  } else if (moves > oneStar) {
    $numOfStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 1;
  }

  return {
    score: rating
  };
}


//Game Won popup and function
function gameWon(moves, score) {
  swal({
    title: 'You won!',
    text: 'In ' + moves + ' moves and ' + second + ' seconds with a rating of ' + score + ' stars!',
    type: 'success',
    confirmButtonText: 'Play Again!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      gameBase();
    }
  });
  stopTimer();
}


//Timer functions
if (!timeStarted) {
  startTimer();
  timeStarted = true;
}

function startTimer() {
  $deck.one('click', function time() {
    currentTimer = setInterval(function() {
      $timer.text(`${second}`);
      second = second + 1;
    }, 1000);
  });
}



function resetTimer(timer) {
  if (timer) {
    clearInterval(timer);
  }
}

function stopTimer(timer) {
  second = 0;
  clearInterval(currentTimer);
  second.innerHTML = '0';
}


//Reset game function and popup
$restart.bind('click', function() {
  swal({
    title: 'Are you sure you want to restart?',
    text: 'Your progress will be lost!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sure!'
  }).then(function(isConfirm) {
    if (isConfirm) {
      gameBase();
    }
  });
});


gameBase();
