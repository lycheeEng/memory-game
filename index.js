// TODOs
//  Add 'Win' windows

// const cards = document.querySelectorAll('.memory-card');
const resetBtn = document.querySelector('.btn-reset');

function randomCards(card, length) {
    const cardPos = Math.floor(Math.random() * length);
    card.style.order = cardPos;
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? resetCards() : unflippedCards();
}

function resetCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflippedCards() {
    lockBoard = true;

    setTimeout(() => {
        if (firstCard && secondCard) {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }

        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = lockBoard = false;
    firstCard = secondCard = null;
}

function initGame() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        if (card.classList) card.classList.remove('flip');
        randomCards(card, cards.length);
        card.addEventListener('click', flipCard);
    });
    resetBoard();
}

initGame();

resetBtn.addEventListener('click', () => initGame());