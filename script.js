


 

// const startGame = () => {
//     const start = document.querySelector(".start")

//     start.addEventListener("click", () => {
        
//         // gameBoard
//         // gameBoard.container.innerHTML = ""
//         checkWin()
//         chooseMarker()
//         // randomVariablesToSort()
//         makeBoard()
       
        
//         selectSquare()
        
//     })
// }


// function randomVariablesToSort (){
//     const name1 = "Ezra";
//     const marker = "X" 
//     const newFunc = { name1, marker }
//     const playerMarker = "X"
//     const markerHits = []
//     return {name1, marker, newFunc, playerMarker, markerHits}
// }





const domElements = (function (){ //placeholder name
    const header = document.querySelector(".header")
    const container = document.querySelector(".board-container")
    
    

    return {header, container}
})()

// console.log(domElements.header)

// function chooseMarker(){
//     const markerContainer = document.createElement("div")
//     markerContainer.setAttribute("class", "marker-container")

//     domElements.header.appendChild(markerContainer)

//     // Cross choice button
//     const cross = document.createElement("button")
//     cross.classList.add("marker-btn")
//     cross.setAttribute("data-mark", "cross")
//     cross.textContent = "X"
//     markerContainer.appendChild(cross)

//     // Circle choice button
//     const circle = document.createElement("button")
//     circle.classList.add("marker-btn")
//     circle.setAttribute("data-mark", "circle")
//     circle.textContent = "O"
//     markerContainer.appendChild(circle)
   

//     cross.addEventListener("click", (e) => {
//         if(e.target.dataset.mark === "cross"){
//             domElements.header.removeChild(markerContainer)
//             return gameBoard.currentPlayer
//         }
//     })

//     circle.addEventListener("click", (e) => {
//         if(e.target.dataset.mark === "circle"){
//             domElements.header.removeChild(markerContainer)
//             return gameBoard.currentPlayer = gameBoard.players[1]
//         }  
//     })

// }


// function selectSquare (){ 
//     const squares = document.querySelectorAll(".square")    

//     squares.forEach((square) => {
//             square.addEventListener("click", (e)=>{
//                 const action = e.target
               
//                 if(!gameBoard.playerTurn){ //player 1
//                     action.textContent = gameBoard.currentPlayer
                  
//                     // gameBoard.board = action.dataset.indexNumber
                   
//                     gameBoard.board[0][1] = action.dataset.indexNumber
//                     console.table(gameBoard.board)
               
            
//                     gameBoard.playerTurn = true 
                                
//                 }
//                 else   { // player 2
//                     action.textContent = gameBoard.currentPlayer
//                     console.log(gameBoard.board)
//                     gameBoard.playerTurn = false
//                 }  
//             })
//     })
// }


// function resetBoard () {
//     const reset = document.querySelector(".reset")
//     reset.addEventListener("click", () => {
//         console.log("Reset")
//         gameBoard.container.innerHTML = ""
      
        
//     })
// }


function Player(name, marker, score){
    return {name, marker, score}
}

function displayPlayers(display){
    const container = document.querySelectorAll(".player-display")
    container.forEach((contain) => {
        contain.style.display = display
    })
    
}

const start = (() => {
    const startGame = document.querySelector(".start");
    const dialog = document.querySelector("dialog");
    const getMarker = [];

    const p1Name = document.querySelector("[data-player-one]")
    p1Name.addEventListener("input", (e)=>{return e.value})
    
    const p2Name = document.querySelector("[data-player-two]")
    p2Name.addEventListener("input", (e) => {return e.value})

    startGame.addEventListener("click", () => {dialog.showModal()})

    const markers = document.querySelectorAll("[data-mark]");
    markers.forEach((mark) =>{
        mark.addEventListener("click", (e) => {
            getMarker.pop()
            return getMarker.push(e.target.value);
        })
    })

    const close = document.querySelector(".close");
    close.addEventListener("click", () => {dialog.close()})

    const start = document.querySelector("form");
    start.addEventListener("submit", () => {
        // e.preventDefault()
        displayPlayers("block")
        gameData()
        gameLoader()
        // gameLoader(); this is just an empty f for now
    })
   
    return {p1Name, p2Name, getMarker}
})();


