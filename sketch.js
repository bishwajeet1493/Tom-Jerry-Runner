var PLAY = 1;
var END = 0;
var gamestate = 1;
var score = 0;

var edges;

var tom, tomStanding, tomRunning, jerry, jerryStanding, jerryRunning, tomCatchingJerry,caughtJerry, jerryTeasing;

var table, tableImg, sofa, sofaImg, lamp, lampImg, ground, groundImg;

var song, win;

function preload() {

  song = loadSound("Song.mp3");
  win = loadSound("Win.mp3");

  tomStanding = loadAnimation("Images/Tom 1.png");

  tomRunning = loadAnimation("Images/Tom 2.png", "Images/Tom 3.png", "Images/Tom 4.png", "Images/Tom 5.png",
  "Images/Tom 6.png", "Images/Tom 7.png", "Images/Tom 8.png", "Images/Tom 9.png");

  tomCatchingJerry = loadAnimation("Images/Tom Catching Jerry.png");

  caughtJerry = loadImage("Images/Caught Jerry.jpg");

  jerryStanding = loadAnimation("Images/Jerry 1.png")

  jerryRunning = loadAnimation("Images/Jerry 2.png", "Images/Jerry 3.png", "Images/Jerry 4.png");

  jerryTeasing = loadAnimation("Images/Teasing.png");

  lampImg = loadImage("Images/Lamp.png");

  sofaImg = loadImage("Images/Sofa.png");

  tableImg = loadImage("Images/Table.png");

  groundImg = loadImage("Images/Ground.jpg")
}

function setup() {
  createCanvas(800,400);

  ground = createSprite(400,200, 1400, 10);
  ground.addImage("Floor", groundImg);
  ground.scale = 2;

  edges = createEdgeSprites();

  tom = createSprite(75, 310, 25, 25);
  tom.addAnimation("Standing", tomStanding);
  tom.addAnimation("Running", tomRunning);
  tom.addAnimation("Catching", tomCatchingJerry);
  tom.scale = 3;

  jerry = createSprite(400, 350, 3, 3);
  jerry.addAnimation("JStanding", jerryStanding);
  jerry.addAnimation("JRunning", jerryRunning);
  jerry.addAnimation("Caught", caughtJerry);
  jerry.addAnimation("Teasing", jerryTeasing);
  jerry.scale = 0.8;

  //lamp = createSprite(450, 310, 25, 25);
  //lamp.addImage("Lamp", lampImg);
  //lamp.scale = 0.62;

  //sofa = createSprite(540, 325, 25, 25);
  //sofa.addImage("Sofa", sofaImg);
  //sofa.scale = 0.25;

  //table = createSprite(200, 325, 25, 25);
  //table.addImage("Table", tableImg);
  //table.scale = 0.7;

  song.loop();
}

function draw() {
  background(0);  

  if(gamestate === PLAY) {
    ground.velocityX = -4;

    score = Math.round(frameCount/3);

    if(ground.x < 300) {
      ground.x = 400;
    }

    if(keyDown(RIGHT_ARROW)){
      tom.x = tom.x+5;
      tom.changeAnimation("Running", tomRunning);
    }

    if(keyWentUp(RIGHT_ARROW)){
      tom.changeAnimation("Standing", tomStanding);
    }

    jerry.changeAnimation("JRunning", jerryRunning);

    jerry.velocityX = 4;

    jerry.collide(edges);

    tom.collide(edges);  
  
    if(tom.isTouching(jerry)){
      tom.changeAnimation("Catching", tomCatchingJerry);
      jerry.visible = false;
      gamestate = END;
      song.stop();
      win.play();
    }
  
  } 

  if(gamestate === END){
    jerry.visible = true;
    ground.destroy();
    //table.destroy();
    //lamp.destroy();
    //sofa.destroy();
    jerry.destroy();
    background(caughtJerry);
    
    jerry.velocityX = 0;
    
    ground.velocity = 0;
  }

  drawSprites();

  textSize(20);
  fill("red");
  text("Score: "+ score, 700, 40);

}