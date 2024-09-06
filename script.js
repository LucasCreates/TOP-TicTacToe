
 

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

// function checkWin(currentPlayer, square) {
//     for (i = 0; i< gameBoard.winnerArrays.length; i++){
//         console.log(i)
//         const [a,b,c] = gameBoard.winnerArrays[i]
//         console.log([a,b,c])
//     }
// }

function Player(name, marker){
    return {name, marker}
}


const start = (() => {
    const startGame = document.querySelector(".start");
    const dialog = document.querySelector("dialog");

    const getMarker = [];

    
    // const setMarker = getMarker.toString()

    const p1Name = document.querySelector("[data-player-one]")
    p1Name.addEventListener("input", (e)=>{return e.value})
    
    const p2Name = document.querySelector("[data-player-two]")
    p2Name.addEventListener("input", (e) => {return e.value})

    startGame.addEventListener("click", () => {dialog.showModal()})

    const markers = document.querySelectorAll("[data-mark]");
    markers.forEach((mark) =>{
        mark.addEventListener("click", (e) => {
            console.log(e.target.value)
            // playerMark = e.target.value
            getMarker.pop()
            return getMarker.push(e.target.value);
        })
    })

    // const crossBtn = document.querySelector(".cross");
    // crossBtn.addEventListener("click",(e) =>{
    //     console.log(e.target.value)
    //     getMarker.pop()
    //     return getMarker.push(e.target.value)
    // })

    // const circleBtn = document.querySelector(".circle");
    // circleBtn.addEventListener("click",(e) =>{
    //     console.log(e.target.value) 
    //     getMarker.pop()
    //     return getMarker.push(e.target.value)
        
    // })

    const close = document.querySelector(".close");
    close.addEventListener("click", () => {dialog.close()})

    const start = document.querySelector("form");
    start.addEventListener("submit", (e) => {
        // e.preventDefault()
        gameData()
        // gameLoader(); this is just an empty f for now
    })
    // return {p1Name, p2Name, circleBtn ,crossBtn, getMarker}
    return {p1Name, p2Name, getMarker}
})();
// start()
// console.log(start.circleBtn.value)



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
    
    
    return {p1, p2}
}

console.log(gameData().p1)

function gameLoader () {
    // resetBoard()
    let indexY;
    let indexX;
    const makeBoard = document.querySelectorAll(".square");

    makeBoard.forEach((board) => {
        const index = board.dataset.indexNumber
            board.addEventListener("click", () =>{
                console.log(index)

                board.textContent = "X"
                const getCoordinates = index.split("")
                console.log(getCoordinates)
                if (getCoordinates[0] === "a") {
                    indexY = "0"
                }
                else if  (getCoordinates[0] === "b"){
                    indexY = "1"
                }
                else if  (getCoordinates[0] === "c"){
                    indexY = "2"
                }
                indexX = getCoordinates[1]

                console.log(indexY,indexX)
                console.table(GameBoard.updateBoard(indexY, indexX , "X")) //This works! This assigns a cross (or a circle) to the board
                console.table(GameBoard.boardMatrix)
               
            })
    return
    })
    


    
};

const GameBoard = (() => {
 
    let playerTurn = false;

    let boardMatrix =  [
        ["","",""], 
        ["","",""],
        ["","",""]  
        ];

    const updateBoard = (index1, index2, marker) =>{
        boardMatrix[index1][index2] = marker;

    }
    // const board = (function () {
        // let boardArray = [
              //         [1,2,3], //[0] <-- targets each layer | Either [0] or [1] or [2] to target 1 or 2 or 3 respectively
            //           [4,5,6], //[1] <-- targets each layer | Either [0] or [1] or [2] to target 4 or 5 or 6 respectively
          //             [7,8,9]  //[2] <-- targets each layer | Either [0] or [1] or [2] to target 7 or 8 or 9 respectively
        //               ]         // So for example, console.log(createBoard[1][2]) output is 6
        // return boardArray
    // })();

    const winnerArrays = [
                          [0,1,2], 
                          [1,4,7],  
                          [6,7,8],
                          [0,3,6],
                          [2,5,8],
                          [3,4,5], 
                          [0,4,8],
                          [2,4,6]
                         ] 

    const playerScore = []
   
    return { boardMatrix,  winnerArrays, playerTurn, updateBoard }
})();

// console.log(GameBoard.board)
// console.log(GameBoard.boardMatrix)
// console.log(GameBoard.board2[1][2])
gameLoader()
// startGame()