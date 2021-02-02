var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var box1, box2, box3;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.15

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.5

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	engine = Engine.create();
	world = engine.world;

	var packageBody_options={
		restitution : 0,
		isStatic : true
	}
	packageBody = Bodies.circle(width/2 , 200 , 5, packageBody_options);
	World.add(world, packageBody);

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	World.add(world, ground);

	box1 = createSprite(packageSprite.x, 650, 200, 20);
    box1.shapeColor='red';
	box2 = createSprite(packageSprite.x-100, 610, 20, 100);
	box2.shapeColor='red';
	box3 = createSprite(packageSprite.x+100, 610, 20, 100);
	box3.shapeColor='red';

	Engine.run(engine);
}

function draw() {
  Engine.update(engine);

  background(0);

  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;

  if (packageSprite.collide(box1)){
	  Matter.Body.setStatic(packageBody, true);
  }
  
  drawSprites();
}

function keyPressed(){
	if (keyCode === DOWN_ARROW){
		Matter.Body.setStatic(packageBody, false);
	} 
}
