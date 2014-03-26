

//Load all game files
for(gameFile in GAME.gameFiles) {
	if(GAME.gameFiles[gameFile].server === true)
		GAME[GAME.gameFiles[gameFile].name] = require("./"+GAME.gameFiles[gameFile].url);
	
	
}