/**
 * @name nitch.loop
 * @class
 * @description basic game loop based around HTML5's <a href="https://developer.mozilla.org/en-US/docs/DOM/window.requestAnimationFrame">requestAnimationFrame</a> and <a href="https://developer.mozilla.org/en-US/docs/DOM/window.cancelAnimationFrame">cancelAnimationFrame</a>, which is polyfilled in for cross-browser support.
 * @param {Function} callback The main loop that will run your game.
 * @example var looper = new nitch.loop(function(){ console.info("looping"); });
 * looper.start();
 * // wait a little while and then..
 * looper.end();
**/
nitch.loop = function(callbackLoop) {
	if(!callbackLoop) { throw TypeError("A game loop is required"); }
	
	this.running = false;
	var started = false;
	var looper;
	
	nitch.loop.prototype.start = function(callback) { 
		if(started) { throw TypeError("Loop has already been started");  } // can't start more than once
		if(callback) { callback(); }
		// looper = window.requestAnimationFrame(callbackLoop);
		this.running = true;
		started = true;
	},
	nitch.loop.prototype.pause = function(callback) {
		if(!started) { throw TypeError("Loop hasn't been started");  }
		if(!this.running) { throw TypeError("Loop isn't running");  }
		// window.cancelAnimationFrame(looper);
		this.running = false;
		if(callback) { callback(); }
	},
	nitch.loop.prototype.resume = function(callback) {
		if(!started) { throw TypeError("Loop hasn't been started");  }
		if(this.running) { throw TypeError("Loop is already running");  }
		if(callback) { callback(); }
		// looper = window.requestAnimationFrame(callbackLoop);
		this.running = true;
	},
	nitch.loop.prototype.end = function(callback) {
		if(!started) { throw TypeError("Loop hasn't been started");  }
		if(!this.running) { throw TypeError("Loop isn't running");  }
		// window.cancelAnimationFrame(looper);
		this.running = false;
		if(callback) { callback(); }
		started = false; // You can start again!
	}
	
};

// rAF and cAF polyfill based off http://paulirish.com/2011/requestanimationframe-for-smart-animating/
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
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