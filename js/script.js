
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

// var colors = [red, green, blue, yellow]

$arm = $('.arm')

$arm.click(function(){
  var $thisArm = $(this)
  $thisArm.addClass('selectedArm')
  setTimeout(function(){
    console.log("changing back", this)
    $thisArm.removeClass('selectedArm')
  }, 500)

})














//Parts of this code was modeled after codepen example:
