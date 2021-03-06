const grid = document.querySelector(".grid");
const width = 8;
const squares = [];
let score = 0;
let x = 0;

document.querySelector(".score").innerHTML = "Score: " + score;
const candyColors = [
  "url(pictures/1.png)",
  "url(pictures/2.png)",
  "url(pictures/3.png)",
  "url(pictures/4.png)",
  "url(pictures/5.png)",
  "url(pictures/6.png)",
];

function updateScore() {
  document.querySelector(".score").innerHTML = "Score: " + score;
  if (x === 0) {
    if (score >= 50) {
      youWon();
      x = 1;
    }
  }
}

function youWon() {
  $("#fire-work-bg").css("display", "flex");
  $("#fire-work-bg").fireworks();
  $("#fire-work-bg").css("opacity", "0.7");
  let congratsMess = $("<h3>").html("YOU WON YOU CRAZY AVOCADO!");
  let playAgain = $("<button>").html("<i class='fas fa-undo-alt'></i> PLAY AGAIN");
  playAgain.attr("id", "clickButton");
  playAgain.attr("type", "button").css("z-index", "100");
  playAgain.on("click", function () {
    location.reload();
  });
  $("#fire-work-bg").append(congratsMess);
  $("#fire-work-bg").append(playAgain);
}

function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    let randomColor = Math.floor(Math.random() * candyColors.length);
    square.style.backgroundImage = candyColors[randomColor];
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();

let colorBeingDragged;
let colorBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach((square) => square.addEventListener("dragstart", dragStart));
squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
squares.forEach((square) => square.addEventListener("drop", dragDrop));
squares.forEach((square) => square.addEventListener("dragover", dragOver));
squares.forEach((square) => square.addEventListener("dragend", dragEnd));

function dragStart() {
  colorBeingDragged = this.style.backgroundImage;
  squareIdBeingDragged = parseInt(this.id);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  colorBeingReplaced = this.style.backgroundImage;
  squareIdBeingReplaced = parseInt(this.id);
  this.style.backgroundImage = colorBeingDragged;
  squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
}

function dragEnd() {
  let validMoves = [
    squareIdBeingDragged - 1,
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width,
  ];

  let validMove = validMoves.includes(squareIdBeingReplaced);

  if (squareIdBeingReplaced && validMove) {
    let scoredRowOfFive = checkRowForFive();
    let scoredColumnOfFive = checkColumnForFive();
    let scoredRowOfFour = checkRowForFour();
    let scoredColumnOfFour = checkColumnForFour();
    let scoredRowOfThree = checkRowForThree();
    let scoredColumnOfThree = checkColumnForThree();
    //check if any combo was scored
    if (
      scoredRowOfFour ||
      scoredColumnOfFour ||
      scoredRowOfFour ||
      scoredColumnOfFour ||
      scoredRowOfThree ||
      scoredColumnOfThree
    ) {
      squareIdBeingReplaced = null;
    }
    //if no combo scored swap back to original candies
    else if (
      !scoredRowOfFive &&
      !scoredRowOfFive &&
      !scoredRowOfFour &&
      !scoredColumnOfFour &&
      !scoredRowOfThree &&
      !scoredColumnOfThree
    ) {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
    }
  } else if (squareIdBeingReplaced && !validMove) {
    squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  } else
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
}

function moveDown() {
  for (let i = 0; i <= 55; i++) {
    if (squares[i + width].style.backgroundImage === "") {
      squares[i + width].style.backgroundImage =
        squares[i].style.backgroundImage;
      squares[i].style.backgroundImage = "";
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && squares[i].style.backgroundImage === "") {
        let randomColor = Math.floor(Math.random() * candyColors.length);
        squares[i].style.backgroundImage = candyColors[randomColor];
      }
    }
  }
}

