function Player(config,sprite,x,y,speed) // ne pas oublier de definir speed dans le push de Player
{
	Sprite.call(this,config,sprite);
	//Position Canvas
	this.x= x;
	this.y= y;
	//Vitesse de déplacement
	this.speed = speed;
	//Hauteur max de saut
	this.jumpSize = 6;
	//En mouvement ?
	this.isMoving = false;
	//Dans les air ?
	this.isInAir = false;
	//Collisione ?
	this.isColliding = false;
}
Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.move = function(game) // pareil pour le saut
{
	//On calcule la prochaine position
	var previewX = this.x + (game.input.right - game.input.left) * this.speed;
	var previewY = this.y + (game.input.down - game.input.up) * this.speed;
	//On peut se déplacer en X ?
	if(!this.collisionCanvas(previewX,previewY,game)){
		for(var i = 0; i < game.arrayOfBoxs.length; i++){
			switch(this.collision(previewX,previewY,game.arrayOfBoxs[i])){
				case "left":
				this.y = previewY;
				break;
				case "right":
				this.y = previewY;
				break;
				case "top":
				this.x = previewX;
				break;
				case "bottom":
				this.x = previewX;
				break;
				case "lol":
				//Bouge pas
				break;
				case false:
				this.x = previewX;
				this.y = previewY;
				break;
			}
		}
		//Si on va a droite
		if(game.input.right){
			this.isMoving = true;
			this.changeAnimation(1);
		}
		//Si on va a gauche 
		else if(game.input.left){
			this.isMoving = true;
			this.changeAnimation(0);
		}
		//Si on appuie pas
		else{
			this.isMoving = false;
		}
	}
}
Player.prototype.collisionCanvas = function(previewX,previewY,game){
	if( previewX < 0 ||
		previewX > game.canvasWidth){
		return "collideX";
	}
	else if( previewY < 0 ||
		previewY > game.canvasHeight){
		return "collideY";
	}
	else{
		return false;
	}
}
Player.prototype.collision = function(previewX,previewY,target){
	if( (previewX >= target.x + target.frameWidth) ||
		(previewX + this.frameWidth <= target.x) ||
		(previewY >= target.y + target.frameHeight ||
		(previewY + this.frameHeight <= target.y))
		){
		return false;
	}
	//Pas de collision
	else{
		//Gauche
		if(previewX <= target.x){
			console.log("left")
			return "left";
		}
		//Droite
		else if(previewX >= target.x+target.frameWidth){
			console.log("right")
			return "right";
		}
		//Haut
		else if(previewY <= target.y){
			console.log("top")
			return "top";
		}
		//Bas
		else if(previewY >= target.y+target.frameHeight){
			console.log("bottom")
			return "bottom";
		}
	}
}