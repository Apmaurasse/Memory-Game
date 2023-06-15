const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const scoreDiv = document.getElementById("score");

let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// TODO: Implement this function!
function handleCardClick(event) {

score++;
updateScore();

if (lockBoard) return;

const clickedCard = event.target;

if (clickedCard === firstCard) return;

clickedCard.style.backgroundColor = clickedCard.classList;

if (!firstCard) {
  firstCard = clickedCard;
} else {
  secondCard = clickedCard;
  lockBoard = true;

  if (firstCard.classList.value === secondCard.classList.value) {
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    resetCards();
} else {
  setTimeout(() => {
    firstCard.style.backgroundColor = "";
    secondCard.style.backgroundColor = "";
    resetCards();
}, 1000);
}
}
}

function resetCards() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

function startGame() {
  score = 0;

  updateScore();

  gameContainer.innerHTML = "";

  let shuffledColors = shuffle(COLORS);

  createDivsForColors(shuffledColors);
}

function resetGame() {
  score = 0;
  
  updateScore();

  gameContainer.innerHTML = "";

  createDivsForColors(COLORS);
}

function updateScore() {
  scoreDiv.textContent = `Score: ${score}`;
}

// when the DOM loads
createDivsForColors(shuffledColors);
