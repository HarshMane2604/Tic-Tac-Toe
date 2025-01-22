const boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let mess = document.querySelector("#mess");

let turnO = true;
const winPatters = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("clicked");
    box.innerText = "X";
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const resetGame= () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide")
}

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) =>{
    mess.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

}

const checkWinner = () => {
  let winnerFound = false
  for (let pattern of winPatters) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            winnerFound = true;
            showWinner(pos1Val);
            break;
        }
      }
  }
  if(!winnerFound){
    checkDraw();
  }
};

const checkDraw = () => {
  let isDraw = true;
  for (let box of boxes) {
    if(box.innerText === ""){
      isDraw = false;
      break;
    }
  }
  if(isDraw){
    mess.innerText = "It is draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};


newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);

const themeToggleBtn = document.querySelector("#themeToggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Toggle between sun and moon icons
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.innerText = "🌙"; // Moon icon
  } else {
    themeToggleBtn.innerText = "🌞"; // Sun icon
  }
});