function gameData(){
 
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
// displayPlayerTurn()


function displayWinner(victory){
    const winner = document.querySelector(".display-winner")
    const winnerName = document.querySelector(".winner-name")
    winner.style.display = "flex"
    winnerName.textContent = `${victory} is the winner!`
  
}



const gameLoader = () => {
    const reset = document.querySelector(".reset")
    reset.addEventListener("click", () => {

        console.log(currentPlayer)
        currentPlayer = true
        
        cells.forEach((cell, index) =>{
            cell.textContent= ""
        });
        
    })

    const cells = document.querySelectorAll(".square");
    let currentPlayer = true;

    let setMarkToBoard;

    const initGame = () => {
        cells.forEach((cell, index) =>{
            cell.setAttribute("data-index-number", index)
            cell.addEventListener("click", cellOnClick)
           
            
        });
    }

    const cellOnClick = (e) => {
        const cell = e.target
        console.log(`p mark is  ${start.getMarker}`)
        const p1Marker = start.getMarker
        const p2Marker = gameData().p2.marker
        console.log(`p1 mark is  ${p1Marker}`)
        console.log(`p2 mark is  ${p2Marker}`)

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
  
    const checkWin = (marker) =>{
        const mark = marker
        console.log(`mark in checkWin = ${mark}`)
      
        return winnerArrays.some(win => {
            const [a,b,c] = win
            console.log(`GameBoard.getBoard()[a] = ${GameBoard.getBoard()[a] } GameBoard.getBoard()[b] = ${GameBoard.getBoard()[b]} GameBoard.getBoard()[c] = ${GameBoard.getBoard()[c]}`)
            
            if(GameBoard.getBoard()[a] === mark && GameBoard.getBoard()[b] === mark && GameBoard.getBoard()[c] === mark){
                console.log(`currentPlayer is ${currentPlayer}`)
                console.log("WINNER")
                if(mark[0] === "X" || mark[0 === "O"] && currentPlayer === false){
                    console.log(gameData().p1.name)
                    return displayWinner(gameData().p1.name)
                }
                else {
                    return displayWinner(gameData().p2.name)
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

    
   
    return {initGame, currentPlayer}
};

const GameBoard = (() => {
    let boardMatrix =  [
        ["","",""], 
        ["","",""],
        ["","",""]  
        ];
    let board = ["","","","","","","","",""]   
    
    const getBoard = () => board


    const updateBoard = (index,  marker) =>{board[index] = marker;}
    
    const resetBoard = () => {[
        ["","",""], 
        ["","",""],
        ["","",""]  
        ];

    }
    return { boardMatrix, updateBoard, resetBoard, board, getBoard }
})();


gameLoader().initGame()
// startGame()
 



















 // makeBoard.forEach((board) => {
        
    //     let index = board.dataset.indexNumber
    //         board.addEventListener("click", () =>{
    //             const p1Marker = gameData().p1.marker
    //             const p2Marker = gameData().p2.marker
    //             // console.log(`index on click = ${index}`)
    //             if(board.textContent !== p1Marker && board.textContent !== p2Marker){
    //                 if (currentPlayer){
    //                     // insert a function call to change panal to indicate whos go it is on this line.
    //                     board.textContent = p1Marker;
    //                     setMarkToBoard = p1Marker
    //                     // GameBoard.playerScore.push(index)
    //                     currentPlayer = false
    //                     displayPlayerTurn()
    //                     // checkWin(currentPlayer,setMarkToBoard)
    //                 }
    //                 else {
    //                     // <-- insert a function call to change panal to indicate whos go it is on this line.
    //                     board.textContent = p2Marker
    //                     setMarkToBoard = p2Marker
    //                     // GameBoard.playerScore.push(index)
    //                     currentPlayer = true;
    //                     displayPlayerTurn()
    //                     // checkWin(currentPlayer,setMarkToBoard)
    //                 }
    //             }
    //             const getCoordinates = index.split("")
    //             // console.log(getCoordinates)
    //             if (getCoordinates[0] === "a") {
    //                 indexY = "0"
    //             }
    //             else if  (getCoordinates[0] === "b"){
    //                 indexY = "1"
    //             }
    //             else if  (getCoordinates[0] === "c"){
    //                 indexY = "2"
    //             }
    //             indexX = getCoordinates[1]
    //             GameBoard.updateBoard(indexY, indexX , setMarkToBoard)
    //             // checkWin(currentPlayer,setMarkToBoard) 
               
    //         })
         
    // })  