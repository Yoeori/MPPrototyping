
exports.index = function(req, res) {
	
	
	res.render('index', { title: 'Node.JS server', jsFiles: GAME.gameFiles });
};