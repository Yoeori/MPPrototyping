var EntityPlayer = Class.extend({
	
	PosX : 0,
	PosY : 200,
	
	velY : 0,
	velX : 0,
	
	width: 90,
	height: 168,
	
	facing : true,
	
	GROUNDHEIGHT : 624,
	GRAVITY : 1,
	
	world : 0,
	
	isJumping : false,
	
	animations : [],
	ani : 1,
	
	init : function(world) {
		this.world = world;
		this.animations[0] = new Animation(0, 2, 0, 120);
		this.animations[1] = new Animation(0, 0, 1, 120);
	},
	
	render : function() {
		
		var frame = this.getCurrentFrame();
		if(this.facing == true) {
			ctx.drawImage(sml["player"],							// Image
				  		  this.width*frame[1],										// Start X on image
						  this.height*frame[0],										// Start Y on image
						  this.width, 								// Width in image to display
						  this.height,								// Height in image to display
						  this.PosX, 								// Position X
						  this.PosY-this.height,					// Position Y
						  this.width,								// Width to display
						  this.height);								// Height to display
		} else {
			ctx.save();
			ctx.translate(this.width, 0);
			ctx.scale(-1, 1);
			ctx.drawImage(sml["player"], 
						  this.width*frame[1],
						  this.height*frame[0],	
						  this.width, 
						  this.height,
						  -(this.PosX), 
						  this.PosY-this.height, 
						  this.width, 
						  this.height);
			ctx.restore();
		}
	},
	
	getCurrentFrame : function() {
		return this.animations[this.ani].getCurrentFrame();
	},
	
	update : function(delta) {
		
		if((this.world.game.keyboard.w || this.world.game.keyboard.up) && !this.isJumping) {
			this.velY -= 23;
			this.isJumping = true;
		}
		
		if(this.world.game.keyboard.d || this.world.game.keyboard.right) {
			this.velX += 12;
		}
		
		if(this.world.game.keyboard.a || this.world.game.keyboard.left) {
			this.velX -= 12;
		}
		
		this.animations[this.ani].update(delta);
		
		this.velX *= 0.35;
		if(Math.abs(this.velX) <= 0.35)
			this.velX = 0;
		
		this.PosY += this.velY;
		this.PosX += this.velX;
		if(this.PosY >= this.GROUNDHEIGHT) {
			this.velY = 0;
			this.isJumping = false;
			this.PosY = this.GROUNDHEIGHT;
		} else {
			this.velY += this.GRAVITY;
		}
		if(Math.abs(this.velX) > 0)
			this.ani = 0;
		else
			this.ani = 1;
		
		if(this.velX > 0)
			this.facing = 1;
		else if(this.velX < 0)
			this.facing = 0;
	}
	
});