var PLAY = 1;
var END = 0;
var gameState = PLAY;

var invisibleGround;

var cloudsGroup, cloudImg;
var obstaclesGroup, obstacle1, obstacle2,obstacle3;
var backgroundImg
var score=0;
var jumpSound, collidedSound;
var restartImg,gameOverImg;
var gameOver, restart;

var tom,jerry,jerryImg,tomImg;
var backgroundImg,ground,groundImg;

function preload(){
    backgroundImg = loadImage("background.png");

    jerryImg = loadImage("jerry.png");
    tomImg = loadImage("tom.png");

    groundImg = loadImage("ground.png");

    gameOverImg = loadImage("gameover.png");
    restartImg = loadImage("restart.png");

    cloudImg = loadImage("cloud.png");

    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
}

function setup() {
    createCanvas(1200,600);
    jerry = createSprite(300,475,10,10);
    jerry.addAnimation("running",jerryImg);
    jerry.scale = 0.5;

    tom = createSprite(100,475,10,10);
    tom.scale = 0.5;
    tom.addAnimation("chasing",tomImg);
   
    ground = createSprite(width/2,height,width,1);
    ground.addImage("groundisCOOL",groundImg);
    ground.x = width/2
    ground.velocityX = (10 + 10*score/50);

    gameOver = createSprite(width/2,height/2- 90);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    
    gameOver.scale = 1;
    restart.scale = 0.9;
  
    gameOver.visible = false;
    restart.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();
    
    invisibleGround = createSprite(600,530,1200,20);
    invisibleGround.visible = false

    tom.setCollider("rectangle",0,20,tom.width,tom.height);
    //tom.debug = true
}

function draw() {
    background(backgroundImg);
    
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);   

    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/60);
      ground.velocityX = -(6 + 3*score/100);
      
      if((keyDown("SPACE")) && jerry.y  >= height-120) {
        
        jerry.velocityY = -12;
        
      }
      jerry.velocityY = jerry.velocityY + 0.8
      
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
      
      
      spawnClouds();
      spawnObstacles();
    
      if(obstaclesGroup.isTouching(jerry)){
        
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    jerry.velocityY = 0;
    jerry.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  }

  if (mousePressedOver(restart)) {
    reset();
  }

    jerry.collide(invisibleGround);
    drawSprites();
   
  }
 
  function reset(){
    
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    jerry.changeAnimation("running",jerryImg);
    
    score = 0;
    
  }
  
  function spawnClouds() {
    
    if (frameCount % 60 === 0) {
      var cloud = createSprite(width+20,height-300,40,10);
      
      cloud.y = Math.round(random(100,220));
      cloud.addImage(cloudImg);
      cloud.scale = 0.5;
      cloud.velocityX = -3;
      
      cloud.lifetime = 300;
      
      cloud.depth = jerry.depth;
      jerry.depth = jerry.depth+1;
      
      cloudsGroup.add(cloud);
    }
    
  }

  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,height-95,20,30);
      obstacle.scale = 10;
      obstacle.setCollider('circle',0,0,45)
    
      obstacle.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        case 3: obstacle.addImage(obstacle3);
                break;      
                default: break;
      }
               
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
      obstacle.depth = jerry.depth;
      jerry.depth +=1;
      
      obstaclesGroup.add(obstacle);
    }
  }

