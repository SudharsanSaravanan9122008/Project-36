var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedDogBtn;
var lastFedTime;


//create feed and lastFed variable here


function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedDogBtn = createButton("Feed Food");
  feedDogBtn.position(700, 95);
  feedDogBtn.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var lastFedTimeData = database.ref('FeedTime');
  lastFedTimeData.on("value", updateLastFedTime);
 
  //write code to display text lastFed time here
  push();
  textSize(15);
  fill("white");
  text("Last fed time: " + lastFedTime, 325, 30);
  pop();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodObj.deductFood();
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
  
  

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function updateLastFedTime(data){
  lastFedTime = data.val();
  
}