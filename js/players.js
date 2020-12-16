class Player {
    constructor(name) {
        this.name = name;
    }
}

var p1Name = null;
var p2Name = null;
var btnStart = null;
var btnAdd = null;
var btnAddContainer = null;
var errorMsg = null;
var playerNames = [];

var validateInput = function () {
    var isValid = true;
    if (p1Name.value.length < 4) {
        p1Name.value = '';
        p1Name.placeholder = 'Name too short!';
        isValid = false;
    }
    if (p2Name.value.length < 4) {
        p2Name.value = '';
        p2Name.placeholder = 'Name too short!';
        isValid = false;
    }
    return isValid;
}

var savePlayerNames = function () {
    playerNames.push({ namep1: p1Name.value, namep2: p2Name.value });
    localStorage['playersNames'] = JSON.stringify(playerNames);
}

var nextPage = function () {
    savePlayerNames();
    var newGame = true;
    localStorage['newGame'] = JSON.stringify(newGame);
    location.href = 'index.html';
}

window.onload = function () {
    p1Name = document.getElementById('p1-name');
    p2Name = document.getElementById('p2-name');
    btnStart = document.getElementById('start-btn');
    btnAdd = document.getElementById('add-player');
    btnAddContainer = document.getElementById('btn-container');
    errorMsg = document.getElementById('error');
    btnStart.addEventListener('click', function () {
        (validateInput()) ? nextPage() : console.log('Debe completar los inputs de la forma requerida');
    });
}