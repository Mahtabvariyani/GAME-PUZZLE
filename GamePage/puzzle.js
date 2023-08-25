//========================================================Audio

let audio = document.getElementById("audio");
let playbtn = document.getElementById("playBtn");
let count = 0;

function play() {
  if (count == 0) {
    count = 1;
    audio.play();
  } else {
    count = 0;
    audio.pause();
  }

  //================================================SmallB Animation
}class Ball {
  constructor(colors) {
    this.colors = colors;
    this.element = document.createElement("div");
    this.element.classList.add("ball");
    this.element.style.background = this.getRandomColor();
    this.element.style.left = `${Math.floor(Math.random() * 100)}vw`;
    this.element.style.top = `${Math.floor(Math.random() * 100)}vh`;
    this.element.style.transform = `scale(${Math.random()})`;
    this.element.style.width = `${Math.random()}em`;
    this.element.style.height = this.element.style.width;
    document.body.append(this.element);
    this.animate();
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  animate() {
    let to = {
      x: Math.random() * (Math.random() > 0.5 ? -11 : 11),
      y: Math.random() * 12,
    };

    this.element.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` },
      ],
      {
        duration: (Math.random() + 1) * 2000,
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );
  }
}

const colors = ["#FBDF2C", "#FB2C74", "#68fcc6", "#FFD92E", "#F95AEF"];
const numBalls = 40;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  balls.push(new Ball(colors));
}

//==========================================================================Board 
let rows = 5;
let columns = 5;

let currTile;
let otherTile;

let turns = 0;

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img>
      let tile = document.createElement("img");

      if ((tile.src = "../IconBackground/blank2.jpg")) {
        tile.style.opacity = "0.5";
      }

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }

  //==========================================================================Pieces 
  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString());
  }
  pieces.reverse();
  for (let i = 0; i < pieces.length; i++) {
    let j = Math.floor(Math.random() * pieces.length);

    let tmp = pieces[i];
    pieces[i] = pieces[j];
    pieces[j] = tmp;
  }

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "../images/" + pieces[i] + ".jpg";

    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragover", dragOver);
    tile.addEventListener("dragenter", dragEnter);
    tile.addEventListener("dragleave", dragLeave);
    tile.addEventListener("drop", dragDrop);
    tile.addEventListener("dragend", dragEnd);

    document.getElementById("gall").append(tile);
  }
};
//==========================================================================DragDrop Function
function dragStart() {
  currTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this;
}
let turnbtn = document.getElementById("turns");
let smallTag = document.getElementsByTagName("figcaption");
function MaxTurn() {
  if (turns >= 35) {
    turnbtn.style.backgroundColor = "#c765a2";
    CustomAlert(".You made more than 30 moves.", "Game Over!");
    /*  window.location.href='./GameOver/html.html'; */
  }
}

function dragEnd() {
  if (currTile.src.includes("blank")) {
    return;
  }

  let currImg = currTile.src;
  let otherImg = otherTile.src;

  currTile.src = otherImg;
  otherTile.src = currImg;

  otherTile.style.opacity = "1";

  turns += 1;
  document.getElementById("turns").innerText = turns;
  MaxTurn();
}


//==========================================================================Buttons
function CustomAlert(message, title) {
  console.log("triggered");
  this.alert = function (message, title) {
    document.body.innerHTML =
      document.body.innerHTML +
      '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

    let dialogoverlay = document.getElementById("dialogoverlay");
    let dialogbox = document.getElementById("dialogbox");

    let winH = window.innerHeight;
    dialogoverlay.style.height = winH + "px";

    dialogbox.style.top = "100px";

    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";

    document.getElementById("dialogboxhead").style.display = "block";

    if (typeof title === "undefined") {
      document.getElementById("dialogboxhead").style.display = "none";
    } else {
      document.getElementById("dialogboxhead").innerHTML =
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
    }
    document.getElementById("dialogboxbody").innerHTML = message;
    document.getElementById("dialogboxfoot").innerHTML =
      '<button class="pure-material-button-contained active" onclick="refreshPage()">Ok</button>';
  };

  this.ok = function () {
    document.getElementById("dialogbox").style.display = "none";
    document.getElementById("dialogoverlay").style.display = "none";
  };
  this.alert(message, title);
}

function refreshPage() {
  window.location.href = "../GameOver/html.html";
}
function wanna() {
  window.location.reload();
}
