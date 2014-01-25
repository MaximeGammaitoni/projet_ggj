function Game(config,spriteArray){
	//Tableau de Config
	this.config = config;
	this.spriteArray = spriteArray;
	//Canvas + Context
	this.canvas = document.getElementById("canvas");
	this.canvasWidth = this.canvas.width = 1280;
	this.canvasHeight = this.canvas.height = 768;
	this.ctx = this.canvas.getContext("2d");
	//Inputs
	this.input = {};
	this.input.space = 0;
	this.input.left = 0;
	this.input.up = 0;
	this.input.right = 0;
	this.input.down = 0;
	this.input.a = 0;
	this.input.e = 0;
	//Player
	this.player = new Player(this.config.junki,this.spriteArray.junki,100,100,6);
	//Tableau de Box
	this.arrayOfBoxs = [];
}
Game.prototype.addBoxsInLine = function(amountOfBoxs,x,y){
	for(var i = 0; i < amountOfBoxs; i++){
		this.arrayOfBoxs.push(new Box(this.config.box,this.spriteArray.box,x+(this.spriteArray.box.width*i),y));
	}
}