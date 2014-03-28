
exports.index = function(req, res) {
	
	
	res.render('index', { title: 'Multiplayer prototyping', jsFiles: GAME.gameFiles });
};