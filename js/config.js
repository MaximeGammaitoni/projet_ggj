window.onload = function()
{
	images=[];
	function checkAssetsLoaded()
	{
		if (nbImageLoaded==images.lenght)
		{
			init()
		}
	}
	var canvas = document.getElementById('canvas');
	canvasWidth=canvas.width = 1280;      // IMPORTANT !!! Taille a redefinir pour le Cahier des charges.
	canvasHeight=canvas.height = 768;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","exemple_a.xml");
	xmlhttp.responseType = "document";
	xmlhttp.send();
	xmlhttp.addEventListener("load", function(e) { 	
		readFile();
	} );
}
var xmlhttp;
function readFile(){
	var spritesNode;
	spritesNode = xmlhttp.responseXML.getElementsByTagName("sprite");
//---------------------------------------------game-------------------------------------------------------------
	var game= {};
	var game.config = {};
	game.canvasWidth = canvas.width = 1280;
	game.canvasHeight = canvas.height = 768;
	game.ctx= document.getElementById("canvas").getContext("2d");
//--------------------------------------------------------------------------------------------------------------	
	for (var i = 0; i < spritesNode.length ;i++)
	{
		var spriteNode = spritesNode[i];
		game.config[spriteNode[i].code] = readNode(spriteNode[i])
	}
	window.onkeydown = function(event)
	{
	    if(event.keyCode==32)// espace 
	    {    
			game.input.space = 1;
		}
		if ( event.keyCode==37) // Gauche
		{
			game.input.left = 1;
		}
		if ( event.keyCode==38 ) // Haut
		{
			game.input.up = 1;
		}
		if ( event.keyCode==39 ) // Droite
		{
			game.input.space = 1;
		}
		if ( event.keyCode==40) // Bas
		{
			game.input.space = 1;
		}	
		if (event.keyCode==65)
		{
			game.input.a = 1;
		}	
		if (event.keyCode==69)
		{
			game.input.e = 1;
		}
	}
	window.onkeyup = function(event)
	{ 
		if(event.keyCode==32)// espace 
		{  		 
			game.input.space = 0;
		} 		
		if ( event.keyCode==37 ) // Gauche
		{
			game.input.left = 0;
		}
		if ( event.keyCode==38 ) // Haut
		{
			game.input.up = 0;
		}
		if ( event.keyCode==39 ) // Droite
		{		
			game.input.right = 0;
		}
		if ( event.keyCode==40) // Bas
		{
			game.input.down = 0;
		}
		if (event.keyCode==65)	//A
		{ 
			game.input.a = 0;
		}
		if (event.keyCode==69)	//E
		{
			game.input.e = 0;
		}	
	}
	init(game);
}

function readNode(configNode){

	var config = {};

	config.code = configNode.getAttribute("code");
	config.nbFrameMax = configNode.getAttribute("nbFrameMax");
	config.nbRows = configNode.getAttribute("nbRows");
	config.name = configNode.getAttribute("name");

	var animationNodes = configNode.getElementsByTagName("animation")

	config.animations = [];
	
	for (var i = 0 ; i < animationNodes.length ; i++){
		
		var anim = {};
		
		anim.code = animationNodes[i].getAttribute("code");
		anim.nbFrame = animationNodes[i].getAttribute("nbFrame");
		anim.nbRow = animationNodes[i].getAttribute("nbRow");
		anim.fps = animationNodes[i].getAttribute("FPS");
		anim.cycle = animationNodes[i].getAttribute("cycle");
		
		config.animations.push(anim);
	}
	var hitboxNodes = configNode.getElementsByTagName("hitbox")
	
	config.hitboxs = [];
	for (var i = 0; i < hitboxNodes.length ;i++){
		var hitbox = {};
		hitbox.offsetX = parseInt(hitboxNodes[i].getAttribute("offsetX"));
		hitbox.offsetY = parseInt(hitboxNodes[i].getAttribute("offsetY"));
		hitbox.diam = parseInt(hitboxNodes[i].getAttribute("diam"));
		
		config.hitboxs.push(hitbox);
	}
	return config;
}