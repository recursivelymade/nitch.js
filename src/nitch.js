/**
 * @namespace nitch
 * @description Nitch is designed as a multi-device HTML5 games framework
**/
nitch = {	
	ready: function(callback) {
		// Catch if browser event has already occurred.
		if ( document.readyState === "complete" ) {
			return setTimeout( function() { 
				nitch.device.ft();
				nitch.device.watchOrientation(); 
				callback();
			}, 1 );
		}
		
		DOMContentLoaded = function() {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			nitch.device.ft();
			nitch.device.watchOrientation();
			callback();
		};
	
		document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
	},

/**
 * @namespace nitch.dom
 * @method
 * @description Basic DOM selector using <a href="https://developer.mozilla.org/en/DOM/Document.querySelectorAll">querySelectorAll</a> which can be chained
	@example var main = nitch.dom("#main");
**/
	dom: function (selector) {
		return new nitch.nodeList(selector);
	}
}

nitch.nodeList = function(selector) {
	this.nodeList = Array.prototype.slice.call(document.querySelectorAll(selector));
	
	
	nitch.nodeList.prototype.find = function(selector) {
		this.nodeList = Array.prototype.slice.call( this.nodeList[0].querySelector(selector));
		return this;
	}
	
    /**
	 * @namespace nitch.css
	 * @method
	 * @description Sets styles on the nodelist 
	
     * @example nitch.dom("#main").css("background-color : green; color: #fff;");
    **/
    nitch.nodeList.prototype.css = function (v) {
        this.nodeList.forEach.call(this.nodeList, function (i) {
            i.style.cssText = v;
        });

       return this;
    },
    
    /**
	 * @namespace nitch.getStyle
	 * @method
	 * @description Gets the style property on the first element in the node list 
	
     * @example nitch.dom("#main").css("background-color");
    **/
    nitch.nodeList.prototype.getStyle = function(style) {
		return document.defaultView.getComputedStyle(this.nodeList[0],null).getPropertyValue(style);
    }
    
    /**
	 * @namespace nitch.text
	 * @function
	 * @description Sets or returns the text of nodelist
    
     * @example nitch.dom("#main").text("Cheese is good");
    **/
	nitch.nodeList.prototype.text = function(text) {
		if (text === false) {
			this.nodeList.forEach.call(this.nodeList, function (i) {
				return i.textContent;
			});
		} else {
			this.nodeList.forEach.call(this.nodeList, function (i) {
				i.textContent = text;
			});
			return this;
		}
	},
	
	nitch.nodeList.prototype.each = [].forEach,
	
    /**
	 * @namespace nitch.hasClass
	 * @function
	 * @description Returns if the nodelist has a specific class on it
	
     * @example nitch.dom("#main").hasClass("summer");
    **/
	nitch.nodeList.prototype.hasClass = function(className) {
		this.each.call(this.nodeList, function (i) {
			return i.classList.contains(className);
		});
		return this;
	},
	
    /**
	 * @namespace nitch.addClass
	 * @function
	 * @description Adds a class to each node in the node list
	
     * @example nitch.dom("#main").addClass("summer");
    **/
	nitch.nodeList.prototype.addClass = function(className) {
		this.each.call(this.nodeList, function (i) {
			i.classList.add(className);
		});
		return this;
	},
	
    /**
	 * @namespace nitch.removeClass
	 * @function
	 * @description Removes a class from each node in the node list
	
     * @example nitch.dom("#main").removeClass("summer");
    **/
	nitch.nodeList.prototype.removeClass = function(className) {
		this.each.call(this.nodeList, function (i) {
			i.classList.remove(className);
		});
		return this;
	},
	
    /**
	 * @namespace nitch.toggleClass
	 * @function
	 * @description Toggles a class on each node in the node list
	
     * @example nitch.dom("#main").toggleClass("summer");
    **/
	nitch.nodeList.prototype.toggleClass = function(className) {
		this.each.call(this.nodeList, function (i) {
			i.classList.toggle(className);
		});
		return this;
	},
	
    /**
	 * @namespace nitch.remove
	 * @function
	 * @description Removes an element from the DOM
	
     * @example nitch.dom("#main").remove();
    **/
	nitch.nodeList.prototype.remove = function() {
		this.each.call(this.nodeList, function (i) {
				i.parentNode.removeChild(i);
		});
		return this;
	},	
    /**
	 * @namespace nitch.before
	 * @function
	 * @description Inserts a new element before each element in the nodelist
	
     * @example nitch.dom("#main").before("<p>Hello</p>");
    **/
	nitch.nodeList.prototype.before = function(elem) {
		this.each.call(this.nodeList, function (i) {
			i.insertAdjacentHTML("beforebegin", elem);
		});
		
		return this;
	},
	
    /**
	 * @namespace nitch.before
	 * @function
	 * @description Inserts a new element just inside each element in the nodelist
	
     * @example nitch.dom("#main").prepend("<p>Hello</p>");
    **/
	nitch.nodeList.prototype.prepend = function(elem) {
		this.each.call(this.nodeList, function (i) {
			i.insertAdjacentHTML("afterbegin", elem);
		});
		return this;
	},
	
    /**
	 * @namespace nitch.after
	 * @function
	 * @description Inserts a new element after each element in the nodelist
	
     * @example nitch.dom("#main").after("<p>Hello</p>");
    **/
	nitch.nodeList.prototype.after = function(elem) {
		this.each.call(this.nodeList, function (i) {
			i.insertAdjacentHTML("afterend", elem);
		});
		return this;
	},
	
	
    /**
	 * @namespace nitch.append
	 * @function
	 * @description Inserts a new element after the last child of each element in the nodelist
	
     * @example nitch.dom("#main").append("<p>Hello</p>");
    **/
	nitch.nodeList.prototype.append = function(elem) {
		this.each.call(this.nodeList, function (i) {
			i.insertAdjacentHTML("beforeend", elem);
		});
		
		return this;
	},
	
    /**
	 * @name nitch.attr
	 * @method
	 * @description Sets an attribute on each element in the node list
	
     * @example nitch.dom("img").attr("alt", "Ben's cat Jimmy");
    **/
    nitch.nodeList.prototype.attr = function (attribute, data) {
        this.each.call(this.nodeList, function (i) {
            i.setAttribute(attribute, data);
        });
        return this;
    },

	/**
	 * @namespace nitch.events
	 * @description Events that are attached to nitch.dom
	**/
	
	/**
	 * @name nitch.events.on
	 * @method
	 * @description Attaches an event handler to an object
	**/
	nitch.nodeList.prototype.on = function(event, callback) {
        this.nodeList.forEach.call(this.nodeList, function (i) {
			i.addEventListener(event, callback, false);
        });
        return this;
	},
	
	/**
	 * @name nitch.events.once
	 * @method
	 * @description Attaches an event handler to an object that can only be fired once
	**/
	nitch.nodeList.prototype.once = function(event, callback) {
		var that = this;
		this.on(event, function fnc() {
			callback();
			that.detach(event, callback);
		});
	},
	
	/**
	 * @name nitch.events.detach
	 * @method
	 * @description Detaches an event handler
	**/
	nitch.nodeList.prototype.detach = function(event, callback) {
        this.nodeList.forEach.call(this.nodeList, function (i) {
            i.removeEventListener(event, callback, false);
        });
        return this;
	},
	
	/**
	 * @name nitch.events.fire
	 * @method
	 * @description Fire a custom event at an object
	**/
	nitch.nodeList.prototype.fire = function(event) {
		this.eventStore || (this.eventStore = {});
		
		if(!this.eventStore[event]) {
			var evt = document.createEvent('CustomEvent');  
			evt.initEvent(event, true, true);
			this.eventStore[event] = evt;
		}
		this.nodeList[0].dispatchEvent(this.eventStore[event]);
        return this;
	},
	
	/**
	 * @name nitch.events.tap
	 * @method
	 * @description abstracted click and touchend event for cross device clicking goodness
	 * @example nitch.dom("#btn").tap(function() { console.info("I made an innuendo about this method name"); })
	**/
	nitch.nodeList.prototype.tap = function(callback) {
		var hasTouch = (typeof window.ontouchstart === "undefined" ? false : true);
		var coordinates = [];
		var lastClick = {};
		
		preventGhostClick = function(event, callback) {
			var time = Date.now();
			
			if (event.type == "touchstart") {
				lastClick.x = event.touches[0].clientX;
				lastClick.y = event.touches[0].clientY;
        	} else if (event.type == "touchend") {
				lastClick.time = time;
				callback(event);
				event.preventDefault();
				event.stopPropagation();
				return event;
        	} else {
        		var timeDiff = time - lastClick.time;
        		var xDiff = Math.abs(event.clientX - lastClick.x);
        		var yDiff = Math.abs(event.clientY - lastClick.y);
        		if ((timeDiff < 500) || (timeDiff < 1500 && xDiff < 25 && yDiff < 25)) {
        			callback(event);
        			return event;
        		} else {
					event.preventDefault();
					event.stopPropagation();
        		}
        	}
		}
		
		if(!hasTouch) {
		// Must be a desktop browser, please say it's a touch screen....
			this.on('click', function(e) { callback(e); });
			this.on('keydown', function(e) { if(e.keyCode == 32) { callback(e); } });
		} else {
			this.on('touchstart', function(e) { preventGhostClick(e); });
			this.on('touchend', function(e) { preventGhostClick(e, callback); });
			// We need to capture clicks as VoiceOver on iOS sends them instead of touchevents
			this.on('click', function(e) { preventGhostClick(e, callback); });
			
		}
		
		return this;
	}
	  
	return this;
}
/**
 * @namespace nith.util
 * @method
 * @description Language utilies
**/
nitch.util = {
	/**
	 * @name nitch.util.apply
	 * @method
	 * @description Copies properties from one object to another. All properties from 'source' will be copied onto 'destination', potentially overwriting existing properties on 'destination'. Properties from 'source's prototype chain will not be copied.
	* @param {Object} [destination] Destination object. If this object is undefined or falsey, a new object will be created.
	* @param {Object} [source] Properties of this object will be copied onto the destination. If this object is undefined or falsey, a new object will be created.
	* @returns {Object} The destination object.
	* @example var obj = nitch.util.apply({foo: "hello", bar: "world"}, {bar: "everyone"});
	//results in {foo: "hello", bar: "everyone"}
	**/
	apply: function(destination, source) {
		var destination = destination || {};
		var source = source || {};

		for (var i in source) {
			if ( source.hasOwnProperty(i) ) {
				destination[i] = source[i];
			}
		}
		return destination;
	},
	
	/**
	 * @name nitch.util.delay
	 * @method
	 * @description  Delays a function for the given number of milliseconds
	 * @example nitch.util.delay(1000, function() { alert("delayed"); })
	**/
	delay: function(wait, func) {
		return setTimeout(function(){ return func.apply(null, []); }, wait);
	},

	/**
	 * @name nitch.util.defer
	 * @method
	 * @description Defers a function, scheduling it to run after the current call stack has cleared.
	 * @example nitch.util.defer(function() { alert("deferred"); })
	**/
	defer: function(func) {
		return util.delay.apply(util, [func, 1].concat(slice.call(arguments, 1)));
	}
}