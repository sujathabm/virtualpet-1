var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;

function preload(){
dogimg = loadImage("dogImg.png");
dogHappy = loadImage("dogImg1.png");

}

function setup() {
  createCanvas(800, 700);
  
  database = firebase.database();
  dog = createSprite(400,500,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.3;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
 
}


function draw() {
  background(46,139,87); 

  if(foods !== undefined){
    textSize(30);
  fill (random(0,255),random(0,255),random(0,255))
  text("Food remaining: "+foods,300,250);
  fill("black");
  text("Note : Press the up arrow key to feed the feed Bruno",30,150);
    }

  if (keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dogHappy);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);
  }

  drawSprites();
 
}

function readStock(data){
  foods = data.val();
  console.log(foods)
}

function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  });
}