var ferris = $("#ferris"),
    center = $("#center"),
    tl;



TweenLite.set(center, {x:190, y:190});

//I borrowed code from the example for the creation of the wheel itself
function addArms(numArms) {
  var space = 360/numArms;
  for (var i = 0; i < numArms; i++){
    var newArm = $("<div>", {class:"arm", id: "arm" + i}).appendTo(center)
    var newPivot = $("<div>", {class:"pivot outer"}).appendTo(center);
    var newBasket = $("<div>", {class:"basket"}).appendTo(newPivot);
    TweenLite.set(newPivot, {rotation:i*space, transformOrigin:"10px 210px"})
    TweenLite.set(newArm, {rotation:(i*space) -90, transformOrigin:"0px 3px"})
    TweenLite.set(newBasket, {rotation:  (-i * space), transformOrigin:"50% top" });


  }
}

//adds arms (I have defaulted the color beyond 8 to black)
addArms(8);//values between 2 and 12 work best
TweenLite.from(ferris, 1, {autoAlpha:0});

//Animation for movement of wheel(borrowed)
tl = new TimelineMax({repeat:-1, onUpdate:updateSlider});
tl.to(center, 20, {rotation:360,  ease:Linear.easeNone})
tl.to($(".basket"), 20, {rotation:"-=360",  ease:Linear.easeNone},0)
//UNCOMMENT THE ABOVE TO UNANIMATE THE WHEEL

//UI Controls(borrowed)
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

//UI control nav buttons(functionality borrowed)
$("#playBtn").click(function(){
  tl.play();
});
$("#pauseBtn").click(function(){
	tl.pause();
});


// PARTS OF THE ABOVE IS TAKEN FROM CODEPEN EXAMPLE BY GREENSTOCK: UI controls and
//animation for movement of the wheel. Colors, speeds, and click functionality were
//added by me. URL for the animated wheel can be found on my README
//---------------------------------------
//THE BELOW IS MY GAME CODE

$arm = $('.arm')

var guess = []
$arm.click(function(){
  var $thisArm = $(this)
  $thisArm.addClass('selectedArm')
  setTimeout(function(){
    $thisArm.removeClass('selectedArm')
  }, 500)
  guess.push(this)
  for (var i = 0; i < guess.length; i++){
    if (guess[i] !== currentSequence[i]) {
      alert("Game Over. You made it to Level " + currentSequence.length)
      guess = []
      currentSequence = []
      $('#startButton').text("P L A Y  A G A I N")
      $('#startButton').fadeIn()
      return
    }
  }
  if (guess.length === currentSequence.length) {
    guess = [];
    lightUp()
  }
})

// empty array that randomly generated arm is pushed into
var currentSequence = [];

//array that holds all divs with class arm
var $allArms = [];
$('.arm').each(function(){
    $allArms.push(this);
});
//function that houses the random arm and adds to currentSequence
function getArm(){
  var $anArm =  $allArms[Math.floor(Math.random() *$allArms.length)]
  currentSequence.push($anArm);
  return currentSequence
}

function lightUp(){

  var $thisArm = getArm();
  console.log($thisArm)

  function lightEach(thisArm) {
    $('#' + thisArm).addClass('selectedArm')
    setTimeout(function(){
      console.log("changing back", thisArm)
      $('#' + thisArm).removeClass('selectedArm')
    }, 1500)
  }

  var i = 0;
  var lightingLoop = setInterval(function(){
      var $lightingArm = currentSequence[i].id
      console.log('lighting arm is: ' + $lightingArm)
      setTimeout(lightEach($lightingArm), 1500)
      i++;
      if(i === currentSequence.length) {
          clearInterval(lightingLoop);
      }
  }, 1500);
}

$('#startButton').click(function(){
  $('#startButton').fadeOut()
  lightUp()
})
