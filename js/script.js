function game() {
    var box_0_0 = document.getElementById("0_0");
    var box_0_1 = document.getElementById("0_1");
    var box_0_2 = document.getElementById("0_2");
    var box_1_0 = document.getElementById("1_0");
    var box_1_1 = document.getElementById("1_1");
    var box_1_2 = document.getElementById("1_2");
    var box_2_0 = document.getElementById("2_0");
    var box_2_1 = document.getElementById("2_1");
    var box_2_2 = document.getElementById("2_2");
    var board = [
        [box_0_0, box_0_1, box_0_2],
        [box_1_0, box_1_1, box_1_2],
        [box_2_0, box_2_1, box_2_2]
    ];
    const player1 = "X";
    const player2 = "O";
    let currentPlayer = player1;
    let gameOver = false;

    //initialize all boxes to empty
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            board[i][j].textContent = "";
        }
    }

    //add event listener to each box
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            board[i][j].addEventListener("click", handleClick);
        }
    }

    function handleClick(event) {
        var box = event.target;
        
        //ignore if game is over or box is already filled
        if (gameOver || box.textContent !== "") {
            return;
        }

        //place the current player's mark
        box.textContent = currentPlayer;

        //get board state as values for win checking
        var boardState = getBoardState();

        //check for a winner
        var winner = checkWin(boardState);
        if (winner) {
            gameOver = true;
            displayResult(winner + " wins!");
            return;
        }

        //check for a draw
        if (isBoardFull(boardState)) {
            gameOver = true;
            displayResult("It's a draw!");
            return;
        }

        //switch to the other player
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    function getBoardState() {
        var state = [];
        for (var i = 0; i < 3; i++) {
            state[i] = [];
            for (var j = 0; j < 3; j++) {
                state[i][j] = board[i][j].textContent;
            }
        }
        return state;
    }

    function isBoardFull(boardState) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (boardState[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    function displayResult(message) {
        var title = document.getElementById("title");
        title.textContent = message;
    }
}

function checkWin(board) {
    //check rows
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            return board[i][0];
        }
    }
    //check columns
    for (var j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== "") {
            return board[0][j];
        }
    }
    //check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        return board[0][2];
    }
    return null;
}
    

game();