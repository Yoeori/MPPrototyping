var Textbox = Class.extend({
	
	text : [],
	textviewed : 0,
	canenter : false,
	shouldaddmoretext : 30,
	shouldrenderenter : false,
	world : 0,
	todotexts : [],
	endfunc : 0,
	
	init : function(world, text, todotexts, endfunc) {
		this.world = world;
		this.text = text;
		this.todotexts = todotexts;
		this.endfunc = endfunc;
	},
	
	render : function() {
		var pos = [(canvas.width/2)-(sml["textbox"].width/2), 100], rendertext = this.getTextViewed();
		ctx.fillStyle = "black";
		ctx.drawImage(sml["textbox"], pos[0], pos[1]);
		ctx.font="24px 'victor'";
		for(var i = 0; i < rendertext.length; i++) {
			ctx.fillText(rendertext[i],pos[0]+20,pos[1]+30+(i*24));
		}
		
		if(this.shouldrenderenter) {
			ctx.fillText("•", pos[0]+20,pos[1]+36+(4*24));
			ctx.fillText("Enter", pos[0]+40,pos[1]+31+(4*24));
		}
	},
	
	update : function(delta) {
		this.updateTextViewed(delta);
	},
	
	onEnter : function() {
		if(this.todotexts.length <= 0) {
			this.endfunc(this.world);
			return false;
		} else {
			var newlist = [];
			for(var i = 1; i < this.todotexts.length; i++) {
				newlist[i-1] = this.todotexts[i];
			}
			this.world.currenttextBox = new Textbox(this.world, this.todotexts[0], newlist, this.endfunc);
			return true;
		}
	},
	
	updateTextViewed : function(delta) {
		if(this.canenter == false) {
			this.shouldaddmoretext -= delta;
			if(this.shouldaddmoretext <= 0) {
				this.shouldaddmoretext += 30;
				this.textviewed += 2;
			}
			
			var total = this.getFullTextwidth();
			if(total+20 <= this.textviewed) {
				this.shouldrenderenter = true;
				this.canenter = true;
				this.shouldaddmoretext += 600;
			}
		} else {
			this.shouldaddmoretext -= delta;
			if(this.shouldaddmoretext <= 0) {
				this.shouldaddmoretext += 600;
				this.shouldrenderenter = !this.shouldrenderenter;
			}
		}
	},
	
	getTextViewed : function() {
		var viewtext = [];
		var line = 0;
		for(var i = this.textviewed; i > 0;) {
			//Get text from this line
			if(i >= this.text[line].length) {
				viewtext[line] = this.text[line];
				i -= this.text[line].length;
				if(line+1 < this.text.length)
					line++;
				else
					break;
			} else {
				viewtext[line] = this.text[line].substring(0, i);
				break;
			}
		}
		return viewtext;
	},
	
	getFullTextwidth : function() {
		var total = 0;
		for(var i = 0; i < this.text.length; i++) {
			total += this.text[i].length;
		}
		return total;
	}
	
});