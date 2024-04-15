
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
        let userChosenColor = $(this).attr("id");

        userClickedPattern.push(userChosenColor);

        console.log(userClickedPattern);

        playSound(userChosenColor);

        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });

function playSound (name) {
    let colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}

$(document).keypress(function() {
    
    if (started === false) {

      $("#level-title").text("Level " + level);
      setTimeout(function() {
        nextSequence(); 
      }, 500);
      started = true; 
    } 
});

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success!");
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("Wrong...");
        let wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}