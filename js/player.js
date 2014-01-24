function Player()
{
	Sprite.call(this,config,);
	this.x= x;
	this.y= y;
	
}
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
