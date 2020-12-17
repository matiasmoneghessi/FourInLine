var p1, p2 = null;
var p1Name, p2Name = null;
var p1Timer, p2Timer = null;
var globalTimer = null;
var boardHTML = null;
var columnsHTML = null;
var turnHTML, turnHTMLText = null;
var p1TimerHTML, p2TimerHTML = null;
var globalTimerHTML = null;
var finalMessage = null;
var popupMessage = null;
var popupWinner = null;
var resetBtn, saveBtn = null;
var board = null;
var turn = null;
var lastUpdatedTime = new Date().getTime();
var savedGameIndex = null;
var savedGames = [];
var savedTimers = [];
var savedNames = [];
var saving = false;
var isNewGame = null;
var gameOver = false;

var twoPlayerBoard = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
];

var resetGame = function () {
    boardHTML.className = '';
    if (saving) {
        saving = false;
        globalTimer.startTimer();
        (turn === 'p1') ? p1Timer.startTimer() : (turn === 'p2' ? p2Timer.startTimer() : console.log('Test'));
    } else {
        gameOver = false;
        board.resetBoard();
        board.render();
        resetTimers();
        setTimeout(toggleTurn, 1);
    }
}

var resetTimers = function () {
    idFlex();
    globalTimer.resetTimer();
    p1Timer.resetTimer();
    p2Timer.resetTimer();
}

var startTimers = function () {
    globalTimer.startTimer();
    p1Timer.startTimer();
    p2Timer.startTimer();
}

var stopTimers = function () {
    globalTimer.stopTimer();
    p1Timer.stopTimer();
    p2Timer.stopTimer();
}

var displayPopup = function (playerName) {
    if (saving) {
        popupWinner.innerHTML = '';
        popupMessage.innerHTML = 'Game saved!';
        resetBtn.innerHTML = 'OK';
    } else {
        gameOver = true;
        if (playerName) {
            playerName = (playerName === 'p1') ? p1.name : p2.name;            
            popupWinner.innerHTML = playerName;
            popupMessage.innerHTML = 'AND THE WINNER IS';
        } else {
            popupWinner.innerHTML = 'ITS A TIE!';
            postWin();
        }
    }
    stopTimers();
}

var postWin = function () {
    console.log('Tenemos un ganador')
    document.getElementById("play-area").style.display = "none";
    document.getElementById("divider").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("generalTime").style.display = "none";
    document.getElementById("save").style.display = "none";
    document.getElementById("reset").style.display = "none";
}

var idFlex = function () {
    document.getElementById("play-area").style.display = "flex";
    document.getElementById("divider").style.display = "flex";
    document.getElementById("menu").style.display = "flex";
    document.getElementById("generalTime").style.display = "flex";
    document.getElementById("save").style.display = "flex";
    document.getElementById("winner").style.display = "none";
    document.getElementById("message").style.display = "none";
}

var getDate = function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

// this function saves in two arrays the  info of the game and times. 
var saveGame = function () {
    savedGames.push({ currentBoard: board.board, p1: p1, p2: p2, turn: turn, date: getDate() });
    savedTimers.push({ p1: p1Timer, p2: p2Timer, globalTime: globalTimer });
    localStorage['savedGames'] = JSON.stringify(savedGames);
    localStorage['savedTimers'] = JSON.stringify(savedTimers);
    saving = true;
    displayPopup(null);
    postWin();
}

var checkWin = function () {
    //check vertical 
    for (var i = 0; i < board.board.length; i++) {
        for (var j = 0; j < 4; j++) {
            if (board.board[i][j]) {
                if (board.board[i][j] === (board.board[i][j + 1]) && board.board[i][j] === (board.board[i][j + 2]) &&
                    board.board[i][j] === (board.board[i][j + 3])) {
                    displayPopup(board.board[i][j]);
                    postWin();
                }
            }
        }
    }

    for (var i = 0; i < board.board.length - 3; i++) {
        for (var j = 0; j < 4; j++) {
            if (board.board[i][j]) {
                //check horizontal 
                if (board.board[i][j] === (board.board[i + 1][j]) && board.board[i][j] === (board.board[i + 2][j]) &&
                    board.board[i][j] === (board.board[i + 3][j])) {
                    displayPopup(board.board[i][j]);
                    postWin();
                }
                //check diagonal increment 
                if (board.board[i][j] === (board.board[i + 1][j + 1]) && board.board[i][j] === (board.board[i + 2][j + 2]) &&
                    board.board[i][j] === (board.board[i + 3][j + 3])) {
                    displayPopup(board.board[i][j]);
                    postWin();
                }
            }
        }
    }

    //check diagonal decrement 
    for (var i = 0; i < board.board.length - 3; i++) {
        for (var j = 3; j < board.board[i].length; j++) {
            if (board.board[i][j]) {
                if (board.board[i][j] === (board.board[i + 1][j - 1]) && board.board[i][j] === (board.board[i + 2][j - 2]) &&
                    board.board[i][j] === (board.board[i + 3][j - 3])) {
                    displayPopup(board.board[i][j]);
                    postWin();
                }
            }
        }
    }
}

