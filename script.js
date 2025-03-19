
const cardObjectDefinitions = [
    { id: '1CLUB', imagePath: './images/cards/1CLUB.png', value: 1 },
    { id: '1DIAMOND', imagePath: './images/cards/1DIAMOND.png', value: 1 },
    { id: '1HEART', imagePath: './images/cards/1HEART.png', value: 1 },
    { id: '1SPADE', imagePath: './images/cards/1SPADE.png', value: 1 },
    { id: '2CLUB', imagePath: './images/cards/2CLUB.png', value: 2 },
    { id: '2DIAMOND', imagePath: './images/cards/2DIAMOND.png', value: 2 },
    { id: '2HEART', imagePath: './images/cards/2HEART.png', value: 2 },
    { id: '2SPADE', imagePath: './images/cards/2SPADE.png', value: 2 },
    { id: '3CLUB', imagePath: './images/cards/3CLUB.png', value: 3 },
    { id: '3DIAMOND', imagePath: './images/cards/3DIAMOND.png', value: 3 },
    { id: '3HEART', imagePath: './images/cards/3HEART.png', value: 3 },
    { id: '3SPADE', imagePath: './images/cards/3SPADE.png', value: 3 },
    { id: '4CLUB', imagePath: './images/cards/4CLUB.png', value: 4 },
    { id: '4DIAMOND', imagePath: './images/cards/4DIAMOND.png', value: 4 },
    { id: '4HEART', imagePath: './images/cards/4HEART.png', value: 4 },
    { id: '4SPADE', imagePath: './images/cards/4SPADE.png', value: 4 },
    { id: '5CLUB', imagePath: './images/cards/5CLUB.png', value: 5 },
    { id: '5DIAMOND', imagePath: './images/cards/5DIAMOND.png', value: 5 },
    { id: '5HEART', imagePath: './images/cards/5HEART.png', value: 5 },
    { id: '5SPADE', imagePath: './images/cards/5SPADE.png', value: 5 },
    { id: '6CLUB', imagePath: './images/cards/6CLUB.png', value: 6 },
    { id: '6DIAMOND', imagePath: './images/cards/6DIAMOND.png', value: 6 },
    { id: '6HEART', imagePath: './images/cards/6HEART.png', value: 6 },
    { id: '6SPADE', imagePath: './images/cards/6SPADE.png', value: 6 },
    { id: '7CLUB', imagePath: './images/cards/7CLUB.png', value: 7 },
    { id: '7DIAMOND', imagePath: './images/cards/7DIAMOND.png', value: 7 },
    { id: '7HEART', imagePath: './images/cards/7HEART.png', value: 7 },
    { id: '7SPADE', imagePath: './images/cards/7SPADE.png', value: 7 },
    { id: '8CLUB', imagePath: './images/cards/8CLUB.png', value: 8 },
    { id: '8DIAMOND', imagePath: './images/cards/8DIAMOND.png', value: 8 },
    { id: '8HEART', imagePath: './images/cards/8HEART.png', value: 8 },
    { id: '8SPADE', imagePath: './images/cards/8SPADE.png', value: 8 },
    { id: '9CLUB', imagePath: './images/cards/9CLUB.png', value: 9 },
    { id: '9DIAMOND', imagePath: './images/cards/9DIAMOND.png', value: 9 },
    { id: '9HEART', imagePath: './images/cards/9HEART.png', value: 9 },
    { id: '9SPADE', imagePath: './images/cards/9SPADE.png', value: 9 },
    { id: '10CLUB', imagePath: './images/cards/10CLUB.png', value: 10 },
    { id: '10DIAMOND', imagePath: './images/cards/10DIAMOND.png', value: 10 },
    { id: '10HEART', imagePath: './images/cards/10HEART.png', value: 10 },
    { id: '10SPADE', imagePath: './images/cards/10SPADE.png', value: 10 },
    { id: 'JCLUB', imagePath: './images/cards/JCLUB.png', value: 0 },
    { id: 'JDIAMOND', imagePath: './images/cards/JDIAMOND.png', value: 0 },
    { id: 'JHEART', imagePath: './images/cards/JHEART.png', value: 0 },
    { id: 'JSPADE', imagePath: './images/cards/JSPADE.png', value: 0 },
    { id: 'QCLUB', imagePath: './images/cards/QCLUB.png', value: 10 },
    { id: 'QDIAMOND', imagePath: './images/cards/QDIAMOND.png', value: 10 },
    { id: 'QHEART', imagePath: './images/cards/QHEART.png', value: 10 },
    { id: 'QSPADE', imagePath: './images/cards/QSPADE.png', value: 10 },
    { id: 'KCLUB', imagePath: './images/cards/KCLUB.png', value: 0 },
    { id: 'KDIAMOND', imagePath: './images/cards/KDIAMOND.png', value: 0 },
    { id: 'KHEART', imagePath: './images/cards/KHEART.png', value: 0 },
    { id: 'KSPADE', imagePath: './images/cards/KSPADE.png', value: 0 },
];

