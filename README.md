nitch.js
========

You've heard of [Responsive Web Design](http://en.wikipedia.org/wiki/Responsive_Web_Design) right? Well Nitch is designed as a responsive web game library. The idea is simple, create a game that can be played on any device you like. It offers
* Simple DOM manipulation
* Simple events, such as on, off, fire and a custom cross-device "tap" event
* A state machine to track events through your game based on [Jake Gordon's Javascript Finite State Machine](https://github.com/jakesgordon/javascript-state-machine/)
* A progress loader system
* XHR requests
* Device and media query detection to deliver the right css and app cache manifest for your device
* An abstracted stats system that captures stats even offline (and sends them when the user comes back online)
* Better Math.Random based on the [Fisher–Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
* Some handy utilities like firing a method only once and replacing default values in an object with your own
* Oh yeah, and a simple modal
 
[Read the full documentation and see some demos](http://recursivelymade.github.com/nitch.js)
===========================
 
*Please note*, it's very early days so not everything is guaranteed to work correctly bug reports and pull requests welcome.

Device, Browser and Accessibility support
=========================================
Our aim is to reasonably support as many devices and browsers. At the moment we're concentrating on support for the following
* iOS 4.2.1+
* Firefox 5+
* Chrome (latest version)
* Safari 5+

In future we'll look at supporting
* Android 2.3.3+ [based on Google Play Stats](http://developer.android.com/resources/dashboard/platform-versions.html)
* IE (Desktop and Xbox)
* Connected TVs and Consoles (PS3, Wii U)
* All widgets (e.g. progress loader system and modal) will be supported with <a href="http://www.w3.org/TR/wai-aria/">WAI-ARIA</a>.

Dependencies for development
============================
* [JSDoc3](https://github.com/jsdoc3/jsdoc)
* [MediaMatch polyfill](https://github.com/paulirish/matchMedia.js)
* [ClassList polyfill](https://github.com/eligrey/classList.js)
* [Google Closure Complier](https://developers.google.com/closure/compiler/)
* [JsTestDriver](http://code.google.com/p/js-test-driver/)
* [JSHint](http://www.jshint.com/)
* [UglifyJS](https://github.com/mishoo/UglifyJS/)

Licence
=======
Nitch is released under the [MIT licence](https://github.com/recursivelymade/nitch.js/blob/master/LICENCE). 