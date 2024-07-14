const startBtn = document.getElementById('startBtn');
const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

const cardImages = [
    'images/a.jpg',
    'images/b.jpg',
    'images/c.jpg',
    'images/d.jpg',
    'images/e.jpg',
    'images/f.jpg',
    'images/g.jpg',
    'images/h.jpg'
];

startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    scoreElement.innerText = 'Moves: 0';
    moves = 0;
    matchedPairs = 0;
    createCards();
    shuffleCards();
    displayCards();
}

function createCards() {
    cards = [];
    for (let img of cardImages) {
        cards.push(createCard(img));
        cards.push(createCard(img));
    }
}

function createCard(img) {
    return { img: img, flipped: false, matched: false };
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function displayCards() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = i;
        cardElement.style.backgroundImage = cards[i].flipped || cards[i].matched ? `url(${cards[i].img})` : 'none';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    }
}

function flipCard(e) {
    const index = e.target.dataset.index;
    if (cards[index].flipped || cards[index].matched) {
        return;
    }
    cards[index].flipped = true;
    flippedCards.push(index);
    displayCards();
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    moves++;
    scoreElement.innerText = `Moves: ${moves}`;
    const [firstIndex, secondIndex] = flippedCards;
    if (cards[firstIndex].img === cards[secondIndex].img) {
        cards[firstIndex].matched = true;
        cards[secondIndex].matched = true;
        matchedPairs++;
        if (matchedPairs === cardImages.length) {
            setTimeout(() => alert(`You won in ${moves} moves!`), 500);
        }
    } else {
        setTimeout(() => {
            cards[firstIndex].flipped = false;
            cards[secondIndex].flipped = false;
            displayCards();
        }, 1000);
    }
    flippedCards = [];
}
