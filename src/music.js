/**
 * @namespace nitch.music
 * @description This is a placeholder under we can think of a better way deliver a consistent
 * and timely music control system. It should load the details of audio via a json file
 * and apply the right file type dependant on support from the browser
**/
nitch.music = function() {
	return false;
	
	var music = {}
	
	load: function() {
	
	}
	
	for (var track in musicConfig){
		music[track] = new Audio();
		music[track].src = "/audio/1.1/"+musicConfig[track] + ".mp3";
		// Need to reset the time to replay the audio, annoying huh?
		music[track].addEventListener('ended', function() {
		// reloads the audio so can play it again
			this.load();
		}, false);
	}
	
	return sfx;
	
}