function Player(config,sprite,x,y,speed) // ne pas oublier de definir speed dans le push de Player
{
	Sprite.call(this,config,sprite);
	this.x= x;
	this.y= y;
	this.speed = speed;	
}
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.move=function(jumpSize) // pareil pour le saut
{
	this.x += (game.input.right - game.input.left) * this.speed;
	if(game.input.up)
	{
	 	this.y += jumpSize ;
	}
	if(game.input.right)
	{
		this.changeAnimation(1);
	}
	if(game.input.left)
	{
		this.changeAnimation(0);
	}
}
