//classe mere de tous les sprites que l'on peut dessiner
function Sprite(config,sprite){
	//recopie de l'objet pour pouvoir y acceder de partout
	var that = this;
	//declaration de l'image du sprite
	this.image = sprite;
	this.image.src = sprite.src;
	//et on configure la source l'image depuis la configuration passe en parametre
	
	
	//on va declarer des coordonnes
	this.x = 10;
	this.y = 10;
	//declaration des variables servant a l'animation
	this.animFrame = 0;
	this.currentFrame = 0;
	this.currentAnimation = config.animations[0];
	this.config = config;

	//evenement de lecture du fichier image
	this.image.onload = function(){
		that.frameWidth = this.width / config.nbFrameMax;
		that.frameHeight = this.height / config.nbRows;
	}
}
//fonction d'affichage de mon sprite 
Sprite.prototype.draw = function(context){
	//on incremente le compteur de frame 
	this.animFrame++;
	//on calcule si on doit change de frame d'animation
	if (this.animFrame % Math.floor(60 / this.currentAnimation.fps) == 0){
		this.currentFrame++;
		if (this.currentFrame == this.currentAnimation.nbFrame)
		{
			if (this.statut === "mort")
			{
                this.statut ="jemesupprime";
            }
            else
            {
            	this.currentFrame = 0;
            }		
        }
	}
	context.drawImage(this.image,
		this.currentFrame * this.frameWidth, 
		this.currentAnimation.nbRow * this.frameHeight,
		this.frameWidth, this.frameHeight,
		this.x, this.y , this.frameWidth, this.frameHeight);
}
Sprite.prototype.changeAnimation = function (indexAnim)
{
	this.currentAnimation = this.config.animations[indexAnim];
	this.currentFrame = 0;
}
Sprite.prototype.changeAnimation1 = function (indexAnim)
{
	this.currentAnimation = this.config.animations[indexAnim];
	
}
Sprite.prototype.gardeFrame = function (frame)
{console.log(moveSpacecraft.useShield)
	if(this.currentFrame==2 )
	{       
			this.animFrame=2;
			

	}
	
}





