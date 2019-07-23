//setup

var app = new PIXI.Application(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

app.stage.interactive = true;

var posX, displacementSprite, displacementFilter, bg, vx;

var container = new PIXI.Container();

app.stage.addChild(container);

PIXI.loader.add("ripple.png").add("bg.jpg").load(setup);

function setup(){
  posX = app.renderer.width/2;
  displacementSprite = new PIXI.Sprite(PIXI.loader.resources["ripple.png"].texture);
  displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  displacementSprite.anchor.set(0.5);
  displacementSprite.x = app.renderer.width/2;
  displacementSprite.y = app.renderer.height/2;
  vx = displacementSprite.x;


  app.stage.addChild(displacementSprite);
  container.filters = [displacementFilter];
  displacementFilter.scale.x=0;
  displacementFilter.scale.y= 0;

  bg = new PIXI.Sprite(PIXI.loader.resources["bg.jpg"].texture);
  bg.width = app.renderer.width;
  bg.height = app.renderer.height;
  container.addChild(bg);
  app.stage.on("mousemove", onPointerMove).on("touchMove", onPointerMove);
  loop();
}


var onPointerMove=(eventData)=>{
  posX = eventData.data.global.x;
}

function loop(){
  requestAnimationFrame(loop);
  vx+= (posX - displacementSprite.x)*0.045;
  displacementSprite.x = vx;
  var disp = Math.floor(posX - displacementSprite.x);
  if (disp< 0 ) {
    disp = -disp;
  }

  var fs = map(disp, 0, 500, 0, 120);
  disp= map(disp, 0, 500, 0.1, 0.6);

  displacementSprite.scale.x = disp;
  displacementFilter.scale.x = fs;
}


function map(n, start1, stop1, start2, stop2){
  var newval = (n-start1)/(stop1 - start1) * (stop2 - start2)+start2;
  return newval;
}


//GREENSOCK IMPLEMENTATION

TweenMax.from(".brand", 2, {
  y:20,
  opacity: 0,
  ease: Expo.easeInOut

});


TweenMax.from(".search", 2, {
  delay: 0.1,
  y:20,
  opacity: 0,
  ease: Expo.easeInOut
});

TweenMax.from(".menu", 2, {
  delay: 0.2,
  y:20,
  opacity: 0,
  ease: Expo.easeInOut
});

TweenMax.from(".header h1", 2, {
  delay: 1,
  y:20,
  opacity: 0,
  ease: Expo.easeInOut
});

TweenMax.staggerFrom(".media ul li", 2, {
  delay: 0.4,
  x: 40,
  opacity: 0,
  ease: Expo.easeInOut
}, 0.2);

TweenMax.from(".bottomnav", 3, {
  delay: 2,
  y:50,
  opacity: 0,
  ease: Expo.easeInOut
});

TweenMax.from(".counter", 2, {
  delay: 3,
  y:40,
  opacity: 0,
  ease: Expo.easeInOut
});

TweenMax.from(".bar", 2, {
  delay: 3.6,
  width:"0%",
  ease: Expo.easeInOut
});

TweenMax.staggerFrom(".bottomnav ul li", 2, {
  delay: 3.2,
  x: 40,
  opacity: 0,
  ease: Expo.easeInOut
}, 0.2);

TweenMax.from(".share", 2, {
  delay: 1.4,
  y:40,
  opacity: 0,
  ease: Expo.easeInOut
});