function checkRowForFive() {
  for (let i = 0; i <= 60; i++) {
    let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
    let decidedColor = squares[i].style.backgroundImage;
    const isBlank = squares[i].style.backgroundImage === "";
    const notValid = [
      4,
      5,
      6,
      7,
      12,
      13,
      14,
      15,
      20,
      21,
      22,
      23,
      28,
      29,
      30,
      31,
      36,
      37,
      38,
      39,
      44,
      45,
      46,
      47,
      52,
      53,
      54,
      55,
    ];

    if (notValid.includes(i)) continue;

    if (
      rowOfFive.every(
        (index) =>
          squares[index].style.backgroundImage === decidedColor && !isBlank
      )
    ) {
      score += 5;
      rowOfFive.forEach((index) => {
        squares[index].style.backgroundImage = "";
      });
      updateScore();
      return true;
    }
  }
  return false;
}

function checkColumnForFive() {
  for (let i = 0; i <= 31; i++) {
    let columnOfFive = [
      i,
      i + width,
      i + width * 2,
      i + width * 3,
      i + width * 4,
    ];
    let decidedColor = squares[i].style.backgroundImage;
    const isBlank = squares[i].style.backgroundImage === "";

    if (
      columnOfFive.every(
        (index) =>
          squares[index].style.backgroundImage === decidedColor && !isBlank
      )
    ) {
      score += 5;

      columnOfFive.forEach((index) => {
        squares[index].style.backgroundImage = "";
      });
      updateScore();
      return true;
    }
  }
  return false;
}

function checkColumnForFour() {
  for (let i = 0; i <= 39; i++) {
    let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
    let decidedColor = squares[i].style.backgroundImage;
    const isBlank = squares[i].style.backgroundImage === "";

    if (
      columnOfFour.every(
        (index) =>
          squares[index].style.backgroundImage === decidedColor && !isBlank
      )
    ) {
      score += 4;

      columnOfFour.forEach((index) => {
        squares[index].style.backgroundImage = "";
      });
      updateScore();
      return true;
    }
  }
  return false;
}

function checkRowForFour() {
  for (let i = 0; i <= 60; i++) {
    let rowOfFour = [i, i + 1, i + 2, i + 3];
    let decidedColor = squares[i].style.backgroundImage;
    const isBlank = squares[i].style.backgroundImage === "";
    const notValid = [
      5,
      6,
      7,
      13,
      14,
      15,
      21,
      22,
      23,
      29,
      30,
      31,
      37,
      38,
      39,
      45,
      46,
      47,
      53,
      54,
      55,
    ];

    if (notValid.includes(i)) continue;

    if (
      rowOfFour.every(
        (index) =>
          squares[index].style.backgroundImage === decidedColor && !isBlank
      )
    ) {
      score += 4;
      rowOfFour.forEach((index) => {
        squares[index].style.backgroundImage = "";
      });
      updateScore();
      return true;
    }
  }
  return false;
}

function checkRowForThree() {
  for (let i = 0; i <= 61; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let decidedColor = squares[i].style.backgroundImage;
    const isBlank = squares[i].style.backgroundImage === "";
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];

    if (notValid.includes(i)) continue;

    if (
      rowOfThree.every(
        (index) =>
          squares[index].style.backgroundImage === decidedColor && !isBlank
      )
    ) {
      score += 3;
      rowOfThree.forEach((index) => {
        squares[index].style.backgroundImage = "";
      });
      updateScore();
      return true;
    }
  }
  return false;
}

function checkColumnForThree() {
  for (let i = 0; i <= 47; i++) {
    let columnOfThree = [i, i + width, i + width * 2];
    let decidedColor = squares[i].style.backgroundImage;
    const isBlank = squares[i].style.backgroundImage === "";

    if (
      columnOfThree.every(
        (index) =>
          squares[index].style.backgroundImage === decidedColor && !isBlank
      )
    ) {
      score += 3;

      columnOfThree.forEach((index) => {
        squares[index].style.backgroundImage = "";
      });
      updateScore();
      return true;
    }
  }
  return false;
}

window.setInterval(function () {
  checkRowForFive();
  checkColumnForFive();
  checkRowForFour();
  checkColumnForFour();
  checkRowForThree();
  checkColumnForThree();
  moveDown();
}, 100);
