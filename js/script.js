// Seleziona gli elementi della pagina HTML necessari per il gioco
const playButton = document.getElementById('play-button');
const grid = document.getElementById('grid');
const result = document.getElementById('result');
const points = document.getElementById('points');

let squareNumber;
let squareDimension;
let arrayBomb;
let endGame;
let score;

// Aggiunge un evento al bottone per avviare il gioco quando viene cliccato
playButton.addEventListener('click', function() {
    reset();
    if (selectDifficulty()) {
        arrayBomb = createBomb();
        console.log(arrayBomb);
        createSquare();
    }
});

// Funzione per creare le bombe in posizioni casuali e uniche
function createBomb() {
    let array = [];
    while (array.length < 16) {
        let bomb = generateNumber();
        if (!array.includes(bomb)) {
            array.push(bomb);
        }
    }
    array.sort((a, b) => a - b);
    return array;
}

// Genera un numero casuale tra 1 e il numero totale di celle
function generateNumber() {
    return Math.floor(Math.random() * squareNumber) + 1;
}

// Crea le celle della griglia e aggiunge l'evento di click per controllare se è una bomba
function createSquare() {
    for (let i = 1; i <= squareNumber; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerText = i;
        square.style.width = `${squareDimension}px`;
        square.style.height = `${squareDimension}px`;
        grid.appendChild(square);
        square.addEventListener('click', checkBomb);
    }
}

// Seleziona la difficoltà del gioco e imposta le dimensioni della griglia e delle celle
function selectDifficulty() {
    const difficulty = document.getElementById('game-difficulty').value;
    switch (parseInt(difficulty)) {
        case 1:
            squareNumber = 100;
            squareDimension = 1200 / 10;
            break;
        case 2:
            squareNumber = 81;
            squareDimension = 1200 / 9;
            break;
        case 3:
            squareNumber = 49;
            squareDimension = 1200 / 7;
            break;
        case 4:
            squareNumber = 25;
            squareDimension = 1200 / 5;
            break;
        default:
            alert("Seleziona una difficoltà valida");
            return false;
    }
    return true;
}

// Controlla se la cella cliccata contiene una bomba o incrementa il punteggio
function checkBomb() {
    if (!endGame) {
        const cellNumber = parseInt(this.innerText);
        if (arrayBomb.includes(cellNumber)) {
            this.classList.add('red');
            result.innerText = 'GAME OVER';
            result.classList.add('gameOver');
            endGame = true;
            showBombs();
        }
        else if (!this.classList.contains('skyblue')) {
            this.classList.add('skyblue');
            score++;
            points.innerText = `SCORE: ${score}`;
            if (score === squareNumber - 16) {
                result.innerText = 'VICTORY';
                result.classList.add('victory');
                endGame = true;
            }
        }
    }
}

// Resetta lo stato del gioco per una nuova partita
function reset() {
    grid.innerHTML = '';
    endGame = false;
    result.innerText = '';
    score = 0;
    points.innerText = `SCORE: ${score}`;
}

function showBombs() {
    let squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i];
        if (arrayBomb.includes (parseInt(square.innerText))) {
            square.classList.add('red');
        }
    }
}