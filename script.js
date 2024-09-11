
const DOMController = (function (){ //placeholder name
    const header = document.querySelector(".header")
    const boardContainer = document.querySelector(".board-container")
    const displayPlayers = document.querySelectorAll(".player-display")
    const startGame = document.querySelector(".start");
    const dialog = document.querySelector("dialog");
    const playRound = document.querySelector(".play")
    const displayP1Score = document.querySelector(".p1-score")
    const displayP2Score = document.querySelector(".p2-score")

    return {header, 
            displayPlayers, 
            boardContainer, 
            startGame, 
            dialog, 
            playRound,
            displayP1Score,
            displayP2Score}
})();


function Player(name, marker, score){
    return {name, marker, score}
}

function displayPlayers(display){
    DOMController.displayPlayers.forEach((contain) => {
        contain.style.display = display
    })
    
}

const start = (() => {

    const getMarker = [];

    const p1Name = document.querySelector("[data-player-one]")
    p1Name.addEventListener("input", (e)=>{return e.value})
    
    const p2Name = document.querySelector("[data-player-two]")
    p2Name.addEventListener("input", (e) => {return e.value})

    DOMController.startGame.addEventListener("click", () => {
        document.querySelector(".game-container").style.display = "flex"
        DOMController.dialog.showModal()
        document.querySelector(".header").style.display = "none"
    })

    const markers = document.querySelectorAll("[data-mark]");
    markers.forEach((mark) =>{
        mark.addEventListener("click", (e) => {
            getMarker.pop()
            return getMarker.push(e.target.value);
        })
    })

    DOMController.playRound.addEventListener("click", () => {
        console.log("Play again")
        newRound()
    })
    
    const close = document.querySelector(".close");
    close.addEventListener("click", () => {DOMController.dialog.close()})

    const start = document.querySelector("form");
    start.addEventListener("submit", () => {
        
        displayPlayers("block")
        displayGameData()
        gameLoader()
        // gameLoader(); this is just an empty f for now
    })
   
    return {p1Name, p2Name, getMarker}
})();

function displayGameData(){
    const displayP1Mark = document.querySelector(".p1-marker");
    const displayP2Mark = document.querySelector(".p2-marker");
    const displayP1Name = document.querySelector(".p1-name")
    const displayP2Name = document.querySelector(".p2-name")
    let setMarker;
      
    if(start.getMarker.toString() === "O"){
        setMarker = "X";
    }else {
        setMarker = "O"
    }
    const p1 = new Player(start.p1Name.value, start.getMarker.toString())
    const p2 = new Player(start.p2Name.value, setMarker)

    displayP1Name.textContent = p1.name
    displayP2Name.textContent = p2.name
    displayP1Mark.textContent = p1.marker
    displayP2Mark.textContent = p2.marker
    
    return {p1, p2, displayP1Mark, displayP2Mark}
}



function displayPlayerTurn(currentPlayer){
    const p1 = document.querySelector(".player-1")
    const p2 = document.querySelector(".player-2")
    if(currentPlayer){
        p1.style.transform = "scale(1.0)"
        p2.style.transform = "scale(1.2)"
        p2.style.transition = "All 0.5s"
        p2.style.boxShadow = "0px 10px 10px 10px rgb(246, 248, 228)"
        p1.style.boxShadow = "none"
    }
    else {
        p1.style.transition = "All 0.5s"
        p2.style.transform = "scale(1.0)"
        p1.style.transform = "scale(1.2)"
        p1.style.boxShadow = "0px 10px 10px 10px rgb(246, 248, 228)"
        p2.style.boxShadow = "none"
    }
}

function displayWinner(victory){
    const winner = document.querySelector(".display-winner")
    const winnerName = document.querySelector(".winner-name")
    winner.style.display = "flex"
    winnerName.textContent = `${victory} is the winner!`
    return {winner}
}

function newRound () { // Starts a new game only keeping the score, player names and markers
    gameLoader().currentPlayer = true
    resetBoard()
    displayWinner().winner.style.display = "none"
}

function resetBoard(){ // Clears the gameboard
    GameBoard.emptyBoard()
        gameLoader().cells.forEach((cell) =>{
            cell.textContent = "";
        });
}

const gameLoader = () => { // main function creating the board and allowing players to set markers on the board
    const cells = document.querySelectorAll(".square");
    let currentPlayer = true;
    let player1Score = 0
    let player2Score = 0
    let setMarkToBoard;

    const initGameBoard = () => {
        cells.forEach((cell, index) =>{
            cell.setAttribute("data-index-number", index)
            cell.addEventListener("click", cellOnClick)
        });
    }

    const cellOnClick = (e) => {
        const cell = e.target
        const p1Marker = start.getMarker
        const p2Marker = displayGameData().p2.marker
      
        if(cell.textContent !== p1Marker && cell.textContent !== p2Marker){
            if (currentPlayer){
                displayPlayerTurn(currentPlayer)
                cell.textContent = p1Marker
                setMarkToBoard = p1Marker
                currentPlayer = false    
            }
            else {
                displayPlayerTurn(currentPlayer)
                cell.textContent =  p2Marker
                setMarkToBoard = p2Marker
                currentPlayer = true;      
            }
            GameBoard.updateBoard(e.target.dataset.indexNumber, setMarkToBoard)
            checkWin(setMarkToBoard)
        }        
    }
    // RESET The entire game.
    const resetGame = document.querySelector(".reset")
    resetGame.addEventListener("click", () => {
        displayWinner().winner.style.display = "none";
        displayPlayers("none")
        DOMController.dialog.showModal()
        DOMController.displayP1Score.textContent = 0
        DOMController.displayP2Score.textContent = 0
        player1Score = 0
        player2Score = 0
        resetBoard() 
    })
    ///////////////

    const checkWin = (marker) =>{
        const mark = marker
        return winnerArrays.some(win => {
            const [a,b,c] = win 
            if(GameBoard.getBoard()[a] === mark && GameBoard.getBoard()[b] === mark && GameBoard.getBoard()[c] === mark){
                if(mark[0] === "X" || mark[0 === "O"] && currentPlayer === false){
                    player1Score += 1
                    DOMController.displayP1Score.textContent = `Score: ${player1Score}`
                    return displayWinner(displayGameData().p1.name)
                }
                else {
                    player2Score += 1
                    DOMController.displayP2Score.textContent = `Score: ${player2Score}`
                    return displayWinner(displayGameData().p2.name, player2Score)
                }   
            } 
        })       
    }

    const winnerArrays = 
    [
        [0,1,2], 
        [3,4,7],  
        [6,7,8],
        [0,3,6],
        [2,5,8],
        [3,4,5], 
        [0,4,8],
        [2,4,6],
        [1,4,7]
    ] 
    return {initGameBoard, currentPlayer, cells}
};

const GameBoard = (() => { // contains all the board data
  
    let board = ["","","","","","","","",""]   
    const getBoard = () => board
    const updateBoard = (index,  marker) =>{board[index] = marker;}
    const emptyBoard = () => {
    board = ["","","","","","","","",""]  

    }
    return {  updateBoard, emptyBoard, getBoard }
})();


gameLoader().initGameBoard()

 

