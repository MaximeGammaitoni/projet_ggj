function run(game)
{
	//On efface le canvas
	requestAnimationFrame(function(){run(game)});
	game.ctx.fillStyle = "#FFFFFF";
	game.ctx.fillRect(0,0,game.canvasWidth,game.canvasHeight);
	
	//On draw le player
	game.player.draw(game.ctx);
	game.player.move(game);
}