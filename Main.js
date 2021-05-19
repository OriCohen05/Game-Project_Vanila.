
//אלמנטים חיצוניים
var modalWrapper = document.getElementById("modal-wrapper");
var modalElement = document.getElementById("modal-content");
var modalTimer = document.getElementById("modal-timer");
var gametable = document.getElementById("gametable1");
var score = document.getElementById("Score");
var startGameButton = document.getElementById("playbutton");
var timer = document.getElementById("timer");
var hard = document.getElementById("hard");
var medium = document.getElementById("medium");
var easy = document.getElementById("easy");
var gamediv = document.getElementById("GameDiv");
var elemBestScore = document.getElementById('bestScore');
//משתנים גלובליים
var bestScore;
var allHoles = [];
var gcount = 0;
var timeUp;
var points = 0;
var time;
var gBoardSize = 0;
var gFlag = false;
var counter;
var gPlayTime;
var countDownInterval;
function saveToStorage(key,val){
    localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key){
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}


function resetHoles() {
    for (var i = 0; i <= gBoardSize; i++) {
        allHoles[i].setAttribute('src', 'Images/hole.png');
    }
}

function OnStartGame() {
    
    gametable.innerHTML = '';
    BuildGameTable();
    if (!gFlag) {
        alert("Choose board before start!"); // Pop up
        easy.disabled = false;
        medium.disabled = false;
        hard.disabled = false;
        resetGame();        
    } else {
        gamediv.style.visibility = "visible"
        startGameButton.disabled = true;
        counter = 2;
        modalElement.classList.toggle("hide");
        countDownInterval = setInterval('countDown()', 1000);
}
}
function GenerateHoles() {
    resetHoles();
    var randomHole = Math.floor(Math.random() * gBoardSize);
    console.log(randomHole,allHoles);
    allHoles[randomHole].setAttribute('src', 'Images/Logo.png');
}
function ClickToScore(object) {
    var source = object.src;
    if (source.search("Images/Logo.png") != -1) //מחפש את הסטרינג ומחזיר את האינדקס שהוא מתחיל בו בסטרינג שבו חיפשתי
    //-1 במקרה שלי הוא false
    {
        points++;
        score.innerHTML = `Your score: ${points} !`;
        object.src = "Images/hole.png";
    }
}
function BuildGameTable(){
    var modalC = document.createElement('div');
    var count = 1;
    var placement = ''
    var src = 'Images/hole.png';
        modalC.setAttribute('id','modal-content');
        for(var j = 1; j <= 3; j++){
            if(j == 1){
                placement = 'first';
            }
            else if(j == 2){
                placement = 'second';
            }
            else if(j == 3){
                placement = 'third';
            }
            var tr = document.createElement('tr');
            tr.setAttribute('id', `${placement}row`);
            console.log(gBoardSize);
            for(var i = 1; i < gBoardSize / 2; i++){
                var td = document.createElement('td');
                td.setAttribute('class','gametds');
                var img = document.createElement('img');
                img.setAttribute('id',`img${count}`);
                count++;
                img.setAttribute('src', src);
                img.setAttribute('onclick', 'ClickToScore(this)');
                allHoles.push(img);
                td.appendChild(img);
                tr.appendChild(td);
                console.log(gBoardSize);
            }
            gametable.append(tr);

        }
}


function resetGame() {
    alert("rs");
    count = 0;
    gcount = 0;
    gBoardSize = 0;
    score.innerHTML = "";
    allHoles = [];
    startGameButton.disabled = false;
    resetHoles();
    clearInterval(time);
    clearInterval(timeUp);
    gcount = 0;
    timer.innerHTML = "";
    gamediv.style.visibility = "hidden";
    gFlag = false;
    alert("hey")
}
//פונקציה שמחזירה את כל החורים למצב הרגיל (רק חורים)

//פונקציה שמעלה את הניקוד על פי סורס

//פונקציה שמגרילה חור רנדומלי


function roundTimer() {
    timer.innerHTML = "game timer: " + gcount;
    gcount += 1;
    if (gcount == 5) {
        
        if(points >= bestScore){
            saveToStorage("bestScore", points);
            elemBestScore.innerHTML = points; 
        }
        alert(); // **POP up alert soon / ignore this comment**
        clearInterval(timeUp);
        timer.innerHTML = '';
        count = 0;
        gcount = 0;
        allHoles = [];
        gamediv.innerHTML = '';
        gametable.innerHTML = '';
        resetHoles();
        gamediv.style.visibility = "hidden";
        resetGame();
    }

}

function countDown() {
    console.log(counter);
    modalElement.innerHTML = counter;
            counter--;
            if (counter == -1) {
                console.log("hey");
                clearInterval(countDownInterval);
                modalElement.style.display = "none";
                timeUp = setInterval(roundTimer, 1000);
                time = setInterval(GenerateHoles, gPlayTime);
            }
}

function onStartEasy() {
    gBoardSize = 9;
    gFlag = true;
    gPlayTime = 2000;
}

function onStartMedium() {
    gBoardSize = 12;
    gFlag = true;
    gPlayTime = 1200;
}

function onStartHard() {
    gBoardSize = 21;
    gFlag = true;
    gPlayTime = 750;
}

function OnInit() {
    modalElement.classList.toggle("hide");
    bestScore = loadFromStorage('bestScore');
    if(!bestScore){
        elemBestScore.innerHTML = 0;
    } else elemBestScore.innerHTML = bestScore;  
}

console.info("All rights saved to Ori Cohen.");
