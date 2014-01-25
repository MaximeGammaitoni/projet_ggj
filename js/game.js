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
	console.log(this.config , this.spriteArray)
	//Player
	this.player = new Player(this.config.junki,this.spriteArray.junki,100,100,6);
	//Assignation des touches
	window.onkeydown = function(event)
	{
	    if(event.keyCode==32)// espace 
	    {    
			this.input.space = 1;
		}
		if ( event.keyCode==37) // Gauche
		{
			this.input.left = 1;
		}
		if ( event.keyCode==38 ) // Haut
		{
			this.input.up = 1;
		}
		if ( event.keyCode==39 ) // Droite
		{
			this.input.right = 1;
		}
		if ( event.keyCode==40) // Bas
		{
			this.input.down = 1;
		}	
		if (event.keyCode==65)
		{
			this.input.a = 1;
		}	
		if (event.keyCode==69)
		{
			this.input.e = 1;
		}
	}
	window.onkeyup = function(event)
	{ 
		if(event.keyCode==32)// espace 
		{  		 
			this.input.space = 0;
		} 		
		if ( event.keyCode==37 ) // Gauche
		{
			this.input.left = 0;
		}
		if ( event.keyCode==38 ) // Haut
		{
			this.input.up = 0;
		}
		if ( event.keyCode==39 ) // Droite
		{		
			this.input.right = 0;
		}
		if ( event.keyCode==40) // Bas
		{
			this.input.down = 0;
		}
		if (event.keyCode==65)	//A
		{ 
			this.input.a = 0;
		}
		if (event.keyCode==69)	//E
		{
			this.input.e = 0;
		}	
	}
}