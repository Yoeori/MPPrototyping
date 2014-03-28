var CutsceneGameOver = Class.extend({
	
	world : 0,
	opacity : 1,
	isdone : false,
	
	init : function(world) {
		this.world = world;
	},
	
	update : function() {
		if(!this.isdone) {
			this.opacity -= 0.004;
			if(this.opacity <= 0) {
				this.opacity = 0;
				this.world.currenttextBox = new Textbox(this.world, ["You failed!", "Moron."], [], function(world) {
					world.game.world = new World(world.game);
				});
				this.isdone = true;
			}
		}
	},
	
	render : function() {
		ctx.fillStyle = "black";
		ctx.drawImage(sml["universe"], 0, 0);
		ctx.globalAlpha = this.opacity;
		ctx.drawImage(sml["earth"], 30*16, 14*16);
		ctx.globalAlpha = 1;
	}
});