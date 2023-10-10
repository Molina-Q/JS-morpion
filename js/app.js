// function qui permet de changer le tour des joueurs
function switchSides() {
    if(currentSign == playerOneSign) {
        currentSign = playerTwoSign;
    } else {
        currentSign = playerOneSign;
    }
    switchTurnColor(currentSign);
}

// ajoute une classe au joueur dont c'est le tour de jouer et l'enlève de l'autre joueur
function switchTurnColor(currentSign) {
    listPlayers.forEach((list) => {
        switch (currentSign) {
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

// converti le symbole "X" ou "O" par l'icon qui représente le symbole
function convertStringToIcon(stringToConvert) {
    switch (stringToConvert) {
        case "X":
            return "<i class='fa-solid fa-xmark'></i>";
            break;

        case "O":
            return "<i class='fa-regular fa-circle'></i>";
            break;

        default:
            break;
    }
}

// fait apparaitre ou disparaitre les div sidePlayer
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
        alert("Round terminé !");
    }
    alertCheck = false;
    countLine = 0; 
    resetGame.classList.remove("btnTurnOff");
    resetGame.addEventListener("click", () => restartTheGame());
}

// function qui remet le board à zéro, en fonction si la partie est terminée ou non
function restartTheGame(){
    displaySidesPlayers("hide");

    listPlayers.forEach((list) => {
        list.name.player.classList.remove("currentTurnX");
        list.name.player.classList.remove("currentTurnO");
    })

    // tant que la var est false le score ne sera pas remis à zéro
    if(gameIsFinished) {
        playerOne.setScore(0);
        playerTwo.setScore(0);
        gameIsFinished = false;
        playerOneName = "";
        playerTwoName = "";
        userNameCheck = true;
        currentSign = "";            
    }

    alertCheck = true;
    countCheck = true;

    resetGame.classList.add("btnTurnOff");
    startGame.classList.remove("btnTurnOff");
}

// delete des balises HTML en utilisants les string de l'array classToDelete
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

// symbole actuellement en train de jouer
let currentSign;

// le symbole qui a commencé la partie 
let startingSign;

//nb de rounds à gagner pour remporter la partie
const nbRounds = 3;

//////////////////// bloc avec les infos player 1 ////////////////////
//div qui contient toutes les infos
const sidePlayerOne = document.getElementById("sidePlayerOne");

// <p> 'player 1'
const textPlayerOne = document.createElement("p");
textPlayerOne.innerHTML = "Player 1";
sidePlayerOne.appendChild(textPlayerOne);

// username choisi (ou non) par le player 1
let playerOneName = "";

// balise HTML ou j'affiche le username du player 1
const elemPlayerOneName = document.createElement("p");


// variable ou je stock je stock le symbole du player 1
let playerOneSign = "";

// <p> dans lequel j'ecris le symbole choisi par le player 1
const sideSignOne = document.createElement("p");

// variable que j'utilise pour stocker le score du player 1
let countScorePlayerOne = 0;

// balise html pour afficher le score du player 1
const ScorePlayerOne = document.createElement("p");
ScorePlayerOne.classList.add("scorePlayer");
ScorePlayerOne.innerHTML = "Score : "+countScorePlayerOne;

//////////////////// bloc avec les infos player 2 ////////////////////
//div qui contient toutes les infos
const sidePlayerTwo = document.getElementById("sidePlayerTwo");

// <p> 'player 2'
const textPlayerTwo = document.createElement("p");
textPlayerTwo.innerHTML = "Player 2";
sidePlayerTwo.appendChild(textPlayerTwo);

// username choisi (ou non) par le player 2
let playerTwoName = "";

// balise HTML que j'utilise pour affiche le username du player
const elemPlayerTwoName = document.createElement("p");

// variable dans laquel je stock le symbole du player 2
let playerTwoSign = "";

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

// object playerOne, playerTwo et la liste des joueurs,  
const playerOne = {
    libelle: "Player 1",
    username: playerOneName,
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
    },
    setUsername(nvUsername) {
        this.username = nvUsername;
    }
};

const playerTwo = {
    libelle: "Player 2",
    username: playerTwoName,
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
    },
    setUsername(nvUsername) {
        this.username = nvUsername;
    }
};


// liste des joueurs
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

// check si la partie a été remporté par quelqu'un
let gameIsFinished = false;

