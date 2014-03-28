var World = Class.extend({
	
	player : 0,
	currenttextBox : 0,
	timer : 0,
	game : 0,
	cutscene : 0,
	
	init : function(game) {
		this.game = game;
		this.player = new EntityPlayer(this);
		
		this.currenttextBox = new Textbox(this, ["Welcome a board of the", "[Alien Jibberish] ship!"], [
			["Because of \"Things\" we", "might have put a bomb on", "your silly old planet."],
			["And because we're too", "lazy to push the", "\"don't blow up\" button", "ourselves..,"],
			["We thought: Why not let", "those silly old humans do", "it?"],
			["And well, ", "you only have one day.", "So uhm, hurry."]
		], function(world) {
			world.timer = new Timer(10, world);
		});
		sound.sounds["intro"][1]["audio"].play();
	},
	
	update : function(deltaTime) {
		if(this.cutscene != 0) {
			this.cutscene.update(deltaTime);
		} else {
			this.player.update(deltaTime);
			if(this.timer != 0)
				this.timer.update(deltaTime);
		}
		if(this.currenttextBox != 0) 
				this.currenttextBox.update(deltaTime);
	},
	
	render : function() {
		if(this.cutscene != 0) {
			this.cutscene.render();
		} else {
			ctx.drawImage(sml["spaceship"], 0, 0);
			
			this.player.render();
			
			
			if(this.timer != 0)
				this.timer.render();
			
			ctx.drawImage(sml["fg"], 0, 0);
		}
		if(this.currenttextBox != 0) 
				this.currenttextBox.render();
	},
	
	keyPressed : function(e) {
		
		if((e == 13 || e == 32) && this.currenttextBox != 0)
			this.stopTextbox();
		
	},
	
	setTextbox : function(text) {
		this.currenttextBox = text;
	},
	
	stopTextbox : function() {
		if(this.currenttextBox.canenter) {
			if(!this.currenttextBox.onEnter())
				this.currenttextBox = 0;
		}
	}
	
	
});