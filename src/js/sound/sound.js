var soundloaded = false;

//New AMAZING sound system
var sound = {
	
	musicOn : true,
	BGOn : true,
	sPause: false,
	
	sounds: [],

	add: function(i,count,returnfunc) {
		if(i instanceof Array) {
			var name = i[0];
			var url = i[1];
		} else {
			var name = i;
			var url = i;
		}
		this.sounds[name] = new Array();
		this.sounds[name]["count"] = count;
		functhis = this;
		function addSound(c,functhis) {
			functhis.sounds[name][c] = new Array();
			functhis.sounds[name][c]["url"] = url+c+".mp3";
			functhis.sounds[name][c]["audio"] = new Audio();
			functhis.sounds[name][c]["audio"].addEventListener('canplaythrough', function() {
				console.log("Loaded sound "+name+" "+c+", "+functhis.sounds[name][c]["url"]);
				if(c < functhis.sounds[name]["count"]) {
					addSound(c+1,functhis);
				} else {
					if(returnfunc != false) {
						returnfunc();
					}
				}
			}, false);
			functhis.sounds[name][c]["audio"].src = "sound/"+functhis.sounds[name][c]["url"];
		}
		addSound(1,functhis);
	},
	
	play: function(name) {
		if(this.musicOn) {
			if(this.sounds[name]["count"] > 1) {
				var rand = Math.floor((Math.random()*this.sounds[name]["count"]+1));
				playsound = new Audio();
				playsound.src = this.sounds[name][rand]["audio"].src;
				playsound.play();
			} else {
				playsound = new Audio();
				playsound.src = this.sounds[name][1]["audio"].src;
				playsound.play();
			}
		}
	},
	
	playNoR: function(name,id) {
		if(this.musicOn) {
			playsound = new Audio();
			playsound.src = this.sounds[name][id]["audio"].src;
			playsound.play();
		}
	},
	
	getList: function() {
		console.log(this.sounds);
	},
	
	toggle: function() {
		this.musicOn = !this.musicOn;
	},
	
	toggleBG: function() {
		this.BGOn = !this.BGOn;
	},
	BgMusic: new Array(),
	
	EnvMusic: function(names,PStart,PEnd,soundsys) {
		this.music = new Audio();
		this.music.src = soundsys.sounds[names][1]["audio"].src;
		this.music.loop = "loop";
		this.pointStart = PStart;
		this.pointEnd = PEnd;
		var interval;
		this.playing = false;
		this.wasMuted = false;
		this.level = 0;
		this.current;
		
		this.update = function() {
			if(this.playing && (soundsys.musicOn == false || soundsys.BGOn == false)) {
				this.end();
				this.wasMuted = true;
			}
			
			if(game.player.PosX >= this.pointStart && game.player.PosX <= this.pointEnd) {
				if (!this.playing) {
					if(this.wasMuted == true && soundsys.musicOn == true && soundsys.BGOn == true) {
						this.start();
						this.wasMuted = false;
					} else if(soundsys.musicOn == true && soundsys.BGOn == true) {
						this.music.play();
						this.current = "in";
						this.fadeInN(this);
					}
				}
			} else if(this.playing) {
				this.current = "out";
				this.fadeOutN(this);
			}
		}
		
		this.end = function() {
			this.music.pause();
			this.playing = false;
		}
		
		this.start = function() {
			this.music.play();
			this.playing = true;
		}
		
		this.fadeInN = function(object) {
			if(!this.playing) {
				this.music.play();
				this.playing = true;
			}
			this.level += 1;
			
			if(this.level <= 100 && this.level >= 0)
				this.music.volume = this.level/100;

			if(this.level < 100 && this.current == "in") {
				setTimeout(function() { object.fadeInN(object); },30);
			}
		}
		
		this.fadeOutN = function(object) {
			if(this.playing) {
				this.playing = false;
			}
			this.level = this.level-1;
			
			if(this.level <= 100 && this.level >= 0)
				this.music.volume = this.level/100;

			if(this.level > 1 && this.current == "out") {
				setTimeout(function() { object.fadeOutN(object); },30);
			} else {
				this.music.pause();
			}
		}
	}
	
}
var soundsloadedlist = 0;
sound.add("intro", 1, function() { soundsloadedlist++; checksoundsloaded(); });
function checksoundsloaded() {
	if(soundsloadedlist >= 1) {
		soundloaded = true;
		console.log("loaded al sounds");
	}
}
checksoundsloaded();