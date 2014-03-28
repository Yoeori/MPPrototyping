var ClientNetHandler = Class.extend({
	
	 socket: 0,
	
	
	init : function(server) {
		//Connect via Socket IO
		this.socket = io.connect((typeof server.secure !== "undefined" ? "https" : "http")+"://"+server.host+":"+server.port);
		
		object = this;
		
		this.socket.on("packet", function(data) {
			
			object.handlePacket(data);
		});
		
	},
	
	
	handlePacket : function(data) {
		
		console.log(data);
		
	},
	
	
	sendPacket : function() {
		
		
		
	}
	
	
});