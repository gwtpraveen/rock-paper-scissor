const rockEl = document.getElementById("rock");
const paperEl = document.getElementById("paper");
const scissorEl = document.getElementById("scissor");

const gameContainerEl = document.querySelector(".game-container");
const resultContainerEl = document.querySelector(".result-container");
const yourChoiseIcon = document.querySelector(".your-choise-icon");

const messageEl = document.querySelector(".result-container .middle");

const PAPER = "paper";
const SCISSOR = "scissor";
const ROCK = "rock";
const CHOICES = [ROCK, PAPER, SCISSOR];

const iconsEl = document.createElement("div");
const imgEl = document.createElement("img");
iconsEl.append(imgEl);
iconsEl.classList.add("icons")

const data = {
    "scissor" : {
        "icon" : "./images/icon-scissors.svg"
    },
    "rock" : {
        "icon" : "./images/icon-rock.svg"
    }, 
    "paper" : {
        "icon" : "./images/icon-paper.svg"
    }
}


function winOrNot(userChoise, computerChoise) {
    if (userChoise === ROCK && computerChoise === SCISSOR) {
        return "win";
    } else if (userChoise === PAPER && computerChoise === ROCK) {
        return "win";
    } else if (userChoise === SCISSOR && computerChoise === PAPER) {
        return "win";
    } else if (userChoise == computerChoise){
        return "draw"
    } 
    else {
        return "lost";
    }
}


function randomChoise() {
    return CHOICES[Math.floor(Math.random() * 3)]
}


rockEl.addEventListener("click", () => {
    const computerChoise = randomChoise();
    const userChoise = ROCK;
    gameContainerEl.style.display = "none";
    resultContainerEl.style.display = "flex";
    yourChoiseIcon.src = "./images/icon-rock.svg";
    setTimeout(() => {
        document.querySelector(".empty").remove();
        imgEl.src = data[computerChoise]["icon"]
        document.querySelector(".right").append(iconsEl);
        const result = winOrNot(userChoise, computerChoise);
        setTimeout(() => {
            if (result === "win") {
                const leftEl = document.querySelector(".result-container .left");
                const spanEl = document.createElement("span");
                spanEl.classList.add("circles");
                leftEl.append(spanEl);
                messageEl.firstElementChild.innerText = "YOU WIN";
                messageEl.style.display = "block";
            } else if (result === "lost") {
                const rightEl = document.querySelector(".result-container .right");
                const spanEl = document.createElement("span");
                spanEl.classList.add("circles");
                rightEl.append(spanEl);
                messageEl.firstElementChild.innerText = "YOU LOSE";
                messageEl.style.display = "block";
            } else {
                messageEl.firstElementChild.innerText = "DRAW";
                messageEl.style.display = "block";
            }
        }, 500)
    }, 1000)


});

paperEl.addEventListener("click", () => {
    console.log("click paper");
});

scissorEl.addEventListener("click", () => {
    console.log("click scissor");
});

