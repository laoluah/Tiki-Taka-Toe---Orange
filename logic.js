let fullBg = document.querySelector(".full");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let newgameBtn = document.querySelector(".newgameBtn");
let showWin = document.querySelector(".showWin");
let hiddenMsg = document.querySelector(".hidden-msg");
let reBtn = document.querySelector(".button_top");
let playBoard = document.querySelector(".play-board");
let banner = document.querySelector(".banner");

let data = document.querySelector(".data")
let playerO = document.querySelector("#playerO")
let playerX = document.querySelector("#playerX")
let goal = document.querySelector("#goal")

let radio = document.querySelector(".radio")



let user1Img = document.querySelector(".user1-avt");
let user2Img = document.querySelector(".user2-avt");

//scoreBoard

let playerOname = document.querySelector(".playerOname")
let playerXname = document.querySelector(".playerXname")
let target = document.querySelector(".target")


let scoreO = document.querySelector(".scoreO")
let scoreX = document.querySelector(".scoreX")
let scoreTie = document.querySelector(".scoreTie")


document.querySelector('form').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();
    fullBg.style.backgroundColor = "#343434"
    playBoard.style.display = 'block';
    banner.style.display = 'none';
    data.style.display = 'none';
    playerOname.innerHTML = playerO.value;
    playerXname.innerHTML = playerX.value;
    target.innerHTML = `Target To Win: ${goal.value}`;


    let avt1 = document.querySelector('input[name="user1Avt"]:checked').value;
    let avt2 = document.querySelector('input[name="user2Avt"]:checked').value;

    user1Img.innerHTML = `<img src= " ${avt1}">`
    user2Img.innerHTML = `<img src= " ${avt2}">`

});

let turnO = true;//to start game 
let gotWinner = false;


let resetNewGame = () => {
    resetColor();
    let turnO = true;
    enableAllBtns();
    hiddenMsg.classList.add("hide");
    gotWinner = false;

    clickedButtons.clear();
}

//there are total 8 winning conditions
const winnerPat = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const clickedButtons = new Set();
//this funtion is use change text value X later O repetedly
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO == true) {
            box.innerText = "O"
            turnO = false;
        } else {
            box.innerText = "X"
            turnO = true;
        }
        box.disabled = true;

        //check for tie
        clickedButtons.add(box);

        console.log(clickedButtons.add(box))
        if (clickedButtons.size === boxes.length && gotWinner == false) {

            scoreTie.textContent = parseInt(scoreTie.textContent) + 1;


            reBtn.innerText = "Next";
        }
        checkWinner();
    })
})

//to check the winner if the winner condition satisifies
const checkWinner = () => {
    for (let patter of winnerPat) {
        let pos1V = boxes[patter[0]].innerText;
        let pos2V = boxes[patter[1]].innerText;
        let pos3V = boxes[patter[2]].innerText;

        if (pos1V != "" && pos2V != "" && pos3V != "") {
            if (pos1V === pos2V && pos2V === pos3V) {
                let p1 = boxes[patter[0]].style.background = "#343434";
                let p2 = boxes[patter[1]].style.background = "#343434";
                let p3 = boxes[patter[2]].style.background = "#343434";

                let c1 = boxes[patter[0]].style.color = "white";
                let c2 = boxes[patter[1]].style.color = "white";
                let c3 = boxes[patter[2]].style.color = "white";
                console.log(pos1V + "is Winner");
                gotWinner = true;
                if (pos1V === "O") {
                    scoreO.textContent = parseInt(scoreO.textContent) + 1;
                }
                else if (pos1V === "X") {
                    scoreX.textContent = parseInt(scoreX.textContent) + 1;
                }

                showWinner(pos1V);
                disableAllBtns();
            }
        }
    }

};

//winner board is hidden , showes up when checkWinner(); calls..
const showWinner = (winner) => {
    if (goal.value === scoreX.textContent) {
        showWin.innerText = `🏅 Winner ${playerX.value} 🏆`;
        hiddenMsg.classList.remove("hide");
    } else if (goal.value === scoreO.textContent) {
        showWin.innerText = `🏅 Winner ${playerO.value} 🏆`;
        hiddenMsg.classList.remove("hide");
        resetBtn.style.display = "none";

    }

};


//diables all the buutons once winner shows up..
const disableAllBtns = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

//enables all buttons when reset or new game button is clicked..
const enableAllBtns = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


resetBtn.addEventListener("click", () => {
    resetNewGame();
})

newgameBtn.addEventListener("click", () => {
    resetNewGame();
    location.reload();
})

//winner box color are again brought back to initial color..
const resetColor = () => {
    for (let patter of winnerPat) {
        let pos1V = boxes[patter[0]].innerText;
        let pos2V = boxes[patter[1]].innerText;
        let pos3V = boxes[patter[2]].innerText;

        if (pos1V != "" && pos2V != "" && pos3V != "") {
            if (pos1V === pos2V && pos2V === pos3V) {
                let p1 = boxes[patter[0]].style.background = "white";
                let p2 = boxes[patter[1]].style.background = "white";
                let p3 = boxes[patter[2]].style.background = "white";

                let c1 = boxes[patter[0]].style.color = "orange";
                let c2 = boxes[patter[1]].style.color = "orange";
                let c3 = boxes[patter[2]].style.color = "orange";
            }
        }
    }

};
