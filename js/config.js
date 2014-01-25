var xmlhttp;
window.onload = function()
{
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","xml.xml");
	xmlhttp.responseType = "document";
	xmlhttp.send();
	xmlhttp.addEventListener("load", function(e) { 	
		readFile();
	} );
}
function readFile(){
	var spritesNode;
	spritesNode = xmlhttp.responseXML.getElementsByTagName("sprite");
	var config = {};
	for (var i = 0; i < spritesNode.length ;i++)
	{
		var spriteNode = spritesNode[i];
		var name = spriteNode.getAttribute("code");
		config[name] = readNode(spriteNode[i]);
	}
	init(config);
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
function init(config)
{
	images=[];
	var game = {};
	game.config = config;
	game.canvasWidth = canvas.width = 1280;
	game.canvasHeight = canvas.height = 768;
	game.ctx= document.getElementById("canvas").getContext("2d");
	game.input = {};
	//--------------------------------------assignation des touches-----------------------------------
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
			game.input.right = 1;
		}
		if ( event.keyCode==40) // Bas
		{
			game.input.down = 1;
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
}