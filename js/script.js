// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// [23, 65, 1, 4,78,15,....];
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// **BONUS:**
// 1 - L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste



// Dichiarazioni
const grid = document.querySelector(".grid");
const selectLevels = document.querySelector('#levels');
const playBtn = document.querySelector('#play');
const lose = document.querySelector('#lose');
const win = document.querySelector('#win');
const points = document.querySelector('#points');

// Creo la grid
gameMode(parseInt(selectLevels.value));

playBtn.addEventListener('click', function() {
    gameMode(parseInt(selectLevels.value))
})

// Function
function gameMode(mode) {
    grid.innerHTML = ""
    let gamePlay = true;
    let classText;
    let bombs = addBombs();
    let counter = 0;
    points.innerHTML = 0;
    lose.classList.add('hidden');
    win.classList.add('hidden');


    if(mode == 100) {
        classText = "level1";
    } else if(mode == 81) {
        classText = "level2";
    } else if(mode == 49) {
        classText = "level3";
    }

    for(let i = 1; i <= mode; i++) {
        let box = document.createElement('div');
        box.classList.add(classText);
        box.classList.add('box');

        //aggiungio le caselle con le bombe
        for(b = 0; b < bombs.length; b++) {
            if(i == bombs[b]) {
            box.classList.add('bomb');
            }
        }

        box.addEventListener('click', function() {
            if(gamePlay) {
                if(this.classList.contains('bomb')) {
                    this.classList.add('bomb-clicked');
                    gamePlay = false;
                    lose.classList.remove('hidden');
                } else {
                    //mostra il numero solo se box non è ancora attiva
                    if(!this.classList.contains('clicked')) {
                        console.log(i);
                        counter++;
                    }
                    this.classList.add('clicked');
                }
                points.innerHTML = counter;
                if(counter == (mode - 16)) {
                    gamePlay = false;
                    win.classList.remove('hidden');
                }
            }
        })
        grid.append(box);
    }
}

// Array con le caselle per le bombe
function createBombs(cells) {
    let bombCelss = [];
    for(let i = 1; i <= 16; i++) {
        bombCelss.push(Math.floor(Math.random() * (cells - 1) + 1));
    }

    return bombCelss;
}

function addBombs() {
    let bombe = createBombs(parseInt(selectLevels.value));
    //se esistiono duplicati rifai l'array delle bombe finche non ce un'array senza duplicati
    while(hasDuplicate(bombe)) {
        bombe = createBombs(parseInt(selectLevels.value)); 
    } 
    //metto l'array in ordine crescente
    return bombe.sort(function(a, b) {
        return a - b;
    });
} 

// controlla se ci sono dei numeri che si ripetono in un array
function hasDuplicate(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let k = 0; k < arr.length; k++) {
            //evito che si compari con se stesso
            if(i !== k) {
                if(arr[i] == arr[k]) {
                    return true;
                }
            }
        }
    }
    return false;
}
