function game() {
    var board = [
        [document.getElementById("0_0"), document.getElementById("0_1"), document.getElementById("0_2")],
        [document.getElementById("1_0"), document.getElementById("1_1"), document.getElementById("1_2")],
        [document.getElementById("2_0"), document.getElementById("2_1"), document.getElementById("2_2")]
    ];
    const player1 = "X";
    const player2 = "O";
    let currentPlayer = player1;
    let gameOver = false;

    var gameStatus = document.getElementById("gameStatus");

    var resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);

    initializeGame();

    function handleClick(event) {
        var box = event.target;

        if (box.textContent !== "") {
            displayStatus("Box already filled! Choose another.");
            return;
        }

        if (gameOver) {
            return;
        }

        box.textContent = currentPlayer;

        setGameStatus();

        if (checkWin()) {
            gameOver = true;
            return;
        }
    }

    function isBoardFull() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j].textContent === "") {
                    return false;
                }
            }
        }
        return true;
    }

    function setGameStatus() {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        if (checkWin()) {
            displayStatus(checkWin() + " wins!");
        }
        else if (isBoardFull()) {
            displayStatus("It's a draw!");
        }
        else if (currentPlayer === player1) {
            displayStatus("Player 1's turn (X)");
        } else {
            displayStatus("Player 2's turn (O)");
        }
    }

    function displayStatus(message) {
        gameStatus.textContent = message;
    }

    function initializeGame() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                board[i][j].textContent = "";
                board[i][j].addEventListener("click", handleClick);
            }
        }
        displayStatus("Player 1's turn (X)");
    }

    function checkWin() {
        //rows
        for (var i = 0; i < 3; i++) {
            if (board[i][0].textContent === board[i][1].textContent && board[i][1].textContent === board[i][2].textContent && board[i][0].textContent !== "") {
                return board[i][0].textContent;
            }
        }
        //columns
        for (var j = 0; j < 3; j++) {
            if (board[0][j].textContent === board[1][j].textContent && board[1][j].textContent === board[2][j].textContent && board[0][j].textContent !== "") {
                return board[0][j].textContent;
            }
        }
        //diagonals
        if (board[0][0].textContent === board[1][1].textContent && board[1][1].textContent === board[2][2].textContent && board[0][0].textContent !== "") {
            return board[0][0].textContent;
        }
        if (board[0][2].textContent === board[1][1].textContent && board[1][1].textContent === board[2][0].textContent && board[0][2].textContent !== "") {
            return board[0][2].textContent;
        }
        if(isBoardFull()) {
            return true;
        }
        return null;
    }

    function resetGame() {
        gameOver = false;
        initializeGame();
    }
}

game();