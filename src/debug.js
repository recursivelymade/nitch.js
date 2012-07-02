nitch.debug = {},

/**
 * @name nitch.debug.performance
 * @class
 * @description Measures the performance of your game
**/	
nitch.debug.performance = function(opts) {
	this.opts = opts ? opts : {};
	
	var defaults = {
		fps: 58,
		top: 0,
		left: 0
	};
	
	this.opts = nitch.util.apply(defaults, opts);
	
	this.frames = 0;
	this.time = Date.now();
	this.timeLastFrame = this.time;
	this.timeLastSecond = this.time;
	this.fps = 0;
	this.fpsMin = 1000;
	this.fpsMax = 0;
	this.ms = 0;
	this.msMin = 1000;
	this.msMax = 0;
	
	var infoPanel = '<div id="performance" style="top:'+this.opts.top+'px;left:'+this.opts.left+'px">';
	infoPanel += '<p><strong>FPS:</strong> <span id="per-fps"></span></p>';
	infoPanel += '<p><strong>MS:</strong> <span id="per-ms"></span></p>';
	infoPanel += '</div>';
	nitch.dom("body").append(infoPanel);
	
	nitch.debug.performance.prototype.update = function() {
		nitch.dom("#per-ms").text(this.msInfo());
		nitch.dom("#per-fps").text(this.fpsInfo());
	}
	
	nitch.debug.performance.prototype.msInfo = function() {
		this.time = Date.now();
		this.ms = this.time - this.timeLastFrame;
		this.msMin = Math.min(this.msMin, this.ms);
		this.msMax = Math.max(this.msMax, this.ms);
		this.timeLastFrame = this.time;
        this.frames++;
		return this.ms + " (min: " + this.msMin + ", max: " + this.msMax + ")";
	},
	
	nitch.debug.performance.prototype.fpsInfo = function() {
		this.fps = Math.round((this.frames * 1000) / (this.time - this.timeLastSecond));
		this.fpsMin = Math.min(this.fpsMin, this.fps);
		this.fpsMax = Math.max(this.fpsMax, this.fps);
		this.timeLastSecond = this.time;
		this.frames = 0;
		return this.fps + " (min: " + this.fpsMin + ", max: " + this.fpsMax + ")";
	}
	
	var that = this;
    setInterval(function () { that.update() }, 1000 / this.opts.fps)
},

/**
 * @name nitch.debug.screensafe
 * @class
 * @description Applies screensafe area to your game area
 * @todo see <a href="https://github.com/recursivelymade/nitch.js/issues/4">issue 4</a>
**/
nitch.debug.screensafe = function() {
	return;
}