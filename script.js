let paragraph = document.querySelector("#demo");
let basicMoves = ["F", "R", "B", "L", "U", "D", "M", "E", "S"];
let apostropheMoves = [];
let doubleMoves = [];
let rotations = ["x", "y", "z"];
let bigMoves = [];
let maxMoves = 25;

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

function generateAlg() {
    let string = "";
    for (let p = 0; p < maxMoves; p++) {
        let randomMove = Math.floor((Math.random() * 5) + 1);
        let myString = [];

        switch (randomMove) {
            case 1: 
                myString = basicMoves;
                break;
            case 2:
                myString = apostropheMoves;
                break;
            case 3:
                myString = doubleMoves;
                break;
            case 4:
                myString = rotations;
                break;
            default:
                myString = bigMoves;
                break;
        }

        let arrayLength = myString.length;
        let randomChar = myString[Math.floor((Math.random() * arrayLength) + 0)];
        string = string + randomChar + " ";
    }

    paragraph.innerText = string;
}