let roundCounter = 0;
let totalPlayerScore = 0;
let totalComputerScore = 0;
let playerCards = [];
let computerCards = [];
let isPlayerTurn = true;
let playerRevealedCount = 0;
let computerRevealedCount = 0;
let isRoundOver = false;

// 1. Shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// 2. Deal cards to players
function dealCards() {
    if (roundCounter >= 3) {
        endGame();
        return;
    }

    roundCounter++; // Increment the round counter
    document.querySelector('.round .badge').textContent = roundCounter; // Update the round display

    const shuffledDeck = shuffleDeck([...cardObjectDefinitions]);
    playerCards = shuffledDeck.slice(0, 6).map(card => ({ ...card, isFaceDown: true }));
    computerCards = shuffledDeck.slice(6, 12).map(card => ({ ...card, isFaceDown: true }));

    playerRevealedCount = 0;
    computerRevealedCount = 0;
    isRoundOver = false;

    displayCards(playerCards, "player1", true);
    displayCards(computerCards, "computer", true);

    isPlayerTurn = true;
    document.getElementById('result').innerText = "Player's turn! Click a card to flip it.";
}

// 3. Display cards on the screen
function displayCards(hand, playerId, isFaceDown) {
    const playerArea = document.getElementById(playerId);
    playerArea.innerHTML = "";

    hand.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const imgElement = document.createElement("img");
        imgElement.src = isFaceDown ? "./images/cardBackRed.png" : card.imagePath;
        imgElement.alt = card.id;

        if (playerId === "player1" && isFaceDown) {
            cardElement.addEventListener("click", () => flipCard(cardElement, card, index));
        }

        cardElement.appendChild(imgElement);
        playerArea.appendChild(cardElement);
    });
}

// 4. Flip a card 
function flipCard(cardElement, card, index) {
    if (!isPlayerTurn || isRoundOver) return;

    cardElement.querySelector('img').src = card.imagePath;
    card.isFaceDown = false;
    playerRevealedCount++;

    if (playerRevealedCount === 6) {
        endRound();
    } else {
        isPlayerTurn = false;
        document.getElementById('result').innerText = "Computer's turn...";
        setTimeout(computerTurn, 1000);
    }
}

// 5. Computer's turn
function computerTurn() {
    const unrevealedCards = computerCards.filter(card => card.isFaceDown);
    if (unrevealedCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * unrevealedCards.length);
        const card = unrevealedCards[randomIndex];
        card.isFaceDown = false;
        computerRevealedCount++;

        const computerArea = document.getElementById("computer");
        const computerCardElements = computerArea.querySelectorAll(".card");
        const cardIndex = computerCards.indexOf(card);

        setTimeout(() => {
            computerCardElements[cardIndex].querySelector('img').src = card.imagePath;

            if (computerRevealedCount === 6) {
                setTimeout(() => {
                    endRound();
                }, 1000);
            } else {
                isPlayerTurn = true;
                document.getElementById('result').innerText = "Player's turn! Click a card to flip it.";
            }
        }, 500);
    }
}

// 6. End the round
function endRound() {
    isRoundOver = true;
    calculateScore();

    document.getElementById('result').innerText = `Round ${roundCounter} Results: Player: ${totalPlayerScore} | Computer: ${totalComputerScore}`;

    if (roundCounter < 3) {
        document.getElementById("start-game").disabled = false;
        document.getElementById("start-game").innerText = "Start Round " + (roundCounter + 1);
    } else {
        endGame();
    }
}

// 7. Calculate scores
function calculateScore() {
    const playerScore = playerCards.reduce((sum, card) => sum + card.value, 0);
    const computerScore = computerCards.reduce((sum, card) => sum + card.value, 0);

    totalPlayerScore += playerScore;
    totalComputerScore += computerScore;
}

// 8. End the game
function endGame() {
    let winnerMessage = '';
    if (totalPlayerScore > totalComputerScore) {
        winnerMessage = "You win! 🎉";
    } else if (totalPlayerScore < totalComputerScore) {
        winnerMessage = "Computer wins! 🤖";
    } else {
        winnerMessage = "It's a tie! 🎲";
    }

    document.getElementById('result').innerText = `Game Over! ${winnerMessage} (You: ${totalPlayerScore} | Computer: ${totalComputerScore})`;
    document.getElementById("start-game").disabled = true;
    document.getElementById("start-game").innerText = "Game Over";
}
// 9. Start the game
document.getElementById("start-game").addEventListener("click", () => {
    if (roundCounter < 3) {
        dealCards();
    }
});

// End Of The Game😎