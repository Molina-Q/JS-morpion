// function qui permet de changer le tour des joueurs
function switchSides() {
    if(currentSide == playerOneSign) {
        currentSide = playerTwoSign;
    } else {
        currentSide = playerOneSign;
    }
    switchTurnColor(currentSide);
}

// ajoute une classe au joueur dont c'est le tour de jouer et l'enlève de l'autre joueur
function switchTurnColor(currentSide) {
    listPlayers.forEach((list) => {
        switch (currentSide) {
            case "X":
                if(list.name.sign == "X") {
                    list.name.player.classList.add("currentTurnX");
                } else {
                    list.name.player.classList.remove("currentTurnO");
                }

                break;

            case "O":
                if(list.name.sign == "O") {
                    list.name.player.classList.add("currentTurnO");
                } else {
                    list.name.player.classList.remove("currentTurnX");
                }

                break;

            default:
                break;
        }
    })
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
}

// function qui termine le jeu, fait apparaitre le btn reset et lui donne un eventListener sur clic
function gameOver() {
    if(alertCheck) {
        alert("Partie terminé !");
    }
    alertCheck = false;
    alertCheck = false;
    resetGame.classList.remove("btnTurnOff");
    resetGame.addEventListener("click", () => restartTheGame());
}

// function qui restart le jeu en effaçant le contenu du board, appelé lors d'un clic sur le btn reset avec l'eventListener de gameOver() 
function restartTheGame(){
    displaySidesPlayers("hide");

    listPlayers.forEach((list) => {
        list.name.player.classList.remove("currentTurnX");
        list.name.player.classList.remove("currentTurnO");
    })

    alertCheck = true;
    countCheck = true;

    resetGame.classList.add("btnTurnOff");
    startGame.classList.remove("btnTurnOff");
}

// delete des balises en utilisants les tring de l'array classToDelete
function deleteElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// la base des carrés qui seront clonés
const carre = document.createElement("div");
carre.classList.add("grid-item");

// la div qui contain tout le board et la grid du morpion
const morpionBoard = document.getElementById("morpionBoard");

// sign du side en train de jouer
let currentSide;

//////////////////// bloc avec les infos player 1 ////////////////////
//div
const sidePlayerOne = document.getElementById("sidePlayerOne");

// <p> 'player 1' -> dans le future u username
const textPlayerOne = document.createElement("p");
textPlayerOne.innerHTML = "Player 1";
sidePlayerOne.appendChild(textPlayerOne);

// variable dans laquel je stock le symbole du player 1
let playerOneSign;

// <p> dans lequel j'ecris le symbole choisi par le player 1
const sideSignOne = document.createElement("p");

// variable que j'utilise comme compteur pour avoir le score du player 1
let countScorePlayerOne = 0;

// element html pour afficher le score du player 1
const ScorePlayerOne = document.createElement("p");
ScorePlayerOne.classList.add("scorePlayer");
ScorePlayerOne.innerHTML = "Score : "+countScorePlayerOne;

//////////////////// bloc avec les infos player 2 ////////////////////
//div
const sidePlayerTwo = document.getElementById("sidePlayerTwo");

// <p> 'player 2' -> dans le future u username
const textPlayerTwo = document.createElement("p");
textPlayerTwo.innerHTML = "Player 2";
sidePlayerTwo.appendChild(textPlayerTwo);

// variable dans laquel je stock le symbole du player 2
let playerTwoSign;

// <p> dans lequel j'ecris plus tard le symbole choisi par le player 2
const sideSignTwo = document.createElement("p");

// variable que j'utilise comme compteur pour avoir le score du player 2
let countScorePlayerTwo = 0;

// element html pour afficher le score du player 2
const ScorePlayerTwo = document.createElement("p");
ScorePlayerTwo.classList.add("scorePlayer");
ScorePlayerTwo.innerHTML = "Score : "+countScorePlayerTwo;

// nb de carré dans le plateau
const nbCarre = 9;

// array des class que j'utilise pour supprimer des balises html
const elementsToDelete = [
    {
        class: "grid-item",
    },
    {
        class: "messageVictoire",
    }
];

// object playerOne, playerTwo et la list des player,  
const playerOne = {
    player: sidePlayerOne,
    sign: playerOneSign,
    score: countScorePlayerOne,
    elemScore: ScorePlayerOne,

    getScore(){
        return this.score;
    },
    setScore(nvScore){
        this.score = nvScore;
        countScorePlayerOne = this.score;
    },
    setSign(sign) {
        this.sign = sign;  
    }
};

const playerTwo = {
    player: sidePlayerTwo,
    sign: playerTwoSign,
    score: countScorePlayerTwo,
    elemScore: ScorePlayerTwo,

    getScore() {
        return this.score;
    },
    setScore(nvScore){
        this.score = nvScore;     
        countScorePlayerTwo = this.score;      
    },  
    setSign(sign) {
        this.sign = sign;  
    }
};


