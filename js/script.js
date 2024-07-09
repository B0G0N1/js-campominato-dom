// Seleziono gli elementi DOM principali
const playButton = document.getElementById('play-button');
const grid = document.getElementById('grid');

// Dichiaro le variabili globali
let squareNumber;
let squareDimension;
let arrayBomb;

// Aggiungo un listener al click sul pulsante di gioco
playButton.addEventListener('click', function() {
    grid.innerHTML = ''; // Pulisco il contenuto della griglia ogni volta che si inizia una nuova partita
    if (selectDifficulty()) {
        arrayBomb = createBomb();
        createSquare(); // Creo i quadrati se la difficoltà è stata selezionata correttamente
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
    return array;
}

// Funzione creata per pietà solo per utilizzare funzioni
function generateNumber() {
    return Math.floor(Math.random() * squareNumber) + 1;
}

// Funzione per creare i quadrati in base alla difficoltà selezionata
function createSquare() {
    for (let i = 1; i <= squareNumber; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerText = i;

        square.style.width = squareDimension + 'px'; // Imposto larghezza del quadrato
        square.style.height = squareDimension + 'px'; // Imposto altezza del quadrato

        grid.appendChild(square); // Aggiungo il quadrato alla griglia
        
        square.addEventListener('click', changeColor); // Aggiungo un listener per cambiare il colore al click
    }
}

// Funzione per selezionare la difficoltà del gioco
function selectDifficulty() {
    const difficulty = document.getElementById('game-difficulty').value;
    switch (parseInt(difficulty)) {
        case 1:
            squareNumber = 100; // Numero totale quadrati
            squareDimension = 1200 / 10; // Dimensione quadrati
            break;
        case 2:
            squareNumber = 81;
            squareDimension = 1200 / 9;
            break;
        case 3:
            squareNumber = 49;
            squareDimension = 1200 / 7;
            break;
        default:
            alert("Seleziona una difficoltà valida");
            return false; // Ritorno false se la difficoltà non è valida
    }
    return true; // Ritorno true se la difficoltà è stata selezionata correttamente
}

// Funzione per cambiare il colore del quadrato al click
function changeColor() {
    this.classList.toggle('light-blue'); // Alterno la classe per cambiare il colore del quadrato

    const cellNumber = parseInt(this.innerText);
    console.log(`Hai cliccato sulla cella numero ${cellNumber}`);

    // temp
    console.log(arrayBomb);
    if (arrayBomb.includes(cellNumber)) {
        alert("KABOOOOOOOOOM");
    }
}