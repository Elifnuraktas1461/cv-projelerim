const fruitLevels = {
    1: ['🍎', '🍌', '🍒', '🍊'], // Seviye 1: Elma, Muz, Kiraz, Portakal
    2: ['🍎', '🍌', '🍒', '🍊', '🍓', '🍉', '🍐', '🍑'], // Seviye 2: Daha fazla meyve
    3: ['🍎', '🍌', '🍒', '🍊', '🍓', '🍉', '🍐', '🍑', '🥑', '🥝', '🍍', '🥭'] // Seviye 3: Çok daha fazla meyve
};

let gameBoard = document.querySelector('.game-board');
let movesCount = 0;
let flippedCards = [];
let matchedCards = [];
let timer;
let seconds = 0;
let minutes = 0;

function startGame(level) {
    // Clear previous game board and reset stats
    gameBoard.innerHTML = '';
    movesCount = 0;
    flippedCards = [];
    matchedCards = [];
    document.getElementById('moves').textContent = `Hamle: ${movesCount}`;
    document.getElementById('time').textContent = `Zaman: 00:00`;
    seconds = 0;
    minutes = 0;

    // Set up the board with the selected level's fruit cards
    let selectedFruits = fruitLevels[level];
    let shuffledArray = [...selectedFruits, ...selectedFruits];
    shuffledArray.sort(() => Math.random() - 0.5);

    // Create the cards dynamically
    shuffledArray.forEach(fruit => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card', fruit);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    // Adjust the grid based on level
    gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(shuffledArray.length)}, 150px)`;
    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            movesCount++;
            document.getElementById('moves').textContent = `Hamle: ${movesCount}`;
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.card === secondCard.dataset.card) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
        
        if (matchedCards.length === Object.keys(fruitLevels).reduce((acc, level) => acc + fruitLevels[level].length, 0)) {
            clearInterval(timer);
            alert(`Tebrikler! ${minutes}:${seconds < 10 ? '0' : ''}${seconds} dakikada tamamladınız.`);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        document.getElementById('time').textContent = `Zaman: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}