// liste des player
const listPlayers = [
    {
        name: playerOne
    },

    {
        name: playerTwo
    }
];


// message de victoire
const victoire = document.createElement("p");
victoire.innerHTML = "GAGNE !!";
victoire.classList.add("messageVictoire");

// btn pour lancé/relancé le jeu et reset le board
const startGame = document.getElementById("btnStartGame");
const resetGame = document.getElementById("btnResetGame");

// me permet de faire passer les alert une seule fois en cas de victoire avec un board complet ou en cas de victoire avec deux lignes gagnantes
let alertCheck = true;

// me permet d'être sur que le score n'augmente que d'un point par partie
let countCheck = true;

// score total des deux player
let countScoreTotal;

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


// le jeu commence
startGame.addEventListener("click", function() {

    playerOneSign = prompt("Player 1 : O or X ?","O");
    while(playerOneSign != "O" && playerOneSign != "X") {
        if(playerOneSign == "o"||playerOneSign == "x") {
            alert("Veuillez mettre le caractères en majuscule !");
            playerOneSign = prompt("O or X ?",playerOneSign);
        } else {
            alert("Choississez un caractère valide !");
            playerOneSign = prompt("O or X ?");
        }
    }
    playerOne.setSign(playerOneSign);
    
    playerTwoSign = prompt("Player 2 : O or X ?","X");
    while((playerTwoSign == playerOneSign) ^ (playerTwoSign != "O" && playerTwoSign != "X")) {
        if(playerTwoSign == playerOneSign) {
            alert("Ce symbole est déjà choisi");
            playerTwoSign = prompt("O or X ?");

        } else if(playerTwoSign == "o"||playerTwoSign == "x") {
            alert("Veuillez mettre le caractères en majuscule !");
            playerTwoSign = prompt("O or X ?",playerTwoSign);

        } else {
            alert("Choississez un caractère valide !");
            playerTwoSign = prompt("O or X ?");
        }
    }
    playerTwo.setSign(playerTwoSign);

    sideSignOne.innerHTML = "Symbole : "+playerOneSign;
    sidePlayerOne.appendChild(sideSignOne);

    sideSignTwo.innerHTML = "Symbole : "+playerTwoSign;
    sidePlayerTwo.appendChild(sideSignTwo);

    sidePlayerOne.appendChild(ScorePlayerOne);
    sidePlayerTwo.appendChild(ScorePlayerTwo);

    let nbClicked = 1;

    currentSide = prompt("Quel symbole va commencer ?","O");
    while(currentSide != "O" && currentSide != "X") {
        alert("Symbole invalide !");
        currentSide = prompt("Quel symbole va commencer ?","O");
    }

    displaySidesPlayers("show");

    switchTurnColor(currentSide)

    startGame.classList.add("btnTurnOff");

    for(let i = 1; i <= nbCarre; i++) {

        const carreMorpion = carre.cloneNode();
        morpionBoard.appendChild(carreMorpion);

        carreMorpion.addEventListener("click", function() {

            if(carreMorpion.classList.contains("clickedO")||carreMorpion.classList.contains("clickedX")||carreMorpion.classList.contains("unclickable")) {
                alert("Clic invalide !");
            } else {
                carreMorpion.innerHTML = currentSide;
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
   
                            const roundWinner = document.getElementsByClassName("currentTurn"+currentSide);
                            for (let i = 0; i < roundWinner.length; i++) {
                                const openRoundWinner = roundWinner[i];
                                openRoundWinner.appendChild(victoire);                                
                            } 

                            listPlayers.forEach((list) => {
                                if(list.name.player.classList.contains("currentTurn"+currentSide) && countCheck) {
                                    countCheck = false;   
                                    list.name.setScore(list.name.getScore() + 1);    

                                    if((playerOne.getScore() + playerTwo.getScore()) == 2) {
                                        highestScore = Math.max(playerOne.getScore(), playerTwo.getScore());

                                        if(list.name.getScore() == highestScore) {
                                            alert(list.name.sign+" à gagné la partie avec le plus de points !")
                                        }
                                    }

                                    window.addEventListener("click", () => {
                                        list.name.elemScore.innerHTML = "Score : "+list.name.getScore();
                                    })
                                }
                            })

                            const openCarreMorpion = clickedSides[i];
                            openCarreMorpion.classList.add("unclickable");                                

                            // delete takes effect only when i click on the reset btn, because of an eventListenner in gameOver()
                            elementsToDelete.forEach((deletes) => {
                                resetGame.addEventListener("click", () => deleteElementsByClass(deletes.class));                           
                            })                           
                            gameOver();    
                        }
                    }
                });
                
                if(nbClicked == nbCarre && alertCheck) {
                    elementsToDelete.forEach((deletes) => {
                        resetGame.addEventListener("click", () => deleteElementsByClass(deletes.class));
                    })
                    gameOver();
                }

                if(alertCheck) {
                    switchSides();
                    nbClicked++;
                }
            }           
        })
    }
})
