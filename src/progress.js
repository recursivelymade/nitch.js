nitch.progress = function(elem, opts) {
	var defaults = {
		defaultLoaded: 0,
		assets: { },
		onComplete: function() { }
	};
	
	if(!elem || nitch.dom(elem).nodeList.length === 0) { throw TypeError("No element supplied"); }
	
	var options = nitch.util.apply(defaults, opts);
	this.totalLoaded = options.defaultLoaded;
	var totalAmount = this.totalLoaded;
	
	for (var amount in options.assets){
		totalAmount = totalAmount + (typeof options.assets[amount] === "number" ? options.assets[amount] : 0) ;
	}
	this.total = totalAmount;
	
	nitch.dom(elem).after('<div id="nitch-progress" class="progress" role="progressbar" aria-valuenow="'+options.defaultLoaded+'" aria-valuemin="'+options.defaultLoaded+'" aria-valuemax="'+this.total+'"><div style="width: '+options.defaultLoaded+'%;" class="bar"></div></div>');
	
	nitch.progress.prototype.loaded = function(asset) {
		var that = this; // I'll hate myself even more in the morning for this...
		complete = function() {
			nitch.dom("#nitch-progress").attr("aria-valuenow", that.totalLoaded);
			nitch.dom("#nitch-progress .bar").css("width:"+that.totalLoaded+"%;");
			if(that.totalLoaded >= that.total) {
				options.onComplete();
			}
		}
	
		if(options.assets[asset]) {
			this.totalLoaded = this.totalLoaded + options.assets[asset];
			// Set asset to 0 so if called again it has no affect on the total loaded
			options.assets[asset] = 0;
			complete();
		}
	}
	
	// Check we're not complete already
	// I'm going to hate myself in the morning for this...
	if(this.totalLoaded >= this.total) {
		options.onComplete();
	}
};

/**
@namespace nitch.progress
@class
@description Create a progress bar on screen and update it as you see fit. The progress bar also applies the <a href="http://www.w3.org/TR/wai-aria/roles#progressbar">WAI Aria progress bar role</a> by default and updates <a href="http://www.w3.org/TR/wai-aria/states_and_properties#aria-valuenow">aria-valuenow</a> as you send loaded assets.
@param {String} element Element to attach the progress bar to
@param {Object} opts
@param {Numeric} [opts.defaultLoaded=0] The default amount loaded when the progress bar starts
@param {Object} opts.assets Object to specific your assets and the percentage of how much they are loaded
@param {Function} opts.onComplete Function to call once the total of the assets has been reached.
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