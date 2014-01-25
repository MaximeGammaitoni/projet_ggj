function run(game)
{
	//On efface le canvas
	requestAnimationFrame(function(){run(game)});
	game.ctx.globalAlpha = 1;
	game.ctx.fillStyle = "#FFFFFF";
	game.ctx.fillRect(0,0,game.canvasWidth,game.canvasHeight);
	//DRAW MA GUEULE
	//On draw le player
	game.player.draw(game.ctx);
	for(var i = 0; i < game.arrayOfBoxs.length; i++){
		game.arrayOfBoxs[i].draw(game.ctx);
	}
	//COLLISION MA GUELE
	
	//MOVE MA GUEULE
	game.player.move(game);
}