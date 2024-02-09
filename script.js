const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;
initGame();

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

function initGame() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });

    gameInfo.innerText = `Current Player - ${currPlayer}`;

}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();
        checkGameOver();
    }
}

function swapTurn() {
    if (currPlayer == "X")
        currPlayer = "O";
    else
        currPlayer = "X";

    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver() {
    let ans = "";
    winningPositions.forEach((arr) => {
        let i = arr[0];
        let j = arr[1];
        let k = arr[2];

        if ((gameGrid[i] == "X" && gameGrid[j] == "X" && gameGrid[k] == "X") ||
            (gameGrid[i] == "O" && gameGrid[j] == "O" && gameGrid[k] == "O")) {
            boxes[i].classList.add("win");
            boxes[j].classList.add("win");
            boxes[k].classList.add("win");

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            newGameBtn.classList.add("active");
            gameInfo.innerText = `WINNER - ${gameGrid[i]}`;
        }
    });

    let flag = true;
    gameGrid.forEach((val) => {
        if (val == "")
            flag = false;
    });

    if (flag == true)
    {
        gameInfo.innerText = `GAME DRAWN`;
        newGameBtn.classList.add("active");
    }

}

newGameBtn.addEventListener("click", initGame);

