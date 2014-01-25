function Player(config,sprite,x,y,speed) // ne pas oublier de definir speed dans le push de Player
{
	Sprite.call(this,config,sprite);
	this.x= x;
	this.y= y;
	this.speed = speed;
	this.jumpSize = 6;
	this.stateMove = false;  	
	console.log(this)
}
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.move=function(game) // pareil pour le saut
{
	//CHANGEMENT TIM
	var previewX = this.x + (game.input.right - game.input.left)*this.speed;
	if(game.input.up){
		var previewY = this.y - this.jumpSize;
	}
	else{
		var previewY = this.y;
	}
	if(!this.collisionCanvas(previewX,previewY,game)){
		this.x = previewX;
		this.y = previewY;
	}
	//
	if(game.input.right)
	{
		this.stateMove = true;  
		this.changeAnimation(1);
	}
	else if(game.input.left)
	{
		this.stateMove = true;
		this.changeAnimation(0);
	}
	else	
	{
		this.stateMove = false;
	}
}
Player.prototype.collisionCanvas = function(previewX,previewY,game){
	if(previewX < 0||
		previewX > game.canvasWidth ||
		previewY < 0 ||
		previewY > game.canvasHeight){
		return true;
	}
	else{
		return false;
	}
}