var ClientNetHandler = Class.extend({
	socket: 0,
	 
	packetHandlers : {},
	
	init : function(server) {
	
		//Connect via Socket IO
		this.socket = io.connect((typeof server.secure !== "undefined" ? "https" : "http")+"://"+server.host+":"+server.port);
		this.registerPacket({id: 1}, function() {});
		object = this;
		
		this.socket.on("packet", function(data) {
			
			object.handlePacket(data);
		});
		
	},
	
	
	handlePacket : function(data) {
		//Get packet id
		var packetid = data.id;

		
		switch(data.id) {
			case 0:
				console.log(data.message);
				break;
			case 2:
				console.log("pinged");
				break;
			default:
			 	if(typeof this.packetHandlers[packetid] == "undefined") {
					console.error("Can't handle server packet");
					return;
				} else {
					
					console.log("test");
				}
			
			
		}
		
	},
	
	sendPacket : function(id, data) {
		
		
		
	},
	
	registerPacket : function(settings, handler) {
		/*	settings
				-id: packet ids
		*/
		this.packetHandlers[settings.id] = {handler : handler};
		
		
	}
	
	
});