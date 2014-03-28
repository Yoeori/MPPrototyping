var Game = Class.extend({

	paused : false,
	GameRenderer : 0,
    keyboard : 0,
	world : 0,
	gui : 0,
	
	init : function() {
        this.keyboard = new Input();
		this.world = new World(this);
		ObjectT = this;
		this.GameRenderer = requestAnimationFrame(function() {ObjectT.render();});
		setInterval(function() {ObjectT.update(15);},15);
		
	},
	
	update : function(deltaTime) {
		Tick++;
		
		if(!this.paused && this.gui == 0)
				this.world.update(deltaTime);
				
		if(this.gui != 0)
			this.gui.update(delta);
		
		/*for(var i = 0; i < sound.BgMusic.length; i++) {
			sound.BgMusic[i].update();
		}*/

	},
	
	render : function() {
		FPS++;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		if(this.gui == 0 || this.gui.shouldrender)
			this.world.render();
			
		if(this.gui != 0)
			this.gui.render();
		
		ObjectT = this;
		this.GameRenderer = requestAnimationFrame(function() {ObjectT.render();});
	},
	
	mouseClicked : function() {
		//Do Nothing
		if(this.gui != 0 && !this.paused)
			this.gui.mouseClicked();
	},
	
	keyPressed : function(e) {
		if(!this.paused) {
			if(this.gui != 0 && !this.paused)
				this.gui.keyPressed(e);
			this.world.keyPressed(e);
		}
		
		this.keyboard.onKeyDown(e);
	},
	
	setGui : function(newgui) {
		this.gui = newgui;
		this.gui.start();
	},
	
	stopGui : function() {
		this.gui.stop();
		this.gui = 0;
	}
	
});