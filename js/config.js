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
	for (var i = 0; i < spritesNode.length ;i++)
	{
		var spriteNode = spritesNode[i];
		var name = spriteNode.getAttribute("code");
		config[name] = readNode(spriteNode[i]);
		spriteArray[name] = new Image();
		spriteArray[name].src = config[name].name;
	}
	//On initialise Game
	init(config,spriteArray);
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
function init(config,spriteArray)
{
	var loader = {};
	loader.spriteLength = 0;	//Nombre de sprite à charger
	loader.spriteLoaded = 0;	//Nombre de sprite total
	var game = new Game(config,spriteArray);
	run(game);
}