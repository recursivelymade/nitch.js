nitch.progress = function(elem, opts) {

	this.opts = opts;
	this.totalLoaded = opts.defaultLoaded;
	var totalAmount = opts.defaultLoaded
	
	for (var amount in this.opts.assets){
		totalAmount = totalAmount + this.opts.assets[amount];
	}
	this.total = totalAmount;
	
	nitch.dom(elem).after('<div class="progress" role="progressbar" aria-valuenow="'+opts.defaultLoaded+'" aria-valuemin="'+opts.defaultLoaded+'" aria-valuemax="'+this.total+'"><div style="width: '+opts.defaultLoaded+'%;" class="bar"></div></div>');
	
	nitch.progress.prototype.loaded = function(asset) {
		this.totalLoaded = this.totalLoaded + this.opts.assets[asset];
		// Set asset to 0 so if called again it has no affect on the total loaded
		this.opts.assets[asset] = 0;
		this.complete();
	},
	
	nitch.progress.prototype.complete = function() {
		nitch.dom(".progress").attr("aria-valuenow", this.totalLoaded);
		nitch.dom(".progress .bar").css("width:"+this.totalLoaded+"%;");
		if(this.totalLoaded >= this.total) {
			this.opts.onComplete();
		}
	}
	
	// Check we're not complete already
	this.complete();
}

/**
@namespace nitch.progress
@class
@description Create a progress bar on screen and update it as you see fit. The progress bar also applies the <a href="http://www.w3.org/TR/wai-aria/roles#progressbar">WAI Aria progress bar role</a> by default.
@example var loader = new nitch.progress("#loading", {
	defaultLoaded: 40,
	assets: {
		audio: 20,
		video: 20,
		graphics: 20
	},
	onComplete: function() { console.info("I'm done loading"); }
});

// Then fire your loaded events
loader.loaded('audio');
loader.loaded('video');
loader.loaded('graphics');
**/