let userNameCheck = true;

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

    if(morpionBoard.childElementCount >= 1) {
        elementsToDelete.forEach((deletes) => {
            deleteElementsByClass(deletes.class);
        })     
        gameOver();
        restartTheGame();
    }

    if(userNameCheck) {
        playerOneName = prompt("Nom du player 1 :");
        playerTwoName = prompt("Nom du player 2 :");

        playerOne.setUsername(playerOneName);
        playerTwo.setUsername(playerTwoName);
        userNameCheck = false;
    }

    if(playerOneSign == false) {

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
    }

    elemPlayerOneName.innerHTML = playerOneName;
    sideSignOne.innerHTML = "Symbole : "+playerOneSign;
    sidePlayerOne.appendChild(elemPlayerOneName);
    sidePlayerOne.appendChild(sideSignOne);
    sidePlayerOne.appendChild(ScorePlayerOne);
    
    elemPlayerTwoName.innerHTML = playerTwoName;
    sideSignTwo.innerHTML = "Symbole : "+playerTwoSign;
    sidePlayerTwo.appendChild(elemPlayerTwoName);
    sidePlayerTwo.appendChild(sideSignTwo);
    sidePlayerTwo.appendChild(ScorePlayerTwo);

    //nb de click de carré clické 
    let nbClicked = 1;

    // nb de carré dans le plateau
    const nbCarre = 9;

    if(currentSign == "X" || currentSign == "O" ) {
        switch (startingSign) {
            case "X":
                currentSign = "O";
                break;

            case "O":
                currentSign = "X";
                break;

            default:
                break;
        }
        startingSign = currentSign;
    } else {
        currentSign = prompt("Quel symbole va commencer ?","O");
        while(currentSign != "O" && currentSign != "X") {
            alert("Symbole invalide !");
            currentSign = prompt("Quel symbole va commencer ?","O");
        }
        startingSign = currentSign;
    }

    displaySidesPlayers("show");

    switchTurnColor(currentSign);

    startGame.classList.add("btnTurnOff");

    for(let i = 1; i <= nbCarre; i++) {

        const carreMorpion = carre.cloneNode();
        morpionBoard.appendChild(carreMorpion);

        carreMorpion.addEventListener("click", function() {

            if(carreMorpion.classList.contains("clickedO")||carreMorpion.classList.contains("clickedX")||carreMorpion.classList.contains("unclickable")) {
                alert("Clic invalide !");
            } else {
                carreMorpion.innerHTML = convertStringToIcon(currentSign);
                carreMorpion.classList.add("clicked"+currentSign);
                for (let i = 0; i < carreMorpion.children.length; i++) {
                    const enfantMorpion = carreMorpion.children[i];
                    enfantMorpion.animate(
                        [
                            {transform:"scale(0)"},
                            {transform:"scale(1)"},
                        ],
                        {
                            duration:300,
                            iterations:1,
                        }
                    )
                }

                winningPositions.forEach((position) => {
                    const clickedSides = document.getElementsByClassName("grid-item");
                    const roundWinner = document.getElementsByClassName("currentTurn"+currentSign);

                    for (let i = 1; i < clickedSides.length; i++) {

                        if (clickedSides[position.posOne].classList.contains("clicked"+currentSign) 
                        && clickedSides[position.posTwo].classList.contains("clicked"+currentSign) 
                        && clickedSides[position.posThree].classList.contains("clicked"+currentSign)) {
                            
                            clickedSides[position.posOne].classList.add("carreWinner");
                            clickedSides[position.posTwo].classList.add("carreWinner");
                            clickedSides[position.posThree].classList.add("carreWinner");

                            for (let i = 0; i < roundWinner.length; i++) {
                                const openRoundWinner = roundWinner[i];
                                openRoundWinner.appendChild(victoire);
                            } 

                            carreWinner = document.getElementsByClassName("carreWinner");
                            for (let i = 0; i < carreWinner.length; i++) {

                                const openCarreWinner = carreWinner[i];

                                for (let i = 0; i < openCarreWinner.children.length; i++) {

                                    const openWinnerChildren = openCarreWinner.children[i];
                                    openWinnerChildren.style.transform = "scale(1.25)";
                                }
                            }
                            
                            listPlayers.forEach((list) => {
                                if(list.name.player.classList.contains("currentTurn"+currentSign) && countCheck) {
                                    countCheck = false;                                                                               
                                    list.name.setScore(list.name.getScore() + 1);                                                                            
                                    window.addEventListener("click", () => {
                                        list.name.elemScore.innerHTML = "Score : "+list.name.getScore();
                                    })

                                    if((Math.max(playerOne.getScore(), playerTwo.getScore())) == nbRounds) {
                                        if(list.name.username.length <= 0) {
                                            alert(list.name.libelle+" à gagné la partie avec le plus de points !");
                                            gameIsFinished = true;
                                            playerOneSign = "";
                                        } else {
                                            alert(list.name.username+" à gagné la partie avec le plus de points !");
                                            gameIsFinished = true;
                                            playerOneSign = "";
                                        }

                                        // for (let i = 0; i < clickedSides.length; i++) {
                                        //     const winningCarreMorpion = clickedSides[i];
                                            
                                        //     winningCarreMorpion.innerHTML = convertStringToIcon(list.name.sign);
                                        //     winningCarreMorpion.classList.add("Clicked"+currentSign); 
                                        //     winningCarreMorpion.classList.add("carreWinner"); 
                                        // }
                                    }
                                }
                            })                            

                            const openCarreMorpion = clickedSides[i];
                            openCarreMorpion.classList.add("unclickable");                                
 
                            elementsToDelete.forEach((deletes) => {
                                resetGame.addEventListener("click", function() {
                                    deleteElementsByClass(deletes.class);  
                                    playerOne.setScore(0);
                                    playerTwo.setScore(0);
                                    playerOneName = "";
                                    playerTwoName = "";     
                                    startGame.innerHTML = "Start the game !";    
                                    userNameCheck = true;        
                                    currentSign = "";    
                                    playerOneSign = "";
                                })
                            })

                            if(gameIsFinished) {
                                startGame.innerHTML = "Start the game !";    
                                startGame.classList.add("btnTurnOff");                     
                            } else {
                                startGame.innerHTML = "Restart the game !";
                                startGame.classList.remove("btnTurnOff");            
                            }                           
                            gameOver();    
                        }
                    }
                });
                
                if(nbClicked == nbCarre && alertCheck) {
                    elementsToDelete.forEach((deletes) => {
                        resetGame.addEventListener("click", function() {
                            deleteElementsByClass(deletes.class);  
                            playerOne.setScore(0);
                            playerTwo.setScore(0);
                            playerOneName = "";
                            playerTwoName = "";      
                            startGame.innerHTML = "Start the game !";  
                            playerOneSign = "";
                        })

                    })

                    if(gameIsFinished) {
                        startGame.innerHTML = "Start the game !";    
                        startGame.classList.add("btnTurnOff");                     
                    } else {
                        startGame.innerHTML = "Restart the game !";
                        startGame.classList.remove("btnTurnOff");            
                    }  
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


