//variable to store different state of game
var gameState = "serve";

//variables to keep the score
var compScore = 0;
var playerScore = 0;

var ball,playerPaddle,computerPaddle

function preload(){
robot = loadImage("robot.png");
player = loadImage("player.png");
ballimg = loadImage("ball.png");
}
function setup(){
  //ball = createSprite(200,200,10,10);
  //ball.addImage("ball",ballimg);

playerPaddle = createSprite(380,200,10,70);
playerPaddle.addImage("plr",player);

computerPaddle = createSprite(10,200,10,70);
computerPaddle.addImage("robo",robot);

}
function draw() {
  //clear the screen
  background("white");
  if(ball.collide(computerPaddle)|| ball.collide(playerPaddle)){
    playSound("hit.mp3", false);
  }
  
  
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //display scores
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
 
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  createEdgeSprites();
  
  ball.bounce(topEdge);
  ball.bounce(bottomEdge);
  ball.bounce(playerPaddle);
  ball.bounce(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyCode === 32 &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyCode === 82 && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
