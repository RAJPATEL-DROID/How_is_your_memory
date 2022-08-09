let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

let gamePattern = [];
let level = -1;
let hasKeyPressed = false;

$(document).keypress(function() {
  if (hasKeyPressed !== true) {
    $("#level-title").text("Level " + level);

    nextSequence();
    hasKeyPressed = true;

  }
});

$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

var nextSequence = function() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.trunc(Math.random() * 3 + 1);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).delay(100).fadeOut().fadeIn("slow");
  playSound(randomChosenColor);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("#level-title").text("Game Over,Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level  =-1;
  gamePattern=[];
  hasKeyPressed=false;
}
