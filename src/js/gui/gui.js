var Gui = Class.extend({
	
	shouldrender : false,
	game : 0,
	
	init : function(game) {
		this.game = game;
	},
	
	start : function() {
		
	},
	
	stop : function() {
		
	},
	
	update : function(delta) {
		
		
	},
	
	render : function() {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	},
	
	mouseClicked : function() {
		this.game.stopGui();
	},
	

	keyPressed : function() {
		
	}
	
});