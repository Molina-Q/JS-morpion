// function qui permet de changer le tour du joueur
function switchSides() {
    if(currentSide == sideO) {
        currentSide = sideX;
    } else {
        currentSide = sideO;
    }
    switchTurnColor(currentSide);
}

function switchTurnColor(currentTurn) {
    // ajoute une classe au joueur a qui c'est le tour de jouer et l'enlève de l'autre joueur
    switch (currentTurn) {
        case "O":
            sidePlayerOne.classList.add("currentTurnO");
            sidePlayerTwo.classList.remove("currentTurnX");

            break;

        case "X":
            sidePlayerTwo.classList.add("currentTurnX");
            sidePlayerOne.classList.remove("currentTurnO");

            break;
    
        default:

            break;
    }
}

// add ou remove les div sidePlayer
function displaySidesPlayers(addOrRemove) {
    switch (addOrRemove) {
        case "show":
            sidePlayerOne.classList.add("sideOff");
            sidePlayerTwo.classList.add("sideOff");

            break;

        case "hide":
            sidePlayerOne.classList.remove("sideOff");
            sidePlayerTwo.classList.remove("sideOff");

            break;    

        default:

            break;
    }
    sidePlayerOne.classList.toggle("sideOff");
    sidePlayerTwo.classList.toggle("sideOff");
    console.log("player toggle on/off");
}

// function qui termine le jeu, fait apparaitre le btn reset et lui donne un eventListener sur clic
function gameOver(className) {
    if(alertCheck) {
        alert("Partie terminé !");
    }
    alertCheck = false;
    resetGame.classList.remove("btnTurnOff");
    resetGame.addEventListener("click", () => restartTheGame(className));
}

// function qui restart le jeu en effaçant le contenu du board, appelé lors d'un clic sur le btn reset avec l'eventListener de gameOver() 
function restartTheGame(className){
    displaySidesPlayers("hide");
    deleteElementsByClass(className);

    alertCheck = true;
    resetGame.classList.add("btnTurnOff");
    startGame.classList.remove("btnTurnOff");
}

// delete des balises en donnant leurs classes
function deleteElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

const classToDelete = [
    {
        class: "grid-item",
    },
    {
        class: "messageVictoire"
    }
];

// la base des carrés qui seront clonés
const carre = document.createElement("div");
carre.classList.add("grid-item");

// la div qui contain tout le board et la grid du morpion
const morpionBoard = document.getElementById("morpionBoard");

// les deux side dispo et le side qui joue actuellement
const sideO = "O";
const sideX = "X";
let currentSide = "O";

// bloc avec les infos de chaque player
const sidePlayerOne = document.getElementById("sidePlayerOne");
const sidePlayerTwo = document.getElementById("sidePlayerTwo");

const sideSignOne = document.createElement("p");
sideSignOne.innerHTML = "Symbole : "+sideO;
sidePlayerOne.appendChild(sideSignOne);

const sideSignTwo = document.createElement("p");
sideSignTwo.innerHTML = "Symbole : "+sideX;
sidePlayerTwo.appendChild(sideSignTwo);

// message de victoire
const victoire = document.createElement("p");
victoire.innerHTML = "GAGNE !!";
victoire.classList.add("messageVictoire");

// btn pour lancé le jeu et reset le board
const startGame = document.getElementById("btnStartGame");
const resetGame = document.getElementById("btnResetGame");

// me permet de faire passer les alert une seule fois encore de victoire avec un board complet et en cas de victoire avec deux lignes
let alertCheck = true;

// position nécessaire pour permettre à X ou O de gagner
const winningPositions = [
    // ligne vertical
    {
        posOne: 0,
        posTwo: 3,
        posThree: 6,
    },
    {
        posOne: 1,
        posTwo: 4,
        posThree: 7,
    },
    {
        posOne: 2,
        posTwo: 5,
        posThree: 8,
    },
    // ligne horizontal
    {
        posOne: 0,
        posTwo: 1,
        posThree: 2,
    },
    {
        posOne: 3,
        posTwo: 4,
        posThree: 5,
    },
    {
        posOne: 6,
        posTwo: 7,
        posThree: 8,
    },
    // ligne diagonal 
    {
        posOne: 0,
        posTwo: 4,
        posThree: 8,
    },
    {
        posOne: 2,
        posTwo: 4,
        posThree: 6,
    }
];

startGame.addEventListener("click", function() {
    const nbCarre = 9;
    let nbClicked = 1;
    currentSide = "O";
    
    displaySidesPlayers("show");
    switchTurnColor(currentSide)

    for(let i = 1; i <= nbCarre; i++) {

        startGame.classList.add("btnTurnOff");
        const carreMorpion = carre.cloneNode();
        morpionBoard.appendChild(carreMorpion);

        carreMorpion.addEventListener("click", function() {

            if(carreMorpion.classList.contains("clickedO")||carreMorpion.classList.contains("clickedX")) {
                alert("Case déjà occupée !");
            } else {
                carreMorpion.innerText = currentSide;
                carreMorpion.classList.add("clicked"+currentSide);

                winningPositions.forEach((position) => {

                    const clickedSides = document.getElementsByClassName("grid-item");

                    for (let i = 1; i < clickedSides.length; i++) {

                        if (clickedSides[position.posOne].classList.contains("clicked"+currentSide) 
                        && clickedSides[position.posTwo].classList.contains("clicked"+currentSide) 
                        && clickedSides[position.posThree].classList.contains("clicked"+currentSide)) {

                            clickedSides[position.posOne].classList.add("carreWinner");
                            clickedSides[position.posTwo].classList.add("carreWinner");
                            clickedSides[position.posThree].classList.add("carreWinner");
   
                            const win = document.getElementsByClassName("currentTurn"+currentSide);
                            for (let i = 0; i < win.length; i++) {
                                const openWin = win[i];
                                openWin.appendChild(victoire);
                            }
                            classToDelete.forEach((deletes) => {
                                gameOver(deletes.class);

                            })
                        }
                    }
                });
                
                if(nbClicked == nbCarre && alertCheck) {
                    classToDelete.forEach((deletes) => {
                        gameOver(deletes.class);
                    })
                }

                if(alertCheck) {
                    switchSides();
                    nbClicked++;
                }
            }           
        })
    }
})
