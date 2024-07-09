const playButton = document.getElementById('play-button');
const grid = document.getElementById('grid');
const result = document.getElementById('result');
const points = document.getElementById('points');

let squareNumber;
let squareDimension;
let arrayBomb;
let endGame;
let score = 0;

playButton.addEventListener('click', function() {
    reset();
    if (selectDifficulty()) {
        arrayBomb = createBomb();
        console.log(arrayBomb);
        createSquare();
    }
});

function createBomb() {
    let array = [];
    while (array.length < 16) {
        let bomb = generateNumber();
        if (!array.includes(bomb)) {
            array.push(bomb);
        }
    }
    array.sort(function(a, b) {
        return a - b;
    });
    return array;
}

function generateNumber() {
    return Math.floor(Math.random() * squareNumber) + 1;
}

function createSquare() {
    for (let i = 1; i <= squareNumber; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerText = i;
        square.style.width = squareDimension + 'px';
        square.style.height = squareDimension + 'px';
        grid.appendChild(square);
        square.addEventListener('click', checkBomb);
    }
}

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

function checkBomb() {
    if (!endGame) {
        const cellNumber = parseInt(this.innerText);
        if (arrayBomb.includes(cellNumber)) {
            this.classList.add('red');
            result.innerText = 'GAME OVER';
            result.classList.add('gameOver');
            endGame = true;
        }
        else if (!this.classList.contains('skyblue')) {
            this.classList.add('skyblue');
            score++;
            points.innerText = `SCORE: ${score}`;
            if (score == squareNumber - 16) {
                result.innerText = 'VICTORY';
                result.classList.add('victory');
                endGame = true;
            }
        }
    }
}

function reset() {
    grid.innerHTML = '';
    endGame = false;
    result.innerText = '';
    points.innerText = `SCORE: 0`;
}

function showSquare() {
    
}