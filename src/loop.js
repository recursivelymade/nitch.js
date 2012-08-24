/**
 * @name nitch.loop
 * @class
 * @description basic game loop based around HTML5's <a href="https://developer.mozilla.org/en-US/docs/DOM/window.requestAnimationFrame">requestAnimationFrame</a>, <a href="https://developer.mozilla.org/en-US/docs/DOM/window.cancelAnimationFrame">cancelAnimationFrame</a> and <a href="https://developer.mozilla.org/en-US/docs/DOM/window.mozAnimationStartTime">AnimationStartTime</a>, which is polyfilled in for cross-browser support.
 * @param {Function} callback The main loop that will run your game.
 * @example var looper = new nitch.loop(function(){ console.info("looping"); });
 * looper.start();
 * looper.running // will return true
 * looper.startTime // will return in milliseconds when the loop started
 * looper.progress // will return the difference in milliseconds when the loop started and now
 * looper.pause();
 * looper.paused // returns 1
 * looper.resume();
 * looper.resumed // returns 1
 * // wait a little while and then..
 * looper.end();
 * looper.running // will return false
**/
nitch.loop = function(callbackLoop) {
	if(!callbackLoop) { throw TypeError("A game loop is required"); }
	
	this.running = false;
	var started = false;
	this.startTime = false;
	this.progress = false;
	this.paused = 0;
	this.resumed = 0;
	var looper;
	
	var that = this;
	this.loop = function() {
		if(that.running) {
			var time = new Date().getTime();
			that.progress =  time - that.startTime;
			callbackLoop();
			that.looper = window.requestAnimationFrame(that.loop);
		}
	}
	
/**
 * @name nitch.loop.start
 * @method
 * @description Start's the game loop
 * @param {Function} [Callback] callback that fires once you start the loop
**/
	nitch.loop.prototype.start = function(callback) { 
		if(started) { throw TypeError("Loop has already been started");  } // can't start more than once
		if(callback) { callback(); }
		this.startTime = window.animationStartTime;
		looper = window.requestAnimationFrame(this.loop);
		this.running = true;
		started = true;
	},
/**
 * @name nitch.loop.pause
 * @method
 * @description Pause the game loop
 * @param {Function} [Callback] callback that fires once you pause the loop
**/
	nitch.loop.prototype.pause = function(callback) {
		if(!started) { throw TypeError("Loop hasn't been started");  }
		if(!this.running) { throw TypeError("Loop isn't running");  }
		window.cancelAnimationFrame(looper);
		this.running = false;
		this.paused++;
		if(callback) { callback(); }
	},
/**
 * @name nitch.loop.resume
 * @method
 * @description Resume the game loop
 * @param {Function} [Callback] callback that fires once you resume the loop
**/
	nitch.loop.prototype.resume = function(callback) {
		if(!started) { throw TypeError("Loop hasn't been started");  }
		if(this.running) { throw TypeError("Loop is already running");  }
		if(callback) { callback(); }
		looper = window.requestAnimationFrame(this.loop);
		this.running = true;
		this.resumed++;
	},
/**
 * @name nitch.loop.end
 * @method
 * @description End the game loop
 * @param {Function} [Callback] callback that fires once you end the loop
**/
	nitch.loop.prototype.end = function(callback) {
		if(!started) { throw TypeError("Loop hasn't been started");  }
		if(!this.running) { throw TypeError("Loop isn't running");  }
		window.cancelAnimationFrame(looper);
		this.running = false;
		if(callback) { callback(); }
		started = false; // You can start again!
	}
	
};

// rAF and cAF polyfill based off http://paulirish.com/2011/requestanimationframe-for-smart-animating/, but with animationStartTime support.
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    
	if(!window.animationStartTime) {
		window.animationStartTime = window.msAnimationStartTime || window.mozAnimationStartTime || window.webkitAnimationStartTime || window.oAnimationStartTime || new Date().getTime();
	}
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
	}
	
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());