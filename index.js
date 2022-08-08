var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelNum = 1;
var check = true;
var count = 0;
var condition = true;
var done = false;
var i = 0;
function nextSequence() {
  if (check) {
    var level = "Level " + levelNum;
    $("h1").text(level);
    levelNum++;
    check = false;
    count++;
    return Math.floor((Math.random() * 4));
  }
}

function playSound(randomChosenColour) {
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function wrong() {
  userClickedPattern = [];
  gamePattern = [];
  levelNum = 1;
  count = 0;
  $("body").css("background-color", "red");
  setTimeout(function() {
    $("body").css("background-color", "#011F3F")
  }, 100);
  var wrongg = new Audio("sounds/wrong.mp3");
  wrongg.play();
  check = false;
  $("h1").text("Game Over, Press Any Key to Restart");
  condition = false;
  check = true;
}
function intialize(){
  condition = true;
  var randomNumber = nextSequence();
  check = false;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  playSound(randomChosenColour);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  done = false;
  i = 0;
}

$("body").keydown(intialize);
$(".btn").click(function() {
  if(condition == false){
    wrong();
    return;
  }
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userChosenColour)

    if (userChosenColour != gamePattern[i]) {
      wrong();
      return;
  }
  i++;
  if(i == count) {
    done = true;

  }
  playSound(userChosenColour);
  animatePress(userChosenColour);


  if(done){
  check = true;
  setTimeout(intialize,1000);
}
});
