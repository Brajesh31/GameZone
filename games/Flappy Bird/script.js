// Game setup and variables
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg = new Image();
birdImg.src = "assets/bird1.png";

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg = new Image();
topPipeImg.src = "assets/pipe-top.png";

let bottomPipeImg = new Image();
bottomPipeImg.src = "assets/pipe-bottom.png";

let velocityX = -2;
let velocityY = 0;
let gravity = 0.15;

let gameOver = false;
let gameStarted = false;
let score = 0;
let highscore = 0;

window.onload = function () {
  board = document.getElementById("board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  showInstruction();

  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
  document.addEventListener("keydown", moveBird);
};

function update() {
  requestAnimationFrame(update);
  if (!gameStarted || gameOver) return;

  context.clearRect(0, 0, board.width, board.height);

  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > board.height) {
    gameOver = true;
    if (score > highscore) highscore = score;
  }

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
      if (score > highscore) highscore = score;
    }
  }

  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  // Score
  context.fillStyle = "red";
  context.font = "30px Arial";
  context.fillText("Score: " + Math.floor(score), 10, 40);

  context.font = "20px Arial";
  context.fillText("High Score: " + highscore, 10, 70);

  if (gameOver) {
    context.fillStyle = "red";
    context.font = "28px Arial";
    const msg = "GAME OVER";
    const restart = "Press SPACE to Restart";
    context.fillText(msg, (boardWidth - context.measureText(msg).width) / 2, boardHeight / 2);
    context.fillText(restart, (boardWidth - context.measureText(restart).width) / 2, boardHeight / 2 + 40);
  }
}

function placePipes() {
  if (gameOver || !gameStarted) return;

  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  let openingSpace = board.height / 4;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    velocityY = -6;

    if (!gameStarted) {
      gameStarted = true;
      return;
    }

    if (gameOver) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      gameOver = false;
      gameStarted = false;
      showInstruction();
    }
  }
}

function showInstruction() {
  context.clearRect(0, 0, board.width, board.height);
  context.fillStyle = "red";
  context.font = "22px Arial";
  const text = "Press Space to Start the Game";
  context.fillText(text, (boardWidth - context.measureText(text).width) / 2, boardHeight / 2);
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
