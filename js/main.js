function run(game)
{
	//On efface le canvas
	game.ctx.fillStyle = "#FFFFFF";
	game.ctx.fillRect(0,0,game.canvasWidth,game.canvasHeight);
	//On draw le player
	game.player.draw(game.ctx);
}