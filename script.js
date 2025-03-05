let gameover = new Audio("assets/gameover.mp3")
let audioTurn = new Audio("assets/ting.mp3")
let turn = "X"
let isGameOver = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext")
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isGameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isGameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    })
})

// Function to check the win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) &&
            (boxtexts[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Wins!";
            isGameOver = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "150px"
            gameover.play();
            e.forEach(index => {
                boxtexts[index].parentElement.classList.add('win');
            });
        }
    });
}

// Reset Button Logic
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
        element.parentElement.classList.remove('win');
    });
    turn = "X";
    isGameOver = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})