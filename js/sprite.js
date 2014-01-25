//classe mere de tous les sprites que l'on peut dessiner
function Sprite(config,sprite){
	//recopie de l'objet pour pouvoir y acceder de partout
	this.config = config;
	//On associe la spriteSheet à l'objet
	this.image = sprite;
	//On associe toutes les anim au sprite
	this.animations = config.animations
	//On définie une anim de base pour l'objet
	this.currentAnimation = config.animations[0];
	this.animFrame = 0;
	this.currentFrame = 0;
	//On défini la taille d'une frame de la spriteSheet
	this.frameWidth = this.image.width / config.nbFrameMax;
	this.frameHeight = this.image.height / config.nbRows;
}
//fonction d'affichage de mon sprite 
Sprite.prototype.draw = function(context){
	//on incremente le compteur de frame 
	this.animFrame++;
	//on calcule si on doit change de frame d'animation
	if (this.animFrame % Math.floor(60 / this.currentAnimation.fps) == 0 && this.isMoving){
		this.currentFrame++;
		if (this.currentFrame == this.currentAnimation.nbFrame)
		{
			//On revient au debut de l'anim
			this.currentFrame = 0;		
        }
	}
	context.drawImage(this.image,
		this.currentFrame * this.frameWidth, 
		this.currentAnimation.nbRow * this.frameHeight,
		this.frameWidth,this.frameHeight,
		this.x,this.y,this.frameWidth, this.frameHeight);
}
Sprite.prototype.changeAnimation = function(indexAnim){
	if(this.currentAnimation != this.animations[indexAnim]){
		this.currentAnimation = this.animations[indexAnim];
		this.currentFrame = 0;
	}
}