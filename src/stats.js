/**
 * @namespace nitch.stats
 * @description Sends events to Google Analytics. It will store them offline while the device isn't online and sends them when it is.
 * @param {Object} [Options]
 * @param {String} [Options.link] selector for the &lt;a&gt; you wish to track
 * @todo allow other analytics systems to be added
 * @example var stats = new nitch.stats();
 * stats.event("playerOption","2");
 * // or
 * &lt;a href="http://google.com" class="external" data-category="Outbound link"&gt;Quit&lt;/a&gt;
 * var stats = new nitch.stats({link:"a.external"});
**/
nitch.stats = function(opts) {
	
	this.defaults = {
		engine: "google"
	}
	
	if(!_gaq) { return; }
	
	if(!localStorage.getItem("nitch.stats")){
		localStorage.setItem("nitch.stats","[]");
	}
	
	if(opts) {
		if(opts.link) {
			var links = nitch.dom(opts.link);
			var that = this;
			
			links.tap(function(ev) {
				ev.preventDefault();
				var category = nitch.dom(this).attr("data-category");
				that.link(category, this);
			});
		}
	}

/**
 * @namespace nitch.stats.event
 * @method
 * @description send categorised events to your stats system
 * @param {String} category The category for your event
 * @param {String} action The your event's action
 * @example var stats = new nitch.stats();
 * stats.event("gameplay","restart");
**/
	nitch.stats.prototype.event = function(category, action) {
		if(this.defaults.online){
			_gaq.push(['_trackEvent', category, action]);
		} else {
			this.storeLocalEvents(['_trackEvent', category, action]);
		}
	},
	
/**
 * @namespace nitch.stats.link
 * @method
 * @description Track click links
 * @param {String} category The category for your event
 * @param {String} action The your event's action
**/
	nitch.stats.prototype.link = function(category, link) {
		var action = link.href;
		var s = action.split('/');
		action = s[2];

		this.event(category, action);
		if(this.defaults.online){
			setTimeout('document.location = "' + link.href + '"', 100);
		}
	},
	
	storeLocalEvents = function(arr) {
		var stored = JSON.parse(localStorage.getItem("nitch.stats"));
		stored.push(arr);
		localStorage.setItem("offlineGA", JSON.stringify(stored));
	},
	
	sendLocalEvents = function() {
		_gaq.push( JSON.parse(localStorage.getItem("nitch.stats")) );
		localStorage.setItem("nitch.stats","[]");
	},
	
	
	this.defaults.online = (typeof navigator.onLine === "undefined" ? false : navigator.onLine);
	var that = this;
	
	document.body.addEventListener("offline", function () { 
		that.defaults.online = false;
	}, false);
       
	document.body.addEventListener("online", function () {  
         that.defaults.online = true;
         that.sendLocalEvents();
	}, false);  
	
};