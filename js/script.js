
var ferris = $("#ferris"),
    center = $("#center"),
    tl;



TweenLite.set(center, {x:290, y:290});

//I borrowed code from the example for the creation of the wheel itself
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

//adds arms (I have defaulted the color beyond 8 to black)
addArms(8);//values between 2 and 12 work best
TweenLite.from(ferris, 1, {autoAlpha:0});

//Animation for movement of wheel
tl = new TimelineMax({repeat:-1, onUpdate:updateSlider});
tl.to(center, 20, {rotation:360,  ease:Linear.easeNone})


//UI Controls
$( "#slider" ).slider({
  range: false,
  min: 0,
  max: 1,
  step:.001,
  slide: function ( event, ui ) {
    tl.progress( ui.value ).pause();
  },
  stop: function( event, ui ) {tl.play()}
});

function updateSlider() {
		$("#slider").slider("value", tl.progress());
}

$( "#sliderSpeed" ).slider({
  range: false,
  min: 0,
  max: 8,
  step:.02,
  value:1,
  slide: function ( event, ui ) {
    tl.timeScale( ui.value ).resume();
  }
});

//UI control nav buttons
$("#playBtn").click(function(){
  tl.play();
});
$("#pauseBtn").click(function(){
	tl.pause();
});


// PARTS OF THE ABOVE IS TAKEN FROM CODEPEN EXAMPLE BY GREENSTOCK: UI controls and
//animation for movement of the wheel. Colors, speeds, and click functionality were
//added by me
//THE BELOW IS MY GAME CODE

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
// currentSequence.forEach(function(){
// lightUp()})

$('#startButton').click(lightUp)
