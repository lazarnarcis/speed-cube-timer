let algorithm = document.querySelector("#algorithm");
let basicMoves = ["F", "R", "B", "L", "U", "D", "M", "E", "S"];
let apostropheMoves = [];
let doubleMoves = [];
let rotations = ["x", "y", "z"];
let bigMoves = [];
let maxMoves = 17;
let action;
let body = document.body;
let time = document.querySelector("#time");
let start = false;
let timeS = 0;
let interval;
let statistics = document.querySelector("#mainStatistics");
let storedTime = localStorage.getItem("storedTime") || [];
let averageDiv = document.querySelector("#average");
let average = 0;
let averageP = document.querySelector("#averageP");
let topHTML = document.querySelector("#mainTop");
let startStop = document.querySelector("#startStop");

if (storedTime.length != 0) {
    storedTime = JSON.parse(storedTime);
}

for (let i = 0; i < basicMoves.length; i++) {
    let newMove = basicMoves[i] + "'";
    apostropheMoves = [...apostropheMoves, newMove];
}

for (let y = 0; y < basicMoves.length; y++) {
    let newMove = basicMoves[y] + "2";
    doubleMoves = [...doubleMoves, newMove];
}

for (let z = 0; z < basicMoves.length - 3; z++) {
    let newMove = basicMoves[z] + "w";
    bigMoves = [...bigMoves, newMove];
}

function makeAverage () {
    if (storedTime.length != 0) {
        average = 0;
        averageP.innerHTML = "";
        for (let y = 0; y < storedTime.length; y++) {
            average += Number(storedTime[y]);
        }
        average = average / storedTime.length;
        averageP.innerText = Number(average).toFixed(2) + "s";
        averageDiv.appendChild(averageP);
    }
}

let ascTime = [];

function makeAscending () {
    topHTML.innerHTML = "";
    let divScore = document.createElement("div");
    let bestScore = document.createElement("p"), badScore = document.createElement("p");
    if (storedTime.length != 0) {
        for (let p = 0; p < storedTime.length; p++) {
            ascTime = [...ascTime, Number(storedTime[p])];
        }
        ascTime.sort((a, b) => {
            return a - b;
        });
        bestScore.innerText = "Best Score: " + Number(ascTime[0]).toFixed(2) + "s";
        badScore.innerText = "Bad Score: " + Number(ascTime[ascTime.length - 1]).toFixed(2) + "s";
    } else {
        bestScore.innerText = "Best Score: 0s";
        badScore.innerText = "Bad Score: 0s";
    }
    bestScore.id = "bestScore";
    badScore.id = "badScore";
    divScore.appendChild(bestScore);
    divScore.appendChild(badScore);
    topHTML.appendChild(divScore);
}

function generateAlg() {
    let string = "";
    for (let p = 0; p < maxMoves; p++) {
        let all = [...basicMoves, ...apostropheMoves, ...doubleMoves, ...rotations, ...bigMoves];
        let arrayLength = all.length;
        let randomChar = all[Math.floor((Math.random() * arrayLength) + 0)];
        string = string + randomChar + " ";
    }
    algorithm.innerText = string;
    algorithm.style.padding = "10px 0";
}

let seconds = 0, miliseconds = 0;

function makeInterval () {
    miliseconds++;
    if (miliseconds <= 9) {
        miliseconds = "0" + miliseconds;
    }
    if (miliseconds > 99) {
        seconds++;
        miliseconds = "00";
    }
    timeS = seconds + "." + miliseconds;
    time.innerText = timeS + "s";
    interval = setTimeout(makeInterval, 10);
}

function showStatistics () {
    statistics.innerHTML = "";
    if (storedTime.length != 0) {
        for (let i = 0; i < storedTime.length; i++) {
            let divStatistics = document.createElement("div");
            divStatistics.id = "divStatistics";
            let newStatistics = document.createElement("p");
            newStatistics.id = "timeStatis";
            let idStatistics = document.createElement("p");
            newStatistics.innerText = storedTime[i] + "s";
            idStatistics.innerText = i + 1 + ".";
            divStatistics.appendChild(idStatistics);
            divStatistics.appendChild(newStatistics);
            statistics.appendChild(divStatistics);
        }
    } else {
        statistics.innerHTML = "<p>Not yet!</p>";
    }
}

function onKeyUp() {
    time.style.color = "black";
    body.style.backgroundColor = "lightgreen";
    if (start == true) {
        start = false;
        time.style.color = "black";
        body.style.backgroundColor = "rgb(198, 162, 168)";
        storedTime = [...storedTime, timeS];
        seconds = 0;
        miliseconds = 0;
        localStorage.setItem("storedTime", JSON.stringify(storedTime));
        timeS = Number(0).toFixed(2);
        time.innerText = timeS + "s";
        startStop.innerText = "Start";
        generateAlg();
        showStatistics();
        makeAverage();
        makeAscending();
        clearInterval(interval);
    } else if (start == false) {
        makeInterval();
        start = true;
        algorithm.innerText = "";
        startStop.innerText = "Stop";
        algorithm.style.padding = "0";
    }
}

function onKeyDown() {
    if (start == false) {
        time.style.color = "red";
    }
}

showStatistics();
generateAlg();
makeAscending();
makeAverage();

startStop.addEventListener("click", () => {
    onKeyUp();
});

document.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) onKeyDown();
});

document.addEventListener("keyup", (e) => {
    if (e.keyCode == 32) onKeyUp();
});