const cardsCollection = [{
    name: 'clown',
    img: 'img/pepe-clown.jpg'
  },
  {
    name: 'ducks',
    img: 'img/pepe-ducks.jpg'
  },
  {
    name: 'rofl',
    img: 'img/pepe-rofl.jpg'
  },
  {
    name: 'rofl-2',
    img: 'img/pepe-rofl-2.jpg'
  },
  {
    name: 'neo',
    img: 'img/pepe-neo.jpg'
  },
  {
    name: 'scientist',
    img: 'img/pepe-scientist.jpg'
  },
  {
    name: 'swag',
    img: 'img/pepe-swag.jpg'
  },
  {
    name: 'pocket',
    img: 'img/pepe-pocket.jpg'
  },
  {
    name: 'clown-2',
    img: 'img/pepe-clown-2.jpg'
  },
  {
    name: 'dude',
    img: 'img/pepe-dude.jpg'
  },
  {
    name: 'ilum',
    img: 'img/pepe-ilum.jpg'
  },
  {
    name: 'shark',
    img: 'img/pepe-shark.jpg'
  },
  {
    name: 'yoda',
    img: 'img/pepe-yoda.jpg'
  },
  {
    name: 'star',
    img: 'img/pepe-star.jpg'
  },
  {
    name: 'stretch',
    img: 'img/pepe-stretch.jpg'
  },
  {
    name: 'uzi',
    img: 'img/pepe-uzi.jpg'
  },
];

console.log(cardsCollection.length);

//variables
const grid = document.querySelector('.cards-container');
const selectPairsCount = document.querySelector('#select-pairs');
const resultDisplay = document.querySelector('#result');
const btn = document.querySelector('#btn-reset').addEventListener('click', updateBoard);

let playingPairs;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsChosen = [];
let cardsWon = [];

selectPairsCount.addEventListener('change', updateBoard);

function createBoard() {

  grid.classList.remove('fade');
  setTimeout(() => {
    grid.classList.add('fade');
  }, 200);

  let pairsCount = selectPairsCount.value;
  let gameDifficulty = selectPairsCount.selectedOptions[0].text;
  let selectedCards = shuffleCards(cardsCollection).slice(0, pairsCount);

  switch (gameDifficulty) {
    case 'Easy':
      grid.style.width = '700px';
      grid.style.gridTemplateColumns = 'repeat(8, 1fr)';
      break;
    case 'Medium':
      grid.style.width = '1050px';
      grid.style.gridTemplateColumns = 'repeat(12, 1fr)';
      break;
    case 'Hard':
      grid.style.width = '1550px';
      grid.style.gridTemplateColumns = 'repeat(16, 1fr)';
      break;
    default:
  }

  playingPairs = [...selectedCards, ...selectedCards];

  shuffleCards(playingPairs);

  for (let i = 0; i < playingPairs.length; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-name', playingPairs[i].name);
    let frontFace = document.createElement('img');
    frontFace.classList.add('front-face');
    frontFace.setAttribute('src', playingPairs[i].img);
    card.appendChild(frontFace);
    let backFace = document.createElement('img');
    backFace.classList.add('back-face');
    backFace.setAttribute('src', 'img/back.png');
    card.appendChild(backFace);
    grid.appendChild(card);
  }

  if (grid.hasChildNodes()) {
    grid.childNodes.forEach(card => card.addEventListener('click', flipCard));
  }
}

function resetBoard() {
  resultDisplay.textContent = 0;
  cardsWon = [];

  grid.childNodes.forEach(card => card.removeEventListener('click', flipCard));

  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
}

function updateBoard() {
  clearBoard();
  resetBoard();
  createBoard();
}

function flipCard() {
  if (lockBoard) return;
  if (this === cardsChosen[0]) return;
  this.classList.toggle('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    cardsChosen.push(this);
    return;
  }

  hasFlippedCard = false;
  cardsChosen.push(this);

  checkForMatch();
}

function checkForMatch() {
  let isMatch = cardsChosen[0].dataset.name === cardsChosen[1].dataset.name;

  if (isMatch) {
    cardsChosen.forEach(item => cardsWon.push(item));
    disableCards();
  } else {
    unflipCards();
  }

  if (cardsWon.length === playingPairs.length) {
    resultDisplay.textContent = 'You win! :)';
  } else {
    resultDisplay.textContent = String(cardsWon.length);
  }
}

function disableCards() {
  cardsChosen.forEach(card => card.removeEventListener('click', flipCard));

  clearBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    cardsChosen.forEach(card => card.classList.remove('flip'));

    clearBoard();
  }, 800);
}

function clearBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  cardsChosen = [];
}


function shuffleCards(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

createBoard();