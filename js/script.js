
var ferris = $("#ferris"),
    center = $("#center"),
    tl;



TweenLite.set(center, {x:290, y:290});

//a little tricky getting the ferris wheel built, but it serves its purpose
function addArms(numArms) {
  var space = 360/numArms;
  for (var i = 0; i < numArms; i++){
    var newArm = $("<div>", {class:"arm", id: "arm" + i}).appendTo(center)

    // var newPivot = $("<div>", {class:"pivot outer"}).appendTo(center);
    // var newBasket = $("<div>", {class:"basket"}).appendTo(newPivot);
    // TweenLite.set(newPivot, {rotation:i*space, transformOrigin:"10px 210px"})
    TweenLite.set(newArm, {rotation:(i*space) -90, transformOrigin:"0px 3px"})
    // TweenLite.set(newBasket, {rotation:  (-i * space), transformOrigin:"50% top" });


  }
}

//Get this party started
addArms(8);//values between 2 and 12 work best
// TweenLite.from(ferris, 1, {autoAlpha:0});


//color game code:


$arm = $('.arm')

var guess = []
$arm.click(function(){
  var $thisArm = $(this)
  $thisArm.addClass('selectedArm')
  setTimeout(function(){
    console.log("changing back", this)
    $thisArm.removeClass('selectedArm')
  }, 500)
  guess.push(this)
  if (guess[guess.length - 1] !== currentSequence[currentSequence.length - 1]) {
    alert("Game Over. You made it to Level " + currentSequence.length)
  } else {
    lightUp()
  }

})

//THIS MAKES IT SO YOU CLICK START AND THE RED ARM LIGHTS UP:
// $redLight = $('#startGame')
//
// $redLight.click(function(){
//   $('#arm0').addClass('selectedArm')
//   setTimeout(function(){
//     $('#arm0').removeClass('selectedArm')
//   }, 500);
// })

var currentSequence = [];


//array that gives back random arm
var $allArms = [];
$('.arm').each(function(){
    $allArms.push(this);
});
//function that houses the random arm and adds to currentSequence
function getArm(){

  var $anArm =  $allArms[Math.floor(Math.random() *$allArms.length)]
  currentSequence.push($anArm);

  return currentSequence[currentSequence.length - 1]
}


function lightUp(){
  // var $thisArm = $(this)
  // $thisArm.addClass('selectedArm')
  var $thisArm = getArm().id;
  console.log($thisArm)

  function lightEach() {
    $('#' + $lightingArm).addClass('selectedArm')
    setTimeout(function(){
      console.log("changing back", $lightingArm)
      $('#' + $lightingArm).removeClass('selectedArm')
    }, 500)
  }

  for(var i = 0; i < currentSequence.length; i++){
    var $lightingArm = currentSequence[i].id
    console.log('lighting arm is: ' + $lightingArm)
    setTimeout(lightEach, 1500)
  }
}


$('#startButton').click(lightUp)


// var player = []
//
// addListeners();
//
// function addListeners() {
// 	for (var i = 0; i < $allArms.length; i++) {
// 		.on('click', function() {
// 			if (this
// }













//Parts of this code was modeled after codepen example:
