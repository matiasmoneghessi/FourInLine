var gameLI = null;
var btnBack = null;
var btnNext = null;
var btnLoad = null;
var btnDelete = null;
var savedGamesHTML = null;
var p1HTML = null;
var p2HTML = null;
var dateHTML = null;
var listSection = null;
var empty = null;
var arrGameLI = null;
var savedGameIndex = null;
var selectedGame = -1;
var start = 0;
var end = 5;

//Gets clicked button and uses its index as a parameter to splice 'savedGames'
//Updates local storage with new 'savedGames' array
var deleteGame = function (e) {
    var btn = Array.from(btnDelete).indexOf(e.target);
    savedGames.splice(savedGames[btn], 1);
    savedTimers.splice(savedTimers[btn], 1);
    localStorage['savedGames'] = JSON.stringify(savedGames);
    localStorage['savedTimers'] = JSON.stringify(savedTimers);
    location.reload();
}

var loadGame = function () {
    var newGame = false;
    localStorage['newGame'] = JSON.stringify(newGame);
    location.href = 'game.html';
}

var selectGame = function (e) {
    selectedGame = arrGameLI.indexOf(e.target);
    savedGameIndex = selectedGame;
    localStorage['gameIndex'] = JSON.stringify(savedGameIndex);
    btnLoad.className = 'btn';
}

//Changes current ul 'page' by modifying the start & end parameters of the displayed games section
var navigation = function (e) {
    var btn = e.target.id;
    if (btn === 'next') {
        start += 5;
        end += 5;
    } else {
        if (start >= 5) {
            start -= 5;
            end -= 5;
        }
    }
    loadSavedGamesData();
}

//Displays only the first 5 saved games by sectioning an array made from gameLI
//and showing only the <li> that are a part of that section
var loadSavedGamesData = function () {
    listSection = arrGameLI.slice(start, end);

    for (var i = 0; i < savedGames.length; i++) {
        p1HTML[i].innerHTML = savedGames[i].p1.name;
        p2HTML[i].innerHTML = savedGames[i].p2.name;
        if (savedGames[i].p3 != null) {
            p3HTML[i].className = 'game-info p3';
            p3HTML[i].innerHTML = savedGames[i].p3.name;
        }
        dateHTML[i].innerHTML = savedGames[i].date;
    }

    for (var l = 0; l < savedGames.length; l++) {
        gameLI[l].className = 'game hidden';
    }

    for (var j = 0; j < listSection.length; j++) {
        listSection[j].className = ' game';
    }
}

var showEmptyList = function () {
    empty.className = ' ';
    btnBack.className += ' disabled';
    btnNext.className += ' disabled';
}

var renderList = function () {
    var storedGames = JSON.parse(localStorage['savedGames']);
    var html = '';
    for (var i = 0; i < storedGames.length; i++) {
        html += '<li tabindex="-1" class="game hidden">';
        html += '<div class="match-container">';
        html += '<div class="game-info p1"></div>';
        html += '<p>VS</p>';
        html += '<div class="game-info p2"></div>';
        if (storedGames[i].p3) { html += '<p>VS</p>'; }
        html += '<div class="game-info p3 hidden"></div>';
        html += '</div>';
        html += '<p class="date"></p><span class="delete">Delete</span>';
        html += '</li>';
    }
    savedGamesHTML.innerHTML = html;
    arrGameLI = Array.from(gameLI);
    loadSavedGamesData();
}

window.onload = function () {
    savedGameIndex = JSON.parse(localStorage['gameIndex'] || '[]');
    savedGames = JSON.parse(localStorage['savedGames'] || '[]');
    savedTimers = JSON.parse(localStorage['savedTimers'] || '[]');
    savedGamesHTML = document.getElementById('games');
    gameLI = document.getElementsByClassName('game');
    p1HTML = document.getElementsByClassName('game-info p1');
    p2HTML = document.getElementsByClassName('game-info p2');
    p3HTML = document.getElementsByClassName('game-info p3');
    dateHTML = document.getElementsByClassName('date');
    empty = document.getElementById('empty');
    btnBack = document.getElementById('back');
    btnNext = document.getElementById('next');
    btnLoad = document.getElementById('load-game');
    btnDelete = document.getElementsByClassName('delete');
    btnLoad.addEventListener('click', loadGame);
    (savedGames.length > 0) ? renderList() : showEmptyList();
    Array.from(btnDelete).forEach(elem => elem.addEventListener('click', deleteGame));
    savedGameIndex = selectedGame;
    localStorage['gameIndex'] = JSON.stringify(savedGameIndex);
    arrGameLI.forEach(elem => elem.addEventListener('click', selectGame));
}