// function qui permet de changer le tour du joueur
function switchSides() {
    if(currentSide == playerOneSign) {
        currentSide = playerTwoSign;
    } else {
        currentSide = playerOneSign;
    }
    switchTurnColor(currentSide);
}

// ajoute une classe au joueur a qui c'est le tour de jouer et l'enlève de l'autre joueur
function switchTurnColor(currentSide) {
    let stringCurrentSide = "signIs"+currentSide;

    listPlayers.forEach((list) => {
        switch (stringCurrentSide) {
            case "signIsX":
                if(list.player.classList.contains("signIsX")) {
                    list.player.classList.add("currentTurnX");
                } else {
                    list.player.classList.remove("currentTurnO");
                }

                break;

            case "signIsO":
                if(list.player.classList.contains("signIsO")) {
                    list.player.classList.add("currentTurnO");
                } else {
                    list.player.classList.remove("currentTurnX");
                }

                break;

            default:
                break;
        }
    })
    // for (let i = 0; i < signO.length; i++) {
    //     const openSignO = signO[i]; 
    //     if (openSignO.classList.contains(stringCurSide)) {
    //         openSignO.classList.add("currentTurnO");
    //     } else {
    //         openSignO.classList.remove("currentTurnO");
    //     }     
    // }

    // for (let i = 0; i < signX.length; i++) {
    //     const openSignX = signX[i];
    //     if(openSignX.classList.contains(stringCurSide)) {
    //         openSignX.classList.add("currentTurnX");
    //     } else {
    //         openSignX.classList.remove("currentTurnX");
    //     }
    // }
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

    countScorePlayerOne ++;

    listPlayers.forEach((list) => {
        list.player.classList.remove("signIsX");
        list.player.classList.remove("signIsO");
        list.player.classList.remove("currentTurnX");
        list.player.classList.remove("currentTurnO");
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

function countPlusOne(countScore) {
    countScore = countScore + 1;
    ScorePlayerOne.innerHTML = "Score : "+countScorePlayerOne;
    ScorePlayerTwo.innerHTML = "Score : "+countScorePlayerTwo;
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

// array des class que j'utilise pour supprimer des balises html
const elementsToDelete = [
    {
        class: "grid-item",
    },
    {
        class: "messageVictoire",
    }
];

// signIsX, signIsO, currentturno, 

// liste des player
const listPlayers = [
    {
        player:sidePlayerOne,
        sign:playerOneSign,
        score:countScorePlayerOne,
        elemScore:ScorePlayerOne
    },
    {
        player:sidePlayerTwo,
        sign:playerTwoSign,
        score:countScorePlayerTwo,
        elemScore:ScorePlayerTwo
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
    while(playerOneSign != "O"&&playerOneSign != "X") {
        if(playerOneSign == "o"||playerOneSign == "x") {
            alert("Veuillez mettre le caractères en majuscule !");
            playerOneSign = prompt("O or X ?",playerOneSign);
        } else {
            alert("Choississez un caractère valide !");
            playerOneSign = prompt("O or X ?");
        }
    }
    
    playerTwoSign = prompt("Player 2 : O or X ?","X");
    while((playerTwoSign == playerOneSign) ^ (playerTwoSign != "O" && playerTwoSign != "X")) {
        console.log("p1 est :"+playerOneSign+" et p2 :"+playerTwoSign)
        if(playerTwoSign == playerOneSign) {
            alert("Ce symbole est déjà choisi");
            playerTwoSign = prompt("O or X ?",playerOneSign);
        } else {
            alert("Choississez un caractère valide !");
            playerTwoSign = prompt("O or X ?");
        }
    }
    
    sidePlayerOne.classList.add("signIs"+playerOneSign);
    sidePlayerTwo.classList.add("signIs"+playerTwoSign);

    sideSignOne.innerHTML = "Symbole : "+playerOneSign;
    sidePlayerOne.appendChild(sideSignOne);

    sideSignTwo.innerHTML = "Symbole : "+playerTwoSign;
    sidePlayerTwo.appendChild(sideSignTwo);

    sidePlayerOne.appendChild(ScorePlayerOne);
    sidePlayerTwo.appendChild(ScorePlayerTwo);

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

            if(carreMorpion.classList.contains("clickedO")||carreMorpion.classList.contains("clickedX")||carreMorpion.classList.contains("unclickable")) {
                alert("Clic invalide !");
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
   
                            const roundWinner = document.getElementsByClassName("currentTurn"+currentSide);
                            for (let i = 0; i < roundWinner.length; i++) {
                                const openRoundWinner = roundWinner[i];
                                openRoundWinner.appendChild(victoire);
                                
                            } 

                            listPlayers.forEach((list) => {
                                if(list.player.classList.contains("currentTurn"+currentSide)) {
                                    if(countCheck) {
                                        list.score += 1;
                                        countCheck = false;
                                    }

                                    window.addEventListener("click", () => {
                                        list.elemScore.innerHTML = "Score : "+list.score;
                                    })

                                    console.log("Score "+list.player+" : +1 ");
                                    console.log("Score "+list.score);
                                }
                            })

                            for (let i = 0; i < clickedSides.length; i++) {
                                const openCarreMorpion = clickedSides[i];
                                openCarreMorpion.classList.add("unclickable");                                
                            }

                            // delete takes effect only when i click on the reset btn, because of an eventListenner in gameOver()
                            elementsToDelete.forEach((deletes) => {
                                gameOver(deletes.class);                                
                            })                           
                        }
                    }
                });
                
                if(nbClicked == nbCarre && alertCheck) {
                    elementsToDelete.forEach((deletes) => {
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
