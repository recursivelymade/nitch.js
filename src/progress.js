nitch.progress = function(elem, opts) {
	var defaults = {
		defaultLoaded: 0,
		assets: { },
		onComplete: function() { }
	};
	
	if(!elem || nitch.dom(elem).nodeList.length === 0) { throw TypeError("No element supplied"); }
	
	this.opts = opts || {};
	this.opts = nitch.util.apply(defaults, this.opts);
	this.totalLoaded = opts.defaultLoaded;
	var totalAmount = this.totalLoaded;
	
	for (var amount in this.opts.assets){
		totalAmount = totalAmount + (typeof this.opts.assets[amount] === "number" ? this.opts.assets[amount] : 0) ;
	}
	this.total = totalAmount;
	
	nitch.dom(elem).after('<div class="progress" role="progressbar" aria-valuenow="'+opts.defaultLoaded+'" aria-valuemin="'+opts.defaultLoaded+'" aria-valuemax="'+this.total+'"><div style="width: '+opts.defaultLoaded+'%;" class="bar"></div></div>');
	
	nitch.progress.prototype.loaded = function(asset) {
		if(this.opts.assets[asset]) {
			this.totalLoaded = this.totalLoaded + this.opts.assets[asset];
			// Set asset to 0 so if called again it has no affect on the total loaded
			this.opts.assets[asset] = 0;
			this.complete();
		}
	},
	
	nitch.progress.prototype.complete = function() {
		nitch.dom(".progress").attr("aria-valuenow", this.totalLoaded);
		nitch.dom(".progress .bar").css("width:"+this.totalLoaded+"%;");
		if(this.totalLoaded >= this.total) {
			this.opts.onComplete();
		}
	},
	
	// Check we're not complete already
	this.complete();
};

/**
@namespace nitch.progress
@class
@description Create a progress bar on screen and update it as you see fit. The progress bar also applies the <a href="http://www.w3.org/TR/wai-aria/roles#progressbar">WAI Aria progress bar role</a> by default and updates <a href="http://www.w3.org/TR/wai-aria/states_and_properties#aria-valuenow">aria-valuenow</a> as you send loaded assets.
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