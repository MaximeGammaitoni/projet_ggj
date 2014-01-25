function Box(config,sprite,x,y){
	Sprite.call(this,config,sprite);
	//Position
	this.x = x;
	this.y = y;
}
Box.prototype = Object.create(Sprite.prototype);
Box.prototype.constructor = Box;