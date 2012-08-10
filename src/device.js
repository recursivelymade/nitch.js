/**
 * @namespace nitch.device
 * @description Stuff for devices
**/
nitch.device = {
	
	mediaQueries: {
		ipad3: "only screen and (min-width: 768px) and (max-width: 1024px) and (-webkit-device-pixel-ratio: 2)",
		ipad2: "only screen and (min-width: 768px) and (max-width: 1024px)",
		iphone4s: "only screen and (min-device-width : 640px) and (max-device-width : 960px) and (-webkit-device-pixel-ratio: 2)",
		iphone4: "only screen and (min-device-width : 640px) and (max-device-width : 960px)",
		iphone3: "only screen and (min-device-width : 320px) and (max-device-width : 480px)"
	},
	
/**
 * @namespace nitch.device.type
 * @method
 * @description Tries it's best to guess the device type based on the user-agent string sent. All based off <a href="https://github.com/Skookum/categorizr.js">Categorizr.js: Device Detection Scripts</a>
 * @returns {string} &quot;tv&quot; or &quot;tablet&quot; or &quot;mobile&quot; or &quot;desktop&quot;
 * @example nitch.device.type()
**/	
	type: function() {
		var ua = window.navigator.userAgent;
         return  ua.match(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i) ? 'tv'
                // tv-based gaming console
              : ua.match(/Xbox|PLAYSTATION.3|Wii/i) ? 'tv'
                // tablet
              : ua.match(/iPad/i) || ua.match(/tablet/i) && !ua.match(/RX-34/i) || ua.match(/FOLIO/i) ? 'tablet'
                // android tablet
              : ua.match(/Linux/i) && ua.match(/Android/i) && !ua.match(/Fennec|mobi|HTC.Magic|HTCX06HT|Nexus.One|SC-02B|fone.945/i) ? 'tablet'
                // Kindle or Kindle Fire
              : ua.match(/Kindle/i) || ua.match(/Mac.OS/i) && ua.match(/Silk/i) ? 'tablet'
                // pre Android 3.0 Tablet
              : ua.match(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || ua.match(/MB511/i) && ua.match(/RUTEM/i) ? 'tablet'
                // unique Mobile User Agent
              : ua.match(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google.Wireless.Transcoder/i) ? 'mobile'
                // odd Opera User Agent - http://goo.gl/nK90K
              : ua.match(/Opera/i) && ua.match(/Windows.NT.5/i) && ua.match(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i) ? 'mobile'
                // Windows Desktop
              : ua.match(/Windows.(NT|XP|ME|9)/) && !ua.match(/Phone/i) || ua.match(/Win(9|.9|NT)/i) ? 'desktop'
                // Mac Desktop
              : ua.match(/Macintosh|PowerPC/i) && !ua.match(/Silk/i) ? 'desktop'
                // Linux Desktop
              : ua.match(/Linux/i) && ua.match(/X11/i) ? 'desktop'
                // Solaris, SunOS, BSD Desktop
              : ua.match(/Solaris|SunOS|BSD/i) ? 'desktop'
                // Desktop BOT/Crawler/Spider
              : ua.match(/Bot|Crawler|Spider|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|TinEye/i) && !ua.match(/Mobile/i) ? 'desktop'
                // assume it is a Mobile Device (mobile-first)
              : 'mobile';
	},
	
/**
 * @name nitch.device.features
 * @description Think of this as a shody version of Modernzr. Basically it's an object that will return the availability of some core features
 * @example // What Chrome on the desktop returns
nitch.device.features = { 
	DeviceOrientationEvent: true
	OrientationEvent: false
	appCache: true
	audioAcc: "probably"
	audioElement: true
	audioMp3: "maybe"
	audioOgg: "probably"
	audioWav: "probably"
	geoLocation: true
	isFullScreen: false
	localStorage: true
	mouse: true
	onLine: true
	orientation: false
	pixelRatio: 1
	screenHeight: 900
	screenWidth: 1440
	sessionStorage: true
	touch: false
	videoElement: false
	webGL: true
	windowHeight: 802
	windowWidth: 1432
}
 **/

/**
 * @namespace nitch.device.featureList
 * @method
 * @description prints out nitch.device.features to an unordered list after the selector
 * @param {String} selector The selector the list will appear after 
 * @example nitch.device.featureList("#game");
**/	
	featureList: function(selector) {
		var html = '<ul id="nitch-device-features">';
		for (var capability in nitch.device.features){
			html += '<li><strong>'+capability+':</strong> '+nitch.device.features[capability]+'</li>';
			}
		html += '</ul>';
		nitch.dom(selector).after(html);
	},
	
 /**
 * @name nitch.device.ft
 * @method
 * @private
 * @returns {object} nitch.device.features
 * @example nitch.device.ft()
**/
	ft: function(debug) {
		var audio = new Audio();
		this.features = {
			onLine: (typeof navigator.onLine === "undefined" ? false : navigator.onLine),
			localStorage: (typeof window.localStorage === "undefined" ? false : true),
			appCache: (typeof window.applicationCache === "undefined" ? false : true),
			sessionStorage: (typeof window.sessionStorage === "undefined" ? false: true), 
			geoLocation: (typeof navigator.geolocation === "undefined" ? false : true),
			audioOgg: audio.canPlayType('audio/ogg; codecs="vorbis"'),
			audioMp3: audio.canPlayType('audio/mpeg; codecs="mp3"'),
			audioAcc: audio.canPlayType('audio/mp4; codecs="mp4a.40.2"'),
			audioWav: audio.canPlayType('audio/wav; codecs="1"'),
			pixelRatio: (window.devicePixelRatio ? window.devicePixelRatio : 1),
			mouse: (typeof window.onmousedown === "undefined" ? false : true),
			touch: (typeof window.ontouchstart === "undefined" ? false : true),
			screenHeight: screen.height,
			screenWidth: screen.width,
			windowWidth: window.innerWidth || document.body.offsetWidth || 0,
			windowHeight: window.innerHeight || document.body.offsetHeight || 0,
			orientation: (typeof window.orientation === "undefined" ? false : window.orientation), // typically going to be 0, -90, 90
			isFullScreen: (typeof navigator.standalone === "undefined" ? false : true), // iOS in webapp mode
			DeviceOrientationEvent: (typeof window.DeviceOrientationEvent === "undefined" ? false : true),
			OrientationEvent: (typeof window.OrientationEvent === "undefined" ? false : true), // The Moz version of DeviceOrientationEvent
			audioElement: (typeof window.Audio === "undefined" ? false : true),
			videoElement: (typeof window.Video === "undefined" ? false : true),
			webGL: (typeof window.WebGLRenderingContext === "undefined" ? false : true)
		}
	},
	
/**
 * @namespace nitch.device.watchOrientation
 * @method
 * @description Adds a class to the body and an event to update when orientation changes for the iPhone 3 (iOS 4.2.1), as it doesn't support media queries in CSS. <div class="label label-important">This is called by default when the document is ready</div>
**/
	watchOrientation: function() {
		nitch.watchit = function() {
			var orientation = window.orientation;
			if(orientation == 90 || orientation == -90) {
				nitch.dom("body").removeClass("portrait");
				nitch.dom("body").addClass("landscape");
			} else {
				nitch.dom("body").removeClass("landscape");
				nitch.dom("body").addClass("portrait");
			}
		},
		nitch.watchit();
		window.addEventListener( "orientationchange", nitch.watchit, false );
	},

/**
 * @namespace nitch.device.stylesheet
 * @method
 * @description Injects a stylesheet based on UserAgent and if it's a mobile, with a media query
 * @param {Object} stylesheet 
 * @param {string} stylesheet.device Device name with the url of the stylesheet. <div class="label"><strong>For desktop and tv support</strong> just use the device name 'desktop' or 'tv'.</div>
 * @param {String} stylesheet.url url of the stylesheet
 * @requires MediaMatch.js
 * @example nitch.device.stylesheet({
	desktop: "style/desktop/style.css"
	tv: "style/tv/style.css"
	ipad3: "style/ipad3/style.css",
	ipad2: "style/ipad/style.css",
	iphone4s: "style/iphone4s/style.css",
	iphone4: "style/iphone4/style.css",
	iphone3: "style/iphone/style.css"
});
**/
	stylesheet: function(opts) {
		if(!opts) { return; }
		
		nitch.device.stylesheet.prototype.add = function(uri, mediaQuery) {
			nitch.dom("head").append('<link type="text/css" rel="stylesheet" media="'+mediaQuery+'" href="'+uri+'" />');
		}

		var device = nitch.device.type();
	
		for (var css in opts){
			if (css == "tv" && device == "tv") {
				this.add(opts[css], "");
			} else if (css == "desktop" && device == "desktop") {
				this.add(opts[css], "");
				return;			
			} else {
				// Else it must be a mobile device, let the media queries begin!
				if(window.matchMedia(nitch.device.mediaQueries[css]).matches)  {
					this.add(opts[css], nitch.device.mediaQueries[css]);
					return;
				}
			}
		}
	},
	
/**
 * @name nitch.device.setAppcache
 * @method
 * @description Injects an appcache manifest based on UserAgent and if it's a mobile, with a media query
 * @param {Object} appcache
 * @param {String} appcache.device Device name with the url of the manifest.  <div class="label"><strong>For desktop and tv support</strong> just use the device name 'desktop' or 'tv'.</div>
 * @param {String} appcache.url Url of the manifest.
 * @requires MediaMatch.js
 * @example nitch.device.appcache({
	desktop: "style/desktop/appcache.manifest",
	ipad3: "style/ipad3/appcache.manifest",
	ipad2: "style/ipad/appcache.manifest",
	iphone4s: "style/iphone4s/appcache.manifest",
	iphone4: "style/iphone4/appcache.manifest",
	iphone3: "style/iphone/appcache.manifest"
});
**/
	appcache: function(opts) {
		if (window.applicationCache && opts) {
			
			var device = nitch.device.type();
			
			for (var appcache in opts){
				if (appcache == "tv" && device == "tv") {
					nitch.dom("html").attr("manifest",  opts[appcache]);
				} else if (appcache == "desktop" && device == "desktop") {
					nitch.dom("html").attr("manifest",  opts[appcache]);
					return;			
				} else {
					// Else it must be a mobile device, let the media query matching begin!
					if(window.matchMedia(nitch.device.mediaQueries[css]).matches)  {
						nitch.dom("html").attr("manifest",  opts[appcache]);
						return;
					}
				}
			}
		}
	}

};
