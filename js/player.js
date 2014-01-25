function Player(config,sprite,x,y,speed) // ne pas oublier de definir speed dans le push de Player
{
	Sprite.call(this,config,sprite);
	this.x= x;
	this.y= y;
	this.speed = speed;	
	console.log(this)
}
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.move=function(game,jumpSize) // pareil pour le saut
{
	this.x += (game.input.right - game.input.left) * this.speed;
	if(game.input.up)
	{
	 	this.y -= jumpSize ;
	}
	if(game.input.right)
	{
		this.changeAnimation(1);
	}
	if(game.input.left)
	{
		this.changeAnimation(0);
	}
	if(this.x < 0 )
	{
		this.x = 0 ;
	}
	if(this.x > game.canvasWidth - game.player.frameWidth)
	{
		this.x=game.canvasWidth -  game.player.frameWidth;
	}
	if(this.y < 0 )
	{
		this.y  = 0 ;
	}
	if(this.y >game.canvasHeight- game.player.frameHeight)
	{
		this.y  = game.canvasHeight-game.player.frameHeight;
	}		

}
