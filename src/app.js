
var express = require("express"),
	routes = require("./tpl"),
	http = require("http"),
	path = require("path"),
	app = express(),
	gameFiles = require("./game"),
	server = http.createServer(app);
	
GLOBAL["io"] = require("socket.io").listen(server, { "log level": 2 });

io.sockets.on('connection', function (socket) {

		socket.emit('packet', {id: 2});
	
		console.log("User connected");
	socket.on('disconnect', function() { 
		console.log("User disconnected");
	});
});

GLOBAL["GAME"] = {gameFiles: gameFiles};

var game = require("./js/server");

app.set("views", path.join(__dirname, "tpl"));
app.set("view engine", "hjs");
app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/sml", express.static(path.join(__dirname, "sml")));
app.use("/fonts", express.static(path.join(__dirname, "fonts")));
app.use("/sound", express.static(path.join(__dirname, "sound")));
var blockedJS = [];
for(gameFile in GAME.gameFiles) {
	if(gameFiles[gameFile].client === false) 
		blockedJS.push(blockedJS+GAME.gameFiles[gameFile]["url"]);
}
blockedJS = blockedJS.join("|");
app.get("/js/:name("+blockedJS+"|server.js)", function(req, res, next) {
	res.status(404).send("Cannot GET /js/"+req.params.name);
	console.log("test");
});
app.use("/js", express.static(path.join(__dirname, "js")));

// development only
if ("development" === app.get("env")) {
	app.use(express.errorHandler());
}
app.get("/", function(req, res) {
	routes.index(req, res);
});

server.listen(3000);
console.log("server listening on port "+server.address().port);
