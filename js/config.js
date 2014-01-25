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
	//Tableau de config
	var config = {};
	//Tableau de Sprite
	var spriteArray = {};
	//loader d'asset
	var loader = {};
	loader.spriteLength = 2;	//Nombre de sprite à charger
	loader.spriteLoaded = 0;	//Nombre de sprite total
	loader.soundLength = 0;
	loader.soundLoaded = 0;
	for (var i = 0; i < spritesNode.length ;i++)
	{
		var spriteNode = spritesNode[i];
		var name = spriteNode.getAttribute("code");
		config[name] = readNode(spriteNode);
		spriteArray[name] = new Image();
		spriteArray[name].src = config[name].name;
		//Lorsque tout les assets ont été load on lance l'init, a chaque passage dans le onload on incrémente le nombre d'image loadé
		spriteArray[name].onload = function(){loader.spriteLoaded++;checkAssets(loader,config,spriteArray)};
	}
}
function readNode(configNode){
	var config = {};
	//Parametres xml Misc
	config.code = configNode.getAttribute("code");
	config.nbFrameMax = configNode.getAttribute("nbFrameMax");
	config.nbRows = configNode.getAttribute("nbRows");
	config.name = configNode.getAttribute("name");
	//Parametre xml Animation
	var animationNodes = configNode.getElementsByTagName("animation")
	config.animations = [];
	for (var i = 0 ; i < animationNodes.length ; i++){
		var anim = {};
		anim.code = animationNodes[i].getAttribute("code");
		anim.nbFrame = animationNodes[i].getAttribute("nbFrame");
		anim.nbRow = animationNodes[i].getAttribute("nbRow");
		anim.fps = animationNodes[i].getAttribute("FPS");
		anim.cycle = animationNodes[i].getAttribute("cycle");
		//Fin récupération de config.anim
		config.animations.push(anim);
	}
	//Parametre xml Hitboxs
	var hitboxNodes = configNode.getElementsByTagName("hitbox")
	config.hitboxs = [];
	for (var i = 0; i < hitboxNodes.length ;i++){
		var hitbox = {};
		hitbox.offsetX = parseInt(hitboxNodes[i].getAttribute("offsetX"));
		hitbox.offsetY = parseInt(hitboxNodes[i].getAttribute("offsetY"));
		hitbox.width = parseInt(hitboxNodes[i].getAttribute("width"));
		hitbox.height = parseInt(hitboxNodes[i].getAttribute("height"));
		hitbox.diam = parseInt(hitboxNodes[i].getAttribute("diam"));
		//Fin récupération config.hitbox
		config.hitboxs.push(hitbox);
	}
	//On retourne config dans le tableau des configs
	return config;
}
function init(config,spriteArray)
{
	var game = new Game(config,spriteArray);
	//Une fois game créé on défini les keyUp/Down pour les inputs
	//event.preventDefault() permet de ne pas faire bouger la fenetre
	window.onkeydown = function(event)
	{
	    if(event.keyCode==32)// espace 
	    {    
			game.input.space = 1;
			event.preventDefault();
		}
		if ( event.keyCode==37) // Gauche
		{
			game.input.left = 1;
			event.preventDefault();
		}
		if ( event.keyCode==38 ) // Haut
		{
			game.input.up = 1;
			event.preventDefault();
		}
		if ( event.keyCode==39 ) // Droite
		{
			game.input.right = 1;
			event.preventDefault();
		}
		if ( event.keyCode==40) // Bas
		{
			game.input.down = 1;
			event.preventDefault();
		}	
		if (event.keyCode==65)
		{
			game.input.a = 1;
			event.preventDefault();
		}	
		if (event.keyCode==69)
		{
			game.input.e = 1;
			event.preventDefault();
		}
	}
	window.onkeyup = function(event)
	{ 
		if(event.keyCode==32)// espace 
		{  		 
			game.input.space = 0;
			event.preventDefault();
		} 		
		if ( event.keyCode==37 ) // Gauche
		{
			game.input.left = 0;
			event.preventDefault();
		}
		if ( event.keyCode==38 ) // Haut
		{
			game.input.up = 0;
			event.preventDefault();
		}
		if ( event.keyCode==39 ) // Droite
		{		
			game.input.right = 0;
			event.preventDefault();
		}
		if ( event.keyCode==40) // Bas
		{
			game.input.down = 0;
			event.preventDefault();
		}
		if (event.keyCode==65)	//A
		{ 
			game.input.a = 0;
			event.preventDefault();
		}
		if (event.keyCode==69)	//E
		{
			game.input.e = 0;
			event.preventDefault();
		}	
	}
	game.addBoxsInLine(1,300,300);
	//On peut lancer le run
	run(game);
}
//On check si tout les assets ont été chargé, si oui alors on peut initialiser le game
function checkAssets(loader,config,spriteArray){
	if(loader.spriteLoaded == loader.spriteLength && loader.soundLoaded == loader.soundLength){
		init(config,spriteArray)
	}
}