//checks if board is full for a draw
var checkDraw = function () {
    for (var i = 0; i < board.board.length; i++) {
        if (board.board[i].includes(null)) {
            var isFull = false
            return;
        } else {
            isFull = true;
        }
    }
    if (isFull) {
        displayPopup(null);
    }
}

var getPlayerNames = function () {
    if (isNewGame) {
        savedNames = JSON.parse(localStorage['playersNames']);
        p1Name.innerHTML = savedNames[0].namep1 + ': P1';
        p2Name.innerHTML = savedNames[0].namep2 + ': P2';
    } else {
        p1Name.innerHTML = savedGames[savedGameIndex].p1.name + ': P1';
        p2Name.innerHTML = savedGames[savedGameIndex].p2.name + ': P2';
    }
}

var changeTurnIcon = function () {
    if (turn === 'p1') {
        turnHTML.className = 'turn slot p1';
        turnHTMLText.innerHTML = 'P1';
    } else if (turn === 'p2') {
        turnHTML.className = 'turn slot p2';
        turnHTMLText.innerHTML = 'P2';
    }
}

var toggleTurn = function () {
    if (!gameOver) {
        turn = (turn === 'p1') ? 'p2' : 'p1';
        if (turn === 'p1') {
            p2Timer.stopTimer();
            p1Timer.startTimer();
        } else {
            p1Timer.stopTimer();
            p2Timer.startTimer();
        }
        changeTurnIcon();
    }
}

// save the string of the array of the localstorage in an json
var loadSavedGame = function () {
    savedGames = JSON.parse(localStorage['savedGames']);
    savedTimers = JSON.parse(localStorage['savedTimers']);
    board.board = savedGames[savedGameIndex].currentBoard;
    turn = savedGames[savedGameIndex].turn;
    p1 = savedGames[savedGameIndex].p1;
    p2 = savedGames[savedGameIndex].p2;
    p1Timer.currentTimer = savedTimers[savedGameIndex].p1.currentTimer;
    p1Timer.lastUpdatedTime = savedTimers[savedGameIndex].p1.lastUpdatedTime;
    p2Timer.currentTimer = savedTimers[savedGameIndex].p2.currentTimer;
    p2Timer.lastUpdatedTime = savedTimers[savedGameIndex].p2.lastUpdatedTime;
    globalTimer.currentTimer = savedTimers[savedGameIndex].globalTime.currentTimer;
    globalTimer.lastUpdatedTime = savedTimers[savedGameIndex].globalTime.lastUpdatedTime;
    board.render();
    globalTimer.startTimer();
    p1Timer.startTimer();
    p2Timer.startTimer();
    setTimeout(toggleTurn, 1);
    toggleTurn()
}

var initialize = function () {
    document.getElementById("reset").style.display = "none";
    getPlayerNames();
    board = new Board(boardHTML, columnsHTML, twoPlayerBoard);
    p1 = new Player('Player 1');
    p2 = new Player('Player 2');
    p1Timer = new Timer(p1TimerHTML, 0, lastUpdatedTime, 0);
    p2Timer = new Timer(p2TimerHTML, 0, lastUpdatedTime, 0);
    globalTimer = new Timer(globalTimerHTML, 0, lastUpdatedTime, 0);
    if (isNewGame) {
        p1.name = p1Name.innerHTML.slice(0, -5);
        p2.name = p2Name.innerHTML.slice(0, -5);
        turn = Math.random() > 0.5 ? 'p1' : 'p2';
        globalTimer.startTimer();
        toggleTurn();
        board.render();
        changeTurnIcon();
    } else {
        loadSavedGame();
    }
}

/*Obtain all elements from html to use in game.js, and events listeners*/
window.onload = function () {
    savedGames = JSON.parse(localStorage['savedGames'] || '[]');
    savedTimers = JSON.parse(localStorage['savedTimers'] || '[]');
    savedGameIndex = JSON.parse(localStorage['gameIndex'] || '[]');
    p1Name = document.getElementById('p1-name');
    p2Name = document.getElementById('p2-name');
    p1TimerHTML = document.getElementById('p1-time');
    p2TimerHTML = document.getElementById('p2-time');
    globalTimerHTML = document.getElementById('time');
    columnsHTML = document.getElementsByClassName('column');
    boardHTML = document.getElementById('play-area');
    turnHTML = document.getElementById('turn');
    turnHTMLText = document.getElementById('turn-text');
    resetBtn = document.getElementById('reset');
    finalMessage = document.getElementById('finalMessage');
    popupMessage = document.getElementById('message');
    popupWinner = document.getElementById('winner');
    document.getElementById('save').addEventListener('click', saveGame);
    isNewGame = JSON.parse(localStorage['newGame']);
    initialize();
}
