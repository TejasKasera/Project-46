var mario;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var sd;
var gameState=PLAY;
function preload()
{
  marioAnimation=loadAnimation("tappu.png");
  t = loadAnimation("tappu1.png");
  obstacleAnimation=loadAnimation("obstacle1.png","obstacle2.png");
  wallAnimation=loadAnimation("platform1.png");
  groundAnimation=loadAnimation("grp.png");  
  flagAnimation=loadAnimation("flg.png");
  blastIMG = loadImage("blast.png");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var countDistanceX = 0;
  var platform;
  var gap;
  
  //creating a player mario
  mario = new Player();

  blast = createSprite(mario.spt.x,mario.spt.y,20,20);
  blast.addImage(blastIMG);
  blast.scale = 0.2;
  blast.velocityX = mario.spt.x;
  blast.visible = false;
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  //adding platforms to stand for mario
  for (var i=0;i<26;i++)
	 {
     frameRate(30);
      platform = new Platform(countDistanceX);
      platformGroup.add(platform.spt);//Adding each new platform to platformGroup
      gap=random([0,0,0,0,200]);//givin randome value to gap
      countDistanceX = countDistanceX + platform.spt.width + gap; //counting x location of next platform to be build
      //adding wall to the game
      if(i%1===0)
      {
      wall=new Wall(countDistanceX);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%1==0)
      {
      obstacle= new Obstacle(countDistanceX);
      obstacleGroup.add(obstacle.spt);
      }
  }
  flag=createSprite(countDistanceX-150,height-280);
  flag.addAnimation("flagimg",flagAnimation);
  flag.scale=0.4;
  flag.setCollider("rectangle",0,0,120,100);
}

function draw() {
  background('skyblue');
  //code to move the camera
  translate(  -mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
       //changing the game states
       if(obstacleGroup.isTouching(mario.spt) || mario.spt.y>height)
       {  
         gameState=LOSE;
         mario.spt.shapeColor = "red";
       } 
    
       if(flag.isTouching(mario.spt))
       {
          gameState=WIN;
          mario.spt.shapeColor = "green";

       }
       //apply gravity to mario and set colliding with platforms
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        
        //Calling various function to controll mario
        if (keyWentDown(LEFT_ARROW))  
        { 
          mario.spt.velocityX = -8;
        }

        if (keyWentUp(LEFT_ARROW))  
        { 
          mario.spt.velocityX = 0;
    
        }


        if (keyWentDown(RIGHT_ARROW)) 
        { 
          mario.spt.velocityX = 8;

        }


        if (keyWentUp(RIGHT_ARROW)) 
        { 
          mario.spt.velocityX = 0;
        }



	 
        mario.spt.velocityY = mario.spt.velocityY + 0.4;

        if (keyDown("space") && mario.spt.y >= 450) 
        {
          mario.spt.velocityY = -30;
        }


   }

  if(gameState==LOSE)//END State
  {  
    stroke("red");
    fill("red");
    textSize(40);
    text("GAME OVER",mario.spt.x,200);
    obstacleGroup.velocityX = 0;
    mario.spt.setVelocity(0,0);
    mario.spt.pause();
    blast.visible = true;
  }

  if(gameState==WIN)//WIN state
  {  
    stroke("green");
    fill("orange");
    textSize(40);
    text("Winner",mario.spt.x,200);
    obstacleGroup.destroyEach();
    mario.spt.setVelocity(0,0);
    mario.spt.pause();
  }
  

   drawSprites();
}