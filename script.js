// add javascript here
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

function play(){
    score = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUp.disabled = false;
    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = "Guess a number from 1-" + level;
    answer = Math.floor(Math.random()*level)+1;
    guess.placeholder = answer;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Enter a Valid #1-" + level;
        return;
    }
    score++;
    if(userGuess < answer){
        msg.textContent = playername + ", your guess was too low!"
    }
    else if(userGuess > answer){
        msg.textContent = playername + ", your guess was too high!"
    }
    else{
        msg.textContent = "Congratulations, " + playername + " you guessed correctly! It took you " + score + " tries. Press play to play again."
        updateScore();
        reset();
    }
    let diff = Math.abs(userGuess - answer);
    if (diff >= level/2) {
        msg.textContent += " You are cold.";
    }
    else if (diff >= level/4) {
        msg.textContent += " You are warm.";
    }
    else {
        msg.textContent += " You are hot!";
    }
    let rating = "";
    if (score <= 3) rating = "Amazing!";
    else if (score <= 6) rating = "Good job.";
    else if (score <= 10) rating = "Not bad.";
    else rating = "Try again to improve your score!";

    msg.textContent += " " + rating;
}
function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    giveUp.disabled = true;
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    for(let i=0; i<scoreArr.length; i++){
        sum += scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}
function time(){
    let d = new Date();
    return d;
}

function getName() {
    let name = document.getElementById("username").value;
    if (name == "") return null;

    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return name;
}

let playername = getName();

giveUp.addEventListener("click", giveUpGame);

function giveUpGame() {
    msg.textContent = "You gave up! The answer was " + answer + ".";
    score = parseInt(level);
    updateScore();
    reset();
}


