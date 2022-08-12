const rockEl = document.getElementById("rock");
const paperEl = document.getElementById("paper");
const scissorEl = document.getElementById("scissor");

const gameContainerEl = document.querySelector(".game-container");
const resultContainerEl = document.querySelector(".result-container");
const yourChoiseIcon = document.querySelector(".your-choise-icon");

const messageEl = document.querySelector(".result-container .middle");
const scoreEl = document.querySelector(".header .score-container .score");
const playAgainBtnEl = document.querySelector(".middle .play-again-btn");

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


// set score 
let score;
try {
    score = Number(localStorage.getItem("score"))
} catch(err) {
    localStorage.setItem("score", 0)
    score = 0;
} finally {
    scoreEl.innerText = score;
}


function updateScore() {
    score++;
    scoreEl.innerText = score;
    localStorage.setItem("score", score);
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


function playAgain() {
    resultContainerEl.style.display = "none";
    gameContainerEl.style.display = "block";
    try {
        document.querySelector(".circles").remove();
    } catch (err) {
        console.warn("removing circles")
    }
    document.querySelector(".right .icons").remove();
    const spanEl = document.createElement("span");
    spanEl.classList.add("empty");
    document.querySelector(".right").append(spanEl);

    messageEl.style.display = "none";
}


function main(icon) {
    const computerChoise = randomChoise();
    const userChoise = icon;
    gameContainerEl.style.display = "none";
    resultContainerEl.style.display = "flex";
    yourChoiseIcon.src = data[icon]["icon"];
    
    setTimeout(() => {
        try {
            document.querySelector(".empty").remove();
        } catch (err) {
            console.warn("nothing")
        }
        imgEl.src = data[computerChoise]["icon"]
        document.querySelector(".right").append(iconsEl);
        
        // Determine whether or not the user won
        const result = winOrNot(userChoise, computerChoise);
        setTimeout(() => {
            // Dispaly the corresponding message
            if (result === "win") {
                const leftEl = document.querySelector(".result-container .left");
                const spanEl = document.createElement("span");
                spanEl.classList.add("circles");
                leftEl.append(spanEl);
                messageEl.firstElementChild.innerText = "YOU WIN";
                messageEl.style.display = "block";
                updateScore();
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
}


rockEl.addEventListener("click", () => {
    main(ROCK)
});

paperEl.addEventListener("click", () => {
    main(PAPER)
});

scissorEl.addEventListener("click", () => {
    main(SCISSOR)
});

playAgainBtnEl.addEventListener("click", playAgain);
