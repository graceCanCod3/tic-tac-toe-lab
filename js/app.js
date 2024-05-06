/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board
let turn
let winner
let tie


/*------------------------ Cached Element References ------------------------*/
//step 2


const resetBtnEl = document.querySelector('#reset');

const squareEls = document.querySelectorAll(".sqr");
console.log(squareEls);

const messageEl = document.querySelector('#message')
console.log(messageEl.innerText)




/*-------------------------------- Functions --------------------------------*/

function init () {
    board = ["", "", "", "", "","","","",""]; 
    turn = "X"
    winner= false;
    tie = false;

    render();
    } ;

function render() {                     
    updateBoard()
    updateMessage()
    };
    
    
// create loop for board and for each element
    function updateBoard() {
        squareEls.forEach((cell,index) => {
      cell.innerText = board[index]

        })
    }

    function updateMessage() {
        if (!winner && !tie) {
            messageEl.innerText = `"${turn}" It's Your Turn`;
        } else if (!winner && tie) {
            messageEl.innerText = `Let's Go! It's A Tie! We're All Winners Here!`;
        } else { 
            messageEl.innerText = `${turn}! You Won! Welcome to the winners circle`;
        }
    }
    
    
    function handleClick(event) {
        const squareIndex = getSquareIndex(event);
        if (isValidIndex(squareIndex) && isSquareEmpty(squareIndex)) {
            placePiece(squareIndex);
            checkGameStatus();
            switchPlayerTurn();
            render();
        }
    }
    
    function getSquareIndex(event) {
        const squareId = event.target.getAttribute('id');
        return parseInt(squareId);
    }
    
    function isValidIndex(index) {
        return !isNaN(index);
    }
    
    function isSquareEmpty(index) {
        return board[index] === '';
    }
    
    function checkGameStatus() {
        checkForWinner();
        checkForTie();
    }
    
    // Other functions remain unchanged
    
    function placePiece(index) {
        // Check if the index is within the bounds of the board array
        if (isValidIndex(index)) {
            board[index] = getCurrentPlayer();
            console.log('Piece placed at index:', index);
            console.log('Updated board:', board);
            // You may want to trigger additional actions here, such as checking for a winner or updating the UI
        } else {
            console.error('Invalid index:', index);
        }
    }
    
    function isValidIndex(index) {
        return index >= 0 && index < board.length;
    }
    
    function getCurrentPlayer() {
        return turn;
    }


    function checkForWinner() {
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                winner = true;
                return;
            }
        }
    }
    
    function checkForTie() {
        if (winner) return;
    
        if (!board.some(cell => !cell)) {
            tie = true;
        }
    }
    
    function switchPlayerTurn() {
        if (winner) return;
    
        turn = (turn === 'X') ? 'O' : 'X';
    }
    
    
    /*----------------------------- Event Listeners -----------------------------*/
    
    
    document.addEventListener("DOMContentLoaded", function() {
        init();
    });
    
    squareEls.forEach(squareEl => {
        squareEl.addEventListener('click', handleClick);
    });
    
    // add event listener to reset button
    resetBtnEl.addEventListener('click', init)
    