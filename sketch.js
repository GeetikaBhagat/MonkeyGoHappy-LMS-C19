//Global Variables
var monkey, monkeyImg, stone, stoneImg, stoneGroup;

var jungle, jungleImg;
var banana, bananaImg, bananaGroup;

var gameState = 'play';

var score = 0;

var gameOver, overImg, restart, restartImg

function preload() {
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  stoneImg = loadImage('stone.png');
  jungleImg = loadImage('jungle.jpg');
  bananaImg = loadImage('banana.png');

}


function setup() {
  createCanvas(600, 400);

  jungle = createSprite(150, 150, 10, 10);
  jungle.addImage(jungleImg);
  jungle.scale = 1.3;
  jungle.x = jungle.width / 2

  monkey = createSprite(50, 350, 10, 10);
  monkey.addAnimation("monkey", monkeyImg);
  monkey.scale = 0.12;

  invisibleGround = createSprite(200, 380, 400, 10);
  invisibleGround.visible = false;

  stoneGroup = new Group();
  bananaGroup = new Group();

}


function draw() {
  background(255);
  if (gameState === 'play') {
    jungle.velocityX = -3;


    if (jungle.x < 0) {
      jungle.x = jungle.width / 2
    }

    if (keyDown('space')) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;

    spawnStone();
    spawnBanana();

    if (bananaGroup.isTouching(monkey)) {
      score = score + 2;
      bananaGroup.destroyEach();
    }
    switch (score) {
      case 10:
        monkey.scale = 0.14;
        break;
      case 20:
        monkey.scale = 0.16;
        break;
      case 30:
        monkey.scale = 0.18;
        break;
      default:
        break;
    }

    if (stoneGroup.isTouching(monkey)) {
      gameState = 'end';

    }
  } else if (gameState === 'end') {
    jungle.velocityX = 0;
    monkey.velocityY = 0;

    monkey.scale = 0.12;

    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityEach(0);

    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }


  monkey.collide(invisibleGround);
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: " + score, 500, 50);
  if (stoneGroup.isTouching(monkey)) {
    textSize(30);
    fill('red');
    text("Keep Trying", 250, 200);
  }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, random(80, 150), 10, 10);
    banana.addImage(bananaImg);
    banana.scale = 0.08;
    banana.velocityX = -4;
    banana.lifetime = 200;
    bananaGroup.add(banana);

  }
}

function spawnStone() {
  if (frameCount % 300 === 0) {
    stone = createSprite(600, 360, 10, 10);
    stone.addImage(stoneImg);
    stone.scale = 0.3;
    stone.velocityX = -5;
    stone.lifetime = 200;
    stoneGroup.add(stone);
  }
}