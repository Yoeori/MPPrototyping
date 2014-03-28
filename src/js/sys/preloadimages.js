loadimages = ["fg", "textbox", "player", "universe", "earth", "spaceship"];
var sml = [];
imagesloaded = 0;
function smlload(i) { //Preload all images
	loadimage = loadimages[i];
	
	if(loadimage instanceof Array) {
		returnString = loadimage[0];
		imageurl = loadimage[1];
	} else {
		returnString = loadimage;
		imageurl = loadimage;
	}
	
	sml[returnString] = new Image();
	sml[returnString].onload = function() {
		console.log("Loaded image "+returnString+", "+imageurl+".png");
		imagesloaded++;
		if (i <  loadimages.length-1)
			smlload(i+1);
		
		if(imagesloaded == loadimages.length) {
			imagesloaded = "done";
			console.log("Loaded all images");
		}
	};
	sml[returnString].src = 'sml/'+imageurl+'.png';
}
if(loadimages.length != 0)
	smlload(0);
else {
	imagesloaded = "done";
	console.log("Loaded all images");
}