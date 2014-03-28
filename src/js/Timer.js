var Timer = Class.extend({
	
	time : 0,
	lastupdate: 1000,
	isPaused : false,
	world : 0,
	
	init : function(time, world) {
		this.time = time;
		this.world = world;
	},
	
	update : function(delta) {
		if(!this.isPaused) {
			this.lastupdate -= delta;
			if(this.lastupdate <= 0) {
				this.lastupdate += 1000;
				this.time--;
				if(this.time <= 0) {
					this.onTimerfinish();
				}
			}
		}
	},
	
	render : function() {
		var hour = Math.floor((this.time/60));
		if(hour < 10)
			hour = "0"+hour;
		var min = this.time%60;
		if(min < 10)
			min = "0"+min;
		ctx.fillStyle = "black";
		ctx.font="36px victor";
		ctx.fillText(hour+":"+min,canvas.width-134,50);
	},
	
	addTime : function(timetoadd) { //Or remove time...
		this.time += timetoadd;
	},
	
	onTimerfinish : function() {
		this.world.cutscene = new CutsceneGameOver(this.world);
		//World destruction or something
	}
	
});