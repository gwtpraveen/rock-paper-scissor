const root = document.documentElement;
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
        "icon" : "./images/icon-scissors.svg",
        "color" : "hsl(40, 84%, 53%)",
        "shadow" : "hsl(39, 87%, 31%)"
    },
    "rock" : {
        "icon" : "./images/icon-rock.svg",
        "color" : "hsl(349, 70%, 56%)",
        "shadow" : "hsl(349, 64%, 37%)"
    }, 
    "paper" : {
        "icon" : "./images/icon-paper.svg",
        "color" : "hsl(230, 89%, 65%)",
        "shadow" : "hsl(230, 56%, 43%)"
    }
}


// set score 
let score;
// try to get score from the local storage 
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
    // update the DOM and the local storage
    scoreEl.innerText = score;
    localStorage.setItem("score", score);
}

// game main logic 
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
    // return a random choice from the CHOICES array.
    return CHOICES[Math.floor(Math.random() * 3)]
}


function playAgain() {
    resultContainerEl.style.display = "none";
    gameContainerEl.style.display = "block";
    // remove circles around the winning icon
    try {
        document.querySelector(".circles").remove();
    } catch (err) {
        console.warn("removing circles")
    }
    // remove icons div
    document.querySelector(".right .icons").remove();
    // append empty div
    const spanEl = document.createElement("span");
    spanEl.classList.add("empty");
    document.querySelector(".right").append(spanEl);
    // hide middle message block
    messageEl.style.display = "none";
}


function main(icon) {
    const computerChoise = randomChoise();
    const userChoise = icon;

    // update the outline and shadow colors CSS variables
    root.style.setProperty("--left-color", data[icon]["color"]);
    root.style.setProperty("--left-shadow", data[icon]["shadow"]);
    root.style.setProperty("--right-color", data[computerChoise]["color"]);
    root.style.setProperty("--right-shadow", data[computerChoise]["shadow"]);
    gameContainerEl.style.display = "none";
    resultContainerEl.style.display = "flex";
    yourChoiseIcon.src = data[icon]["icon"];
    
    setTimeout(() => {
        document.querySelector(".empty").remove();
        imgEl.src = data[computerChoise]["icon"]
        document.querySelector(".right").append(iconsEl);
        
        // Determine whether or not the user won
        const result = winOrNot(userChoise, computerChoise);
        setTimeout(() => {
            // Dispaly the corresponding message
            const spanEl = document.createElement("span");
            spanEl.classList.add("circles");
            if (result === "win") {
                const leftEl = document.querySelector(".result-container .left");
                leftEl.append(spanEl);
                messageEl.firstElementChild.innerText = "YOU WIN";
                updateScore();
            } else if (result === "lost") {
                const rightEl = document.querySelector(".result-container .right");
                rightEl.append(spanEl);
                messageEl.firstElementChild.innerText = "YOU LOSE";
            } else {
                messageEl.firstElementChild.innerText = "DRAW";
            }
            messageEl.style.display = "block";
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

// event listener for paly again button 
playAgainBtnEl.addEventListener("click", playAgain);

document.querySelector(".rules-btn").addEventListener("click", () => {
    document.body.classList.toggle("show");
})

document.querySelector(".close-img").addEventListener("click", () => {
    document.body.classList.remove("show");